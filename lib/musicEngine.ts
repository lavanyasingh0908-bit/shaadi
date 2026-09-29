"use client";

import { music } from "@/lib/weddingData";

type Listener = () => void;

const GESTURES = ["click", "touchend", "keydown"] as const;

/**
 * Owns the page's single HTMLAudioElement. It lives outside React, so
 * scrolling, re-renders and section mounts never interrupt playback.
 *
 * Nothing is created or played until the "Open Invitation" tap, which calls
 * play() synchronously inside the click so mobile browsers (Android Chrome,
 * iOS Safari, WhatsApp / Instagram in-app browsers) unlock audio.
 *
 * On desktop the audio is also routed through Web Audio
 * (<audio> -> GainNode -> Analyser -> speakers) for smooth fades and the
 * equalizer. Phones skip that: a suspended AudioContext silences the song in
 * some in-app WebViews, and iOS mutes Web Audio on the silent switch.
 */
class MusicEngine {
  private audio: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private gain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private bins: Uint8Array<ArrayBuffer> | null = null;
  private listeners = new Set<Listener>();
  private fadeRaf = 0;
  private awaitingGesture = false;

  /** True while the song is actually playing. */
  playing = false;
  /** True when the last play() was refused — UI shows a "tap to play" hint. */
  blocked = false;

  /** Creates (once) or returns the one and only audio element. */
  private element(): HTMLAudioElement | null {
    if (this.audio) return this.audio;
    if (typeof window === "undefined") return null;
    const audio = new Audio();
    audio.preload = "metadata";
    audio.loop = true;
    audio.setAttribute("playsinline", "");
    audio.src = music.src;
    audio.addEventListener("playing", this.sync);
    audio.addEventListener("pause", this.sync);
    audio.addEventListener("ended", this.sync);
    this.audio = audio;
    return audio;
  }

  private sync = () => {
    this.playing = !!this.audio && !this.audio.paused;
    if (this.playing) this.blocked = false;
    this.emit();
  };

  private emit() {
    this.listeners.forEach((fn) => fn());
  }

  private ensureGraph() {
    if (this.ctx || !this.audio) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) return;
    try {
      const Ctx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctx();
      const source = ctx.createMediaElementSource(this.audio);
      const gain = ctx.createGain();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.82;
      source.connect(gain).connect(analyser).connect(ctx.destination);
      this.ctx = ctx;
      this.gain = gain;
      this.analyser = analyser;
      this.bins = new Uint8Array(analyser.frequencyBinCount);
    } catch {
      // Web Audio unavailable — plain <audio> playback still works.
    }
  }

  /**
   * Must be called synchronously from inside a user gesture (tap / click).
   * If the browser still refuses, `blocked` is set (toast) and the next tap
   * anywhere on the page retries.
   */
  async play() {
    const audio = this.element();
    if (!audio) return;
    audio.loop = true;
    // iOS 17+: play through the silent switch like a media app would.
    const nav = navigator as Navigator & { audioSession?: { type: string } };
    if (nav.audioSession) nav.audioSession.type = "playback";
    this.ensureGraph();
    this.ctx?.resume().catch(() => {});
    try {
      // play() is invoked before any await, so it stays inside the gesture.
      await audio.play();
      this.stopWaitingForGesture();
      this.blocked = false;
    } catch {
      this.blocked = true;
      this.waitForGesture();
    }
    this.sync();
  }

  pause() {
    this.stopWaitingForGesture();
    this.audio?.pause();
  }

  toggle() {
    const audio = this.element();
    if (!audio) return;
    if (audio.paused) void this.play();
    else this.pause();
  }

  /** Hides the "tap to play" hint without playing. */
  dismissBlocked() {
    if (!this.blocked) return;
    this.blocked = false;
    this.emit();
  }

  private onGesture = (e: Event) => {
    // The music button handles its own tap via toggle().
    if ((e.target as Element | null)?.closest?.("[data-music-toggle]")) return;
    this.stopWaitingForGesture();
    void this.play();
  };

  private waitForGesture() {
    if (this.awaitingGesture) return;
    this.awaitingGesture = true;
    // Only activation-triggering events unlock audio (touch pointerdown doesn't).
    for (const type of GESTURES) window.addEventListener(type, this.onGesture, { capture: true });
  }

  private stopWaitingForGesture() {
    if (!this.awaitingGesture) return;
    this.awaitingGesture = false;
    for (const type of GESTURES) window.removeEventListener(type, this.onGesture, { capture: true });
  }

  /** Smoothly ramps volume to `level` (0–1) over `seconds`. */
  fadeTo(level: number, seconds: number) {
    if (this.gain && this.ctx) {
      const g = this.gain.gain;
      const now = this.ctx.currentTime;
      g.cancelScheduledValues(now);
      g.setValueAtTime(g.value, now);
      g.linearRampToValueAtTime(level, now + seconds);
      return;
    }
    const audio = this.audio;
    if (!audio) return;
    cancelAnimationFrame(this.fadeRaf);
    const from = audio.volume;
    const start = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / (seconds * 1000));
      audio.volume = from + (level - from) * k;
      if (k < 1) this.fadeRaf = requestAnimationFrame(step);
    };
    this.fadeRaf = requestAnimationFrame(step);
  }

  /** Frequency bands normalised to 0–1 (empty when silent). */
  bands(count: number): number[] {
    if (!this.analyser || !this.bins || !this.playing) return Array(count).fill(0);
    this.analyser.getByteFrequencyData(this.bins);
    const usable = Math.floor(this.bins.length * 0.7);
    const per = Math.max(1, Math.floor(usable / count));
    return Array.from({ length: count }, (_, i) => {
      let sum = 0;
      for (let j = 0; j < per; j++) sum += this.bins![i * per + j] ?? 0;
      return sum / per / 255;
    });
  }

  subscribe(fn: Listener) {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  get src() {
    return music.src;
  }
}

export const musicEngine = new MusicEngine();

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Vinyl from "@/components/icons/Vinyl";
import { music } from "@/lib/weddingData";
import { musicEngine } from "@/lib/musicEngine";

const subscribe = (fn: () => void) => musicEngine.subscribe(fn);

function useMusicState() {
  const isPlaying = useSyncExternalStore(
    subscribe,
    () => musicEngine.playing,
    () => false,
  );
  const isBlocked = useSyncExternalStore(
    subscribe,
    () => musicEngine.blocked,
    () => false,
  );
  return { isPlaying, isBlocked };
}

/**
 * Floating play/pause control. The single audio element lives in
 * musicEngine (outside React) and is first started by the "Open Invitation"
 * tap; this button appears from that tap on. If the browser refuses to play,
 * a small toast points the guest to the music icon.
 */
export default function MusicPlayer({ visible }: { visible: boolean }) {
  const { isPlaying, isBlocked } = useMusicState();
  const showToast = visible && isBlocked && !isPlaying;

  useEffect(() => {
    if (!showToast) return;
    const t = window.setTimeout(() => musicEngine.dismissBlocked(), 6000);
    return () => window.clearTimeout(t);
  }, [showToast]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.button
            type="button"
            data-music-toggle
            onClick={() => musicEngine.toggle()}
            initial={{ opacity: 0, scale: 0.6, y: -12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={`music-fab fixed z-[65] flex items-center gap-2 rounded-full glass-panel px-2.5 py-2 shadow-lg shadow-black/5 ${
              isPlaying || isBlocked ? "animate-pulse-glow" : ""
            }`}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={`${music.title} — ${music.artist}`}
          >
            <Vinyl className="h-7 w-7" spinning={isPlaying} />
            <span className="sr-only">{isPlaying ? "Playing" : "Paused"}</span>
            <span className="hidden pr-1 font-detail text-[13px] uppercase tracking-[0.15em] text-ink/85 sm:inline">
              {isPlaying ? "Pause" : "Play"}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showToast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="music-toast fixed z-[65] max-w-[15rem] rounded-2xl glass-panel px-3.5 py-2 font-serif-alt text-base text-ink/90 shadow-lg shadow-black/5"
          >
            🎵 Tap the music icon to play {music.title}.
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

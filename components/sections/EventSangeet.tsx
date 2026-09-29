"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import GoldParticles from "@/components/effects/GoldParticles";
import { events } from "@/lib/weddingData";
import Equalizer from "@/components/effects/Equalizer";

const SPARKLES = [
  { top: "18%", left: "14%", size: 14, delay: 0 },
  { top: "30%", left: "84%", size: 18, delay: 1.2 },
  { top: "68%", left: "10%", size: 12, delay: 2.1 },
  { top: "76%", left: "80%", size: 16, delay: 0.7 },
  { top: "12%", left: "56%", size: 10, delay: 1.7 },
];

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path d="M10 0c.6 5 2.4 8 10 10-7.6 2-9.4 5-10 10-.6-5-2.4-8-10-10C7.6 8 9.4 5 10 0z" />
    </svg>
  );
}

// music notes drifting upward, like a dance floor in full swing
const NOTES = [
  { left: "8%", glyph: "♪", size: "text-3xl", delay: 0, duration: 7 },
  { left: "22%", glyph: "♫", size: "text-2xl", delay: 2.4, duration: 8 },
  { left: "38%", glyph: "♩", size: "text-xl", delay: 4.6, duration: 6.5 },
  { left: "63%", glyph: "♬", size: "text-2xl", delay: 1.2, duration: 7.5 },
  { left: "78%", glyph: "♪", size: "text-xl", delay: 3.5, duration: 6 },
  { left: "90%", glyph: "♫", size: "text-3xl", delay: 5.2, duration: 8.5 },
];

const BULB_COUNT = 12;
const BULBS = Array.from({ length: BULB_COUNT }, (_, i) => {
  const cx = Math.round(((400 / (BULB_COUNT - 1)) * i) * 100) / 100;
  const cy =
    Math.round((16 + 16 * Math.abs(Math.sin((i / (BULB_COUNT - 1)) * Math.PI))) * 100) / 100;
  return { cx, cy };
});

function FairyLights() {
  return (
    <svg viewBox="0 0 400 60" className="absolute inset-x-0 top-0 h-14 w-full text-champagne" preserveAspectRatio="none">
      <path d="M0 6 Q 50 40 100 6 T 200 6 T 300 6 T 400 6" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      {BULBS.map((b, i) => {
        return (
          <motion.circle
            key={i}
            cx={b.cx}
            cy={b.cy}
            r={3}
            fill="currentColor"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
          />
        );
      })}
    </svg>
  );
}

export default function EventSangeet() {
  const words = events.sangeet.line.split(" ");

  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-charcoal px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 20%, rgba(214,180,122,0.18), transparent 60%), radial-gradient(circle at 75% 80%, rgba(214,180,122,0.14), transparent 55%)",
        }}
      />
      <FairyLights />
      <GoldParticles count={44} />
      {SPARKLES.map((s, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="pointer-events-none absolute text-champagne-light drop-shadow-[0_0_6px_rgba(232,211,171,0.9)]"
          style={{ top: s.top, left: s.left, width: s.size, height: s.size }}
          animate={{ opacity: [0, 1, 0], scale: [0.4, 1, 0.4], rotate: [0, 90, 180] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: s.delay, ease: "easeInOut" }}
        >
          <Sparkle className="h-full w-full" />
        </motion.span>
      ))}
      {NOTES.map((n, i) => (
        <motion.span
          key={`note-${i}`}
          aria-hidden
          className={`pointer-events-none absolute bottom-0 ${n.size} text-champagne/70 drop-shadow-[0_0_6px_rgba(232,211,171,0.6)]`}
          style={{ left: n.left }}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: ["0vh", "-85vh"], x: [0, 18, -14, 10, 0], opacity: [0, 0.9, 0.9, 0], rotate: [-10, 10, -10] }}
          transition={{ duration: n.duration, repeat: Infinity, delay: n.delay, ease: "easeInOut" }}
        >
          {n.glyph}
        </motion.span>
      ))}
      <Equalizer className="absolute bottom-10 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <Reveal mode="scale">
          <p className="font-hindi text-lg font-semibold tracking-[0.2em] sm:text-xl text-champagne">द्वितीय उत्सव</p>
        </Reveal>
        <Reveal mode="blur" duration={1.2} delay={0.1}>
          <div className="flex flex-col items-center gap-1">
            <h2 className="gold-shimmer-text animate-shimmer font-royal text-5xl leading-[1.35] sm:text-7xl">
              नाच-ए-मोहब्बत
            </h2>
            <p className="flex items-center gap-3 font-script text-3xl text-champagne-light sm:text-4xl">
              <span className="h-px w-8 bg-gradient-to-r from-transparent to-champagne sm:w-12" aria-hidden />
              {events.sangeet.title}
              <span className="h-px w-8 bg-gradient-to-l from-transparent to-champagne sm:w-12" aria-hidden />
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 pt-2">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              className="font-serif-alt text-base italic text-champagne-light sm:text-xl"
              initial={{ opacity: 0.15, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.25, ease: "backOut" }}
            >
              {w}
            </motion.span>
          ))}
        </div>

        <Reveal mode="fade-up" delay={1.6}>
          <div className="mt-4 flex flex-col items-center gap-1">
            <p className="font-serif-alt text-lg text-pearl/95 sm:text-xl">{events.sangeet.date}</p>
            <p className="font-serif-alt text-base text-pearl/95">{events.sangeet.time}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

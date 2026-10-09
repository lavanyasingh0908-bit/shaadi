"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Petals from "@/components/effects/Petals";
import GoldParticles from "@/components/effects/GoldParticles";
import { events } from "@/lib/weddingData";

function ClayPot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 70" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 20h32l-6 42a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4L14 20z" />
      <ellipse cx="30" cy="20" rx="16" ry="5" />
      <path d="M22 20c0-6 3-11 8-11s8 5 8 11" opacity="0.6" />
    </svg>
  );
}

/** Pink five-petal bloom with dark green leaves, for the card's corners. */
function Bloom({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden>
      <path d="M60 64c-22 4-40 22-44 44 22-2 40-18 44-44z" fill="#2E7D4F" opacity="0.85" />
      <path d="M62 62c20-10 44-6 54 10-20 10-42 6-54-10z" fill="#1F5A3A" opacity="0.8" />
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="60" cy="38" rx="14" ry="22" fill="#E0568A" opacity="0.9" transform={`rotate(${r} 60 60)`} />
      ))}
      {[36, 108, 180, 252, 324].map((r) => (
        <ellipse key={r} cx="60" cy="44" rx="9" ry="15" fill="#F48FB1" transform={`rotate(${r} 60 60)`} />
      ))}
      <circle cx="60" cy="60" r="9" fill="#F2A33A" />
      <circle cx="60" cy="60" r="4" fill="#C9721C" />
    </svg>
  );
}

export default function EventHaldi() {
  return (
    <section
      className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-6 py-24 text-center"
      style={{ background: "linear-gradient(170deg,#fff6d9 0%,#fde9a8 40%,#f9d77e 75%,#f3c35e 100%)" }}
    >
      {/* soft watercolour splashes */}
      <div aria-hidden className="watercolor-splash pointer-events-none absolute -left-[15%] top-[8%] h-[55vw] max-h-[520px] w-[55vw] max-w-[520px]" style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.55), rgba(255,255,255,0.18) 60%, transparent)" }} />
      <div aria-hidden className="watercolor-splash pointer-events-none absolute -right-[12%] bottom-[6%] h-[50vw] max-h-[480px] w-[50vw] max-w-[480px]" style={{ background: "radial-gradient(closest-side, rgba(233,150,60,0.35), rgba(233,150,60,0.12) 60%, transparent)", animationDelay: "-6s" }} />
      <Petals count={30} variant="haldi" />

      {/* festive floral corners */}
      <Bloom className="pointer-events-none absolute -left-6 -top-6 h-32 w-32 rotate-12 opacity-90 sm:h-48 sm:w-48" />
      <Bloom className="pointer-events-none absolute -right-8 -top-4 h-24 w-24 -rotate-45 opacity-80 sm:h-36 sm:w-36" />
      <Bloom className="pointer-events-none absolute -bottom-8 left-1/2 h-20 w-20 -translate-x-1/2 rotate-180 opacity-70 sm:h-28 sm:w-28" />
      {/* floating turmeric dust */}
      <GoldParticles count={28} tint="200,140,40" />

      <motion.div
        className="absolute left-[8%] bottom-10 text-[#1F5A3A]/70"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <ClayPot className="h-16 w-16 sm:h-24 sm:w-24" />
      </motion.div>
      <motion.div
        className="absolute right-[8%] bottom-16 text-[#1F5A3A]/70"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      >
        <ClayPot className="h-12 w-12 sm:h-20 sm:w-20" />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-5">
        <Reveal mode="scale">
          <p className="font-hindi text-lg font-semibold tracking-[0.2em] text-[#9A6A1C] sm:text-xl">प्रथम उत्सव</p>
        </Reveal>
        <Reveal mode="blur" duration={1.2} delay={0.1}>
          <h2
            className="mb-2 px-2 py-2 font-royal text-6xl leading-[1.35] [filter:drop-shadow(0_2px_6px_rgba(255,255,255,0.6))] sm:text-8xl"
            style={{
              background: "linear-gradient(90deg,#1f5a3a 0%,#2e7d4f 30%,#e0568a 62%,#c2185b 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {events.haldi.line}
          </h2>
          <p className="flex items-center justify-center gap-4 font-bodoni text-2xl text-[#1F5A3A] sm:gap-5 sm:text-4xl">
            <span className="h-px w-10 bg-[#1F5A3A]/60 sm:w-16" aria-hidden />
            {events.haldi.title}
            <span className="h-px w-10 bg-[#1F5A3A]/60 sm:w-16" aria-hidden />
          </p>
        </Reveal>
        <Reveal mode="fade" delay={0.35}>
          <p className="font-detail text-sm uppercase tracking-[0.25em] text-[#9A6A1C] sm:text-base">
            Music • Dance • Family • Forever
          </p>
        </Reveal>
        <Reveal mode="fade-up" delay={0.5}>
          <div className="mt-2 flex flex-col items-center gap-1">
            <span className="mb-3 h-px w-20 bg-gradient-to-r from-transparent via-[#E0568A] to-transparent" />
            <p className="font-serif-alt text-xl font-semibold text-[#1F5A3A] sm:text-2xl">{events.haldi.date}</p>
            <p className="font-serif-alt text-lg font-semibold text-[#C2185B]">{events.haldi.time}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

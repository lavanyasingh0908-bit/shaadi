"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Arch from "@/components/icons/Arch";
import { families } from "@/lib/weddingData";
import { IMG } from "@/lib/assets";

function Heart({ className = "" }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <path d="M12 21s-7.5-4.6-10-9.3C.4 8.1 2.3 4 6.2 4 8.6 4 10.6 5.3 12 7.2 13.4 5.3 15.4 4 17.8 4c3.9 0 5.8 4.1 4.2 7.7C19.5 16.4 12 21 12 21z" />
    </motion.svg>
  );
}

type Member = { name: string; note: string; tribute?: string };

function MemberBlock({ m }: { m: Member }) {
  return (
    <div>
      <p className="font-hindi text-lg font-semibold leading-snug text-ink sm:text-2xl">{m.name}</p>
      {m.note && <p className="mt-1 font-hindi text-base font-light text-champagne-dark">({m.note})</p>}
      {m.tribute && (
        <p className="mt-0.5 font-hindi text-sm font-light italic text-champagne-light/75">({m.tribute})</p>
      )}
    </div>
  );
}

// literal class names so Tailwind generates them
const MEMBER_ROWS = ["row-start-3", "row-start-4", "row-start-5", "row-start-6"];

/**
 * Both sides share one grid, so each heading, divider and parent sits on
 * exactly the same row as its counterpart, whatever the text lengths.
 */
function FamilyGrid() {
  const sides = [
    { side: families.bride, cell: "items-end text-right", mode: "slide-right" as const, col: "col-start-1" },
    { side: families.groom, cell: "items-start text-left", mode: "slide-left" as const, col: "col-start-3" },
  ];
  const rows = Math.max(families.bride.parents.length, families.groom.parents.length);

  return (
    <div
      className="relative mt-14 grid w-full max-w-4xl grid-cols-[1fr_auto_1fr] gap-x-6 gap-y-5 sm:gap-x-14"
    >
      {sides.map(({ side, cell, mode, col }) => [
        <Reveal key={`${side.title}-t`} mode={mode} className={`${col} row-start-1 flex flex-col ${cell}`}>
          <p className="font-detail text-[13px] uppercase tracking-[0.4em] text-champagne-dark">{side.title}</p>
        </Reveal>,
        <Reveal key={`${side.title}-d`} mode={mode} className={`${col} row-start-2 flex flex-col ${cell}`}>
          <div className="gold-divider w-16" />
        </Reveal>,
        ...side.parents.map((m, i) => (
          <Reveal
            key={m.name}
            mode={mode}
            delay={0.1 * (i + 1)}
            className={`${col} ${MEMBER_ROWS[i]} flex flex-col ${cell}`}
          >
            <MemberBlock m={m} />
          </Reveal>
        )),
      ])}

      <div
        className="col-start-2 row-start-1 flex flex-col items-center justify-center gap-3 self-center text-champagne"
        style={{ gridRowEnd: rows + 3 }}
      >
        <Arch className="h-28 w-20 sm:h-40 sm:w-28" />
        <Heart className="h-6 w-6 text-blush sm:h-7 sm:w-7" />
      </div>
    </div>
  );
}

export default function Families() {
  return (
    <section className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-luxe px-6 py-24">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="floral-sway pointer-events-none absolute -bottom-8 -right-8 w-44 opacity-25 sm:w-72"
      />
      <Reveal mode="fade">
        <p className="text-center font-detail text-sm uppercase tracking-[0.5em] text-champagne-dark">
          With The Blessings Of Our Families
        </p>
      </Reveal>
      <Reveal mode="fade-up" delay={0.15}>
        <h2 className="mt-3 text-center font-display text-3xl text-ink sm:text-5xl">
          Together With Our Families
        </h2>
      </Reveal>

      <FamilyGrid />
    </section>
  );
}

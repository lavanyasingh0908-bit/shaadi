import { IMG } from "@/lib/assets";

export default function Footer() {
  return (
    <footer className="safe-bottom relative flex w-full flex-col items-center gap-4 overflow-hidden bg-luxe-reverse px-6 py-14 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -bottom-10 -left-10 w-36 -scale-x-100 opacity-25 sm:w-52"
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={IMG.floral}
        alt=""
        aria-hidden
        loading="lazy"
        className="pointer-events-none absolute -bottom-10 -right-10 w-36 opacity-25 sm:w-52"
      />
      <div className="relative flex flex-col items-center gap-2">
        <p className="font-detail text-[13px] uppercase tracking-[0.4em] text-champagne-dark">Contact</p>
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-5">
          {["9617638439", "9131254090"].map((n, i) => (
            <span key={n} className="flex items-center gap-5">
              {i > 0 && <span className="hidden h-4 w-px bg-champagne/50 sm:block" aria-hidden />}
              <a
                href={`tel:+91${n}`}
                className="font-serif-alt text-xl tracking-[0.12em] text-champagne-light transition-colors hover:text-pearl"
              >
                {n}
              </a>
            </span>
          ))}
        </div>
      </div>
      <div className="gold-divider w-24" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={IMG.lotus} alt="" aria-hidden loading="lazy" width={32} height={24} className="h-6 w-8 object-contain" />
      <p className="relative font-serif-alt text-base italic text-blush">
        Made with love for Sejal &amp; Himanshu
      </p>
    </footer>
  );
}

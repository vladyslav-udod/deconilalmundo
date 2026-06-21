"use client";

import { useCallback } from "react";
import Image from "next/image";
import type { HeroSection, Tour } from "@/types";
import { ArrowDown, ChevronDown } from "@/components/icons";

interface HeroProps {
  data: HeroSection;
  bkgImage?: string;
}

// Sanity handles resizing/encoding per srcset width.
// Local fallback (/hero-bg.jpg) is served as-is.
const heroLoader = ({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) => {
  if (!src.includes("cdn.sanity.io")) return src;
  const base = src.split("?")[0];
  return `${base}?w=${width}&q=${quality ?? 65}&auto=format&fit=max`;
};

export default function Hero({ data, bkgImage }: HeroProps) {
  // "Ver próximos viajes" resets the Próximas salidas filters to the default
  // state, then scrolls to the section.
  const scrollToCta = useCallback(() => {
    if (data.ctaUrl) {
      const element = document.querySelector(data.ctaUrl);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }
    window.dispatchEvent(new Event("tours:reset"));
    requestAnimationFrame(() => {
      document
        .getElementById("tours")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const bgUrl = bkgImage ?? data.backgroundImageUrl ?? "/hero-bg.jpg";

  return (
    <header className="hero" id="top">
      <div className="bg" aria-hidden="true">
        <Image
          loader={heroLoader}
          src={bgUrl}
          alt=""
          fill
          priority
          quality={65}
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>

      <div className="inner">
        <div className="eyebrow uppercase">
          <span className="line" aria-hidden="true" />
          <span>{data.eyebrow}</span>
        </div>

        <h1>
          {data.heading} <em>{data.headingEmphasis}</em>.
        </h1>

        <p className="lede">{data.lede}</p>
        <div className="actions">
          <button type="button" className="btn-primary" onClick={scrollToCta}>
            <span>{data.ctaText}</span>
            <ArrowDown />
          </button>
          <a href={data.ghostCtaUrl} className="btn-ghost">
            {data.ghostCtaText}
          </a>
        </div>
      </div>

      <div className="meta" aria-hidden="true">
        <span>{data.metaLine}</span>
      </div>

      <button
        type="button"
        className="scroll-down"
        onClick={scrollToCta}
        aria-label="Bajar a los destinos"
      >
        <span className="drop-line" aria-hidden="true" />
        <ChevronDown />
      </button>
    </header>
  );
}

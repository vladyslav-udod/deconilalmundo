"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * IntersectionObserver scroll-spy. Returns the anchor of the section
 * currently in view. Same rootMargin tuning as the original guide.
 */
export function useScrollSpy(anchors: string[]): string {
  const [active, setActive] = useState(anchors[0] ?? "");

  useEffect(() => {
    const els = anchors
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-160px 0px -62% 0px", threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [anchors]);

  return active;
}

/**
 * True once `ref` sticks to the top offset (drives the catbar shadow).
 * `--guide-catbar-top` is read from :root so the bar can sit under the
 * site nav.
 */
export function useStuck(ref: RefObject<HTMLElement | null>): boolean {
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const top =
          parseInt(
            getComputedStyle(document.documentElement).getPropertyValue(
              "--guide-catbar-top"
            )
          ) || 0;
        setStuck(el.getBoundingClientRect().top <= top + 1);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return stuck;
}

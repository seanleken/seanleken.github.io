"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/lib/headings";

export function Toc({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.slug);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, [headings]);

  let n = 0;

  return (
    <aside className="toc" aria-label="On this page">
      <div className="lbl">On this page</div>
      <ul>
        {headings.map((h) => {
          if (h.numbered) n++;
          return (
            <li key={h.slug}>
              <a href={`#${h.slug}`} className={active === h.slug ? "active" : ""}>
                {h.numbered ? `${String(n).padStart(2, "0")} · ` : ""}
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const fadeUp = (delay = 0) =>
    shouldReduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: "easeOut" as const },
        };

  return (
    <header className="hero">
      <div className="wrap hero-grid">
        <motion.div {...fadeUp()}>
          <Image
            src="/assets/headshot.jpg"
            alt="Sean Pertet"
            width={72}
            height={72}
            className="hero-avatar"
            priority
          />
          <span className="eyebrow">// senior full-stack engineer &middot; nairobi</span>
          <h1>
            I ship <span>type-safe</span> products, end to end.
          </h1>
          <p className="lede">
            Senior full-stack TypeScript engineer with six years building
            production systems — from React front-ends to Node services and the
            APIs, data models, and types that connect them.
          </p>
          <div className="cta-row">
            <Link href="#projects" className="btn primary">
              View work
            </Link>
            <Link href="#contact" className="btn">
              Get in touch
            </Link>
          </div>
          <div className="locus">
            TypeScript &middot; React &middot; Next.js &middot; Node.js &middot; 6 yrs
          </div>
        </motion.div>

        <motion.div className="editor" {...fadeUp(0.15)}>
          <div className="editor-tabs">
            <span className="dots">
              <i></i>
              <i></i>
              <i></i>
            </span>
            <span className="tab">
              <span className="tsq">TS</span>who.ts
            </span>
          </div>
          <div className="code">
            <div className="gutter">
              1<br />
              2<br />
              3<br />
              4<br />
              5<br />
              6<br />
              7<br />
              8<br />
              9
            </div>
            <pre>
              <span className="k">type</span> <span className="ty">Engineer</span>{" "}
              <span className="p">{"= {"}</span>
              {"\n  "}name<span className="p">:</span> <span className="s">&quot;Sean Pertet&quot;</span>
              {"\n  "}role<span className="p">:</span>{" "}
              <span className="s">&quot;Senior Full-Stack Engineer&quot;</span>
              {"\n  "}stack<span className="p">:</span> <span className="p">[</span>
              <span className="s">&quot;TypeScript&quot;</span>
              <span className="p">,</span> <span className="s">&quot;React&quot;</span>
              <span className="p">,</span> <span className="s">&quot;Node.js&quot;</span>
              <span className="p">]</span>
              {"\n  "}yearsExperience<span className="p">:</span> <span className="n">6</span>
              {"\n  "}shipsToProduction<span className="p">:</span> <span className="k">true</span>
              {"\n"}
              <span className="p">{"}"}</span>
              {"\n\n"}
              <span className="k">const</span> <span className="fn">sean</span>
              <span className="p">:</span> <span className="ty">Engineer</span>{" "}
              <span className="p">{"= {"}</span> <span className="cm">{"/* ... */"}</span>{" "}
              <span className="p">{"}"}</span>
            </pre>
          </div>
          <div className="editor-status">
            <span>who.ts &middot; TypeScript</span>
            <span className="ok">tsc — 0 errors</span>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

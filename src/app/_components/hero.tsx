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
            <Link href="/projects" className="btn primary">
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

        <motion.div className="portrait" {...fadeUp(0.15)}>
          <Image
            src="/assets/headshot.jpg"
            alt="Sean Pertet"
            fill
            sizes="(max-width: 860px) 100vw, 50vw"
            priority
          />
        </motion.div>
      </div>
    </header>
  );
}

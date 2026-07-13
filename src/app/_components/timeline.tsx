"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

interface Experience {
  date: string;
  role: string;
  qualifier?: string;
  company: string;
  description: string;
}

const experiences: Experience[] = [
  {
    date: "Jan 2026 — present",
    role: "Software Engineer",
    qualifier: "(contract)",
    company: "Above The Fray",
    description:
      "Build storefronts in TypeScript and modern React; ship reusable, strongly-typed components backed by REST and GraphQL APIs.",
  },
  {
    date: "Jun 2024 — Jul 2025",
    role: "Senior Developer",
    company: "Space48",
    description:
      "Led architecture and optimization across multiple client projects; redesigned the team's Git branching strategy, cutting deployment regressions; served as primary technical liaison for clients.",
  },
  {
    date: "Nov 2020 — Jun 2024",
    role: "Developer",
    company: "Space48",
    description:
      "Built backend services and integrations in Node.js and TypeScript; led replatforming migrations for products, orders, and customer data; mentored junior developers on best practices.",
  },
  {
    date: "Sep 2019 — Nov 2020",
    role: "Graduate Developer",
    company: "Space48",
    description:
      "Developed integrations and automated order, inventory, and shipment synchronization across commerce platforms.",
  },
];

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: -12 },
        animate: isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 },
        transition: { duration: 0.4, delay: index * 0.1 },
      };

  return (
    <motion.div ref={ref} className="tl-item" {...motionProps}>
      <div className="tl-date">{exp.date}</div>
      <div className="tl-role">
        {exp.role} {exp.qualifier && <small>{exp.qualifier}</small>}
      </div>
      <div className="tl-co">{exp.company}</div>
      <p>{exp.description}</p>
    </motion.div>
  );
}

export function Timeline() {
  return (
    <section id="experience">
      <div className="wrap sec-pad">
        <div className="sec-head">
          <span className="eyebrow">// experience</span>
          <h2>Where I&apos;ve built</h2>
        </div>
        <div className="tl">
          {experiences.map((exp, index) => (
            <TimelineItem key={exp.company + exp.date} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

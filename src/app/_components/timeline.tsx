"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Experience {
  company: string;
  role: string;
  period: string;
  current: boolean;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    company: "Space48",
    role: "Graduate Developer",
    period: "September 2019 – November 2020",
    current: false,
    bullets: [
      "Developed cloud integrations between BigCommerce and iPaaS platforms",
      "Delivered automated order, inventory, and shipment synchronization systems",
    ],
  },
  {
    company: "Space48",
    role: "Developer",
    period: "November 2020 – June 2024",
    current: false,
    bullets: [
      "Architected cloud-native integrations on GCP (Cloud Functions, Pub/Sub, Cloud Tasks)",
      "Built scalable warehouse, CRM, and ESP integrations using Node.js/TypeScript",
      "Led cloud-based replatforming efforts migrating products, orders, and customer data",
      "Mentored junior developers on GCP best practices",
    ],
  },
  {
    company: "Space48",
    role: "Senior Developer",
    period: "June 2024 – July 2025",
    current: false,
    bullets: [
      "Led cloud infrastructure optimization initiatives across multiple client projects",
      "Redesigned team branching strategy, reducing deployment regressions",
      "Served as primary technical liaison for clients",
    ],
  },
  {
    company: "Above The Fray",
    role: "Software Engineer (Contract)",
    period: "January 2026 – Present",
    current: true,
    bullets: [
      "Built and maintained BigCommerce storefronts using modern frameworks",
      "Developed reusable, scalable components with REST and GraphQL API integrations",
    ],
  },
];

function TimelineItem({ exp, index }: { exp: Experience; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 md:pl-12"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
    >
      {/* Animated dot */}
      <motion.div
        className={`absolute left-0 md:left-[12.4px] top-1.5 w-2 h-2 rounded-full -translate-x-1/2 ${
          exp.current ? "bg-portfolio-emerald" : "bg-portfolio-slate"
        }`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.15 + 0.2 }}
      />

      {/* Pulse effect for current role */}
      {exp.current && (
        <motion.div
          className="absolute left-0 md:left-[12.4px] top-1.5 w-2 h-2 rounded-full -translate-x-1/2 bg-portfolio-emerald"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
        />
      )}

      <div>
        <span className="text-sm font-mono text-portfolio-slate dark:text-portfolio-light-slate">
          {exp.period}
        </span>
        <h3 className="text-xl font-semibold text-portfolio-navy dark:text-white mt-1">
          {exp.role}
        </h3>
        <p className="text-portfolio-blue font-medium">{exp.company}</p>
        <ul className="mt-3 space-y-2">
          {exp.bullets.map((bullet, bulletIndex) => (
            <motion.li
              key={bulletIndex}
              className="text-portfolio-slate dark:text-portfolio-light-slate flex items-start gap-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.15 + 0.3 + bulletIndex * 0.1 }}
            >
              <span className="text-portfolio-blue mt-1.5 text-xs">▸</span>
              {bullet}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Timeline() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-portfolio-navy dark:text-white mb-4">
          Work Experience
        </h2>
        <p className="text-portfolio-slate dark:text-portfolio-light-slate mb-12 max-w-2xl leading-relaxed">
          My professional journey building cloud infrastructure and e-commerce
          solutions.
        </p>

        <div className="relative" ref={containerRef}>
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-0 md:left-4 top-0 w-px bg-portfolio-light-slate/50"
            initial={{ height: 0 }}
            animate={isInView ? { height: "100%" } : { height: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <TimelineItem key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

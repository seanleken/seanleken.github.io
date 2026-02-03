"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SkillCategory {
  name: string;
  level: number;
  skills: string[];
}

const skillData: SkillCategory[] = [
  {
    name: "Cloud Platforms",
    level: 95,
    skills: ["GCP", "Cloud Run", "Cloud Functions", "Pub/Sub", "Cloud Tasks", "Azure"],
  },
  {
    name: "Infrastructure & DevOps",
    level: 95,
    skills: ["Terraform", "Docker", "CI/CD", "GitFlow", "Cloud Deployment"],
  },
  {
    name: "Backend Development",
    level: 95,
    skills: ["Node.js", "TypeScript", "Python", "Java", "REST APIs", "GraphQL"],
  },
  {
    name: "Frontend Development",
    level: 85,
    skills: ["React", "Next.js", "CSS", "Tailwind"],
  },
  {
    name: "Databases",
    level: 90,
    skills: ["SQL", "Firestore", "NoSQL", "Database Migrations"],
  },
];

function SkillBar({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-portfolio-navy dark:text-white">
          {category.name}
        </h3>
        <span className="text-sm font-mono text-portfolio-slate dark:text-portfolio-light-slate">
          {category.level}%
        </span>
      </div>
      <div className="h-2 bg-portfolio-light-slate/30 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-full bg-portfolio-blue rounded-full"
          initial={{ width: 0 }}
          animate={isInView ? { width: `${category.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, skillIndex) => (
          <motion.span
            key={skill}
            className="border border-portfolio-navy dark:border-portfolio-light-slate text-portfolio-navy dark:text-portfolio-light-slate text-xs px-2 py-1 rounded"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + skillIndex * 0.05 }}
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

export function TechStack() {
  return (
    <section className="py-12 md:py-18">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <h2 className="text-3xl font-bold text-portfolio-navy dark:text-white mb-4">
          Technical Expertise
        </h2>
        <p className="text-portfolio-slate dark:text-portfolio-light-slate mb-12 max-w-2xl leading-relaxed">
          Deep expertise across the full technology stack, with specialization
          in cloud architecture and event-driven systems.
        </p>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillData.map((category, index) => (
            <SkillBar key={category.name} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

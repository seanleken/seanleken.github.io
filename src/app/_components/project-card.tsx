"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

type Project = {
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  screenshot?: string; // path relative to /public
};

type Props = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: Props) {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.4, delay: index * 0.08 },
      };

  return (
    <motion.article className="proj-feature wide" {...motionProps}>
      <div className="proj-preview">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            sizes="(max-width: 860px) 100vw, 30vw"
          />
        ) : (
          "preview"
        )}
      </div>
      <div className="proj-info">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="proj-links">
          <a href={project.githubUrl} target="_blank" rel="noreferrer">
            GitHub →
          </a>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live demo →
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

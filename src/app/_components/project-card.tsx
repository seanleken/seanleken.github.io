"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Screenshot / Placeholder */}
      <div className="relative w-full aspect-video bg-slate-100 dark:bg-slate-700 overflow-hidden">
        {project.screenshot ? (
          <Image
            src={project.screenshot}
            alt={`${project.title} screenshot`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600 m-4 rounded-lg">
            <svg
              className="w-8 h-8 text-slate-400 dark:text-slate-500 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} />
              <path d="M3 9h18M9 21V9" strokeWidth={1.5} />
            </svg>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              screenshot pending
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-portfolio-navy dark:text-white mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-portfolio-slate dark:text-portfolio-light-slate mb-4 flex-1">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 text-portfolio-slate dark:text-portfolio-light-slate"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium text-portfolio-slate dark:text-portfolio-light-slate hover:text-portfolio-blue dark:hover:text-portfolio-blue transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </Link>
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-portfolio-blue hover:underline transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.article>
  );
}

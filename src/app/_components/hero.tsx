"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Terminal } from "./terminal";

export function Hero() {
  return (
    <section className="py-24 md:py-32 bg-portfolio-off-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Top section: Name + Headshot */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16 mb-12">
          {/* Text Content */}
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-portfolio-navy dark:text-white mb-4">
              Sean Pertet
            </h1>
            <p className="text-2xl md:text-3xl text-portfolio-slate dark:text-portfolio-light-slate mb-6">
              Cloud Engineer & E-commerce Specialist
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            >
              <Link
                href="#experience"
                className="inline-flex items-center justify-center bg-portfolio-blue text-white px-8 py-3 rounded-lg font-medium hover:scale-105 transition-transform duration-300"
              >
                View Experience
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center border-2 border-portfolio-navy dark:border-white text-portfolio-navy dark:text-white px-8 py-3 rounded-lg font-medium hover:border-portfolio-blue hover:text-portfolio-blue transition-colors duration-300"
              >
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>

          {/* Headshot */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative">
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-full bg-portfolio-blue/10 dark:bg-portfolio-blue/20" />
              <div className="absolute -inset-2 rounded-full border-2 border-portfolio-blue/30" />
              <Image
                src="/assets/headshot.jpg"
                alt="Sean Pertet"
                width={280}
                height={280}
                className="relative rounded-full object-cover w-56 h-56 md:w-72 md:h-72 border-4 border-white dark:border-slate-800 shadow-xl"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Terminal - the showstopper */}
        <Terminal />
      </div>
    </section>
  );
}

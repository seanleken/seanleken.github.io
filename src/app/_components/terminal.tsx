"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "Cloud Engineer | 6+ years | GCP Specialist" },
  { prompt: true, text: "cat expertise.txt" },
  { prompt: false, text: "→ Event-driven architecture" },
  { prompt: false, text: "→ Platform migrations" },
  { prompt: false, text: "→ Enterprise integrations" },
  { prompt: true, text: "echo $STATUS" },
  { prompt: false, text: "Ready to build something great." },
];

export function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<{ prompt: boolean; text: string; typed: string }[]>([]);
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const hasStarted = useRef(false);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 530);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (hasStarted.current) return;
    hasStarted.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    const lines: { prompt: boolean; text: string; typed: string }[] = [];

    const typeNextChar = () => {
      if (lineIdx >= terminalLines.length) {
        setIsComplete(true);
        return;
      }

      const currentLine = terminalLines[lineIdx];

      if (charIdx === 0) {
        // Start new line
        lines.push({ ...currentLine, typed: "" });
        setDisplayedLines([...lines]);
      }

      if (charIdx < currentLine.text.length) {
        // Type next character
        lines[lineIdx].typed = currentLine.text.slice(0, charIdx + 1);
        setDisplayedLines([...lines]);
        charIdx++;

        // Typing speed: faster for output, slower for commands
        const delay = currentLine.prompt ? 80 : 30;
        setTimeout(typeNextChar, delay);
      } else {
        // Line complete, move to next
        lineIdx++;
        charIdx = 0;

        // Pause between lines
        const pauseDelay = currentLine.prompt ? 400 : 200;
        setTimeout(typeNextChar, pauseDelay);
      }
    };

    // Initial delay before starting
    setTimeout(typeNextChar, 800);
  }, []);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto lg:mx-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      {/* Terminal window */}
      <div className="rounded-lg overflow-hidden shadow-2xl border border-slate-700">
        {/* Title bar */}
        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-slate-400 text-xs font-mono ml-2">sean@cloud — zsh</span>
        </div>

        {/* Terminal content */}
        <div className="bg-slate-900 p-4 font-mono text-sm min-h-[220px]">
          {displayedLines.map((line, index) => (
            <div key={index} className="leading-relaxed">
              {line.prompt && (
                <span className="text-portfolio-emerald">sean@cloud:~$ </span>
              )}
              <span className={line.prompt ? "text-white" : "text-portfolio-light-slate"}>
                {line.typed}
              </span>
              {/* Show cursor at end of current typing line */}
              {index === displayedLines.length - 1 && !isComplete && showCursor && (
                <span className="text-white">▋</span>
              )}
            </div>
          ))}
          {/* Final prompt with cursor after complete */}
          {isComplete && (
            <div className="leading-relaxed">
              <span className="text-portfolio-emerald">sean@cloud:~$ </span>
              {showCursor && <span className="text-white">▋</span>}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

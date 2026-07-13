"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import cn from "classnames";

const navLinks = [
  { href: "/#work", label: "Work" },
  { href: "/projects", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="brand">
          <span className="ts">TS</span>Sean Pertet
        </Link>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="navlinks"
          onClick={() => setOpen((v) => !v)}
        >
          menu
        </button>
        <div className="nav-right">
          <div className={cn("nav-links", { open })} id="navlinks">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn({
                  here: !link.href.includes("#") && pathname.startsWith(link.href),
                })}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { topics } from "@/src/data";
import { useProgress } from "./useProgress";

const links = [
  ["/learn", "Learn"],
  ["/exams", "Exams"],
  ["/games", "Games"],
  ["/structures", "Structures"],
  ["/progress", "Progress"],
];

function active(path, href) {
  if (href === "/learn") return ["/learn", "/topic", "/practice"].some((item) => path.startsWith(item));
  if (href === "/exams") return path.startsWith("/exam");
  return path === href || path.startsWith(`${href}/`);
}

export function Shell({ children }) {
  const path = usePathname();
  const progress = useProgress();
  const [open, setOpen] = useState(false);
  const studied = progress ? Object.keys(progress.topics).length : 0;

  useEffect(() => setOpen(false), [path]);

  return (
    <>
      <div className="spine" aria-hidden="true">
        <span>Klarform · German grammar A2–C1</span>
      </div>
      <header className="topbar">
        <Link href="/" className="wordmark">
          <i />
          Klarform
        </Link>
        <button className="menu-btn" type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? "Close" : "Menu"}
        </button>
        <nav className={open ? "nav open" : "nav"}>
          {links.map(([href, label]) => (
            <Link key={href} href={href} className={active(path, href) ? "on" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <Link className="tally" href="/progress">
          {studied} / {topics.length}
        </Link>
      </header>
      <main>{children}</main>
      <footer className="foot">
        <span>Klarform</span>
        <span>Original lessons, drills, and exams from A2 to C1.</span>
      </footer>
    </>
  );
}

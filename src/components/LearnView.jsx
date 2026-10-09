"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { LEVELS, listWorkshops, topics } from "@/src/data";
import { useProgress } from "./useProgress";

const anchor = (level) => level.replace("/", "-");

export function LearnView() {
  const progress = useProgress();
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("Alle");

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return topics.filter((topic) => {
      if (level !== "Alle" && topic.level !== level) return false;
      if (!needle) return true;
      const hay = [topic.title, topic.de, topic.blurb, topic.level, ...(topic.focus || [])].join(" ").toLowerCase();
      return hay.includes(needle);
    });
  }, [query, level]);

  const groups = LEVELS.map((item) => ({
    level: item,
    topics: visible.filter((topic) => topic.level === item),
  })).filter((group) => group.topics.length);

  return (
    <div className="page">
      <p className="kicker">Verzeichnis</p>
      <h1 className="display" style={{ fontSize: "clamp(2.8rem, 6vw, 5rem)" }}>
        Jedes Kapitel.
      </h1>
      <input
        className="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Regel, Wort oder Niveau suchen"
        aria-label="Kapitel suchen"
      />
      <div className="filters">
        {["Alle", ...LEVELS].map((item) => (
          <button key={item} className={item === level ? "chip on" : "chip"} type="button" onClick={() => setLevel(item)}>
            {item}
          </button>
        ))}
      </div>
      {groups.map((group) => (
        <section key={group.level} id={anchor(group.level)}>
          <h2 className="group-label">{group.level}</h2>
          {group.topics.map((topic) => {
            const record = progress?.topics?.[topic.id];
            const ratio = record?.total ? Math.round((record.best / record.total) * 100) : 0;
            const number = String(topics.findIndex((item) => item.id === topic.id) + 1).padStart(2, "0");
            return (
              <Link className="row" href={`/topic/${topic.id}`} key={topic.id}>
                <span className="num">{number}</span>
                <span>
                  <strong>{topic.title}</strong>
                  <em>{topic.de}</em>
                </span>
                <span className="meta">{listWorkshops(topic.id).length + 1} Übungen</span>
                <span className="mini" aria-hidden="true">
                  <span style={{ width: `${ratio}%` }} />
                </span>
              </Link>
            );
          })}
        </section>
      ))}
      {groups.length === 0 && <p className="lede">Dazu gibt es kein Kapitel.</p>}
    </div>
  );
}

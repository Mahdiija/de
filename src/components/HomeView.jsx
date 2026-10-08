"use client";

import Link from "next/link";
import { LEVELS, exams, getTopic, topics } from "@/src/data";
import { useProgress } from "./useProgress";

const anchor = (level) => level.replace("/", "-");

export function HomeView() {
  const progress = useProgress();
  const last = progress?.lastTopic ? getTopic(progress.lastTopic) : null;
  const studied = progress ? Object.keys(progress.topics).length : 0;

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="kicker">A grammar studio</p>
          <h1 className="display">
            German grammar,
            <br />
            <em>from A2 to C1.</em>
          </h1>
          <p className="lede">
            Thirty-eight chapters, set like a book and practiced like a studio. Each rule is short.
            Each drill answers immediately. Three exams run seventy-two questions each.
          </p>
          <div className="hero-actions">
            <Link className="btn" href={last ? `/topic/${last.id}` : "/learn"}>
              {last ? `Continue · ${last.de}` : "Open the index"}
            </Link>
            <Link className="btn ghost" href="/exams">
              Take an exam
            </Link>
          </div>
        </div>
        <aside className="side-card">
          <p className="kicker">On this desk</p>
          <strong>{topics.length} chapters</strong>
          <p>{studied === 0 ? "Nothing saved in this browser yet." : `${studied} chapters already have a score.`}</p>
          <p>Choice, gaps, word order, rewrites, and sorting. Umlaut keys sit under every typed answer.</p>
        </aside>
      </section>

      <div className="section-head">
        <h2>The book</h2>
        <Link href="/learn">Full index</Link>
      </div>
      <div className="chapter-list">
        {LEVELS.map((level) => {
          const group = topics.filter((topic) => topic.level === level);
          return (
            <Link className="chapter" href={`/learn#${anchor(level)}`} key={level}>
              <span className="lv">{level}</span>
              <b>{group.map((topic) => topic.de).slice(0, 3).join(" · ")}</b>
              <span>{group.length} chapters</span>
            </Link>
          );
        })}
      </div>

      <div className="section-head">
        <h2>Three exams</h2>
        <span className="meta">6 topics · 72 questions</span>
      </div>
      <div className="exam-grid">
        {exams.map((exam) => (
          <Link className="panel" href={`/exam/${exam.id}`} key={exam.id}>
            <span className="roman">{exam.id === "1" ? "I" : exam.id === "2" ? "II" : "III"}</span>
            <h3>{exam.title}</h3>
            <p>{exam.blurb}</p>
            <span className="go">Begin</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

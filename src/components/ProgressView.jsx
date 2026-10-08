"use client";

import Link from "next/link";
import { useState } from "react";
import { LEVELS, exams, topics } from "@/src/data";
import { badgeList } from "@/src/lib/badges";
import { clearProgress } from "@/src/lib/progress";
import { useProgress } from "./useProgress";

export function ProgressView() {
  const progress = useProgress();
  const [armed, setArmed] = useState(false);
  if (!progress) return <div className="page" />;

  const studied = topics.filter((topic) => progress.topics[topic.id]);
  const badges = badgeList(progress);
  const earned = badges.filter((badge) => badge.earned);
  const weak = studied.filter((topic) => {
    const record = progress.topics[topic.id];
    return record.total && record.best / record.total < 0.7;
  });

  return (
    <div className="page narrow">
      <p className="kicker">This browser</p>
      <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.2rem)" }}>
        {studied.length}
        <span style={{ color: "var(--muted)" }}>/{topics.length}</span>
      </h1>
      <p className="lede">
        Scores and marks stay on this device. A mark is a perfect practice, or an exam that clears its pass line.
      </p>
      <h2>
        Marks <span className="meta">{earned.length}/{badges.length}</span>
      </h2>
      <div className="badge-grid">
        {badges.map((badge) => (
          <article className={badge.earned ? "badge" : "badge locked"} key={badge.id}>
            <span className="seal">{badge.earned ? "✓" : ""}</span>
            <b>{badge.title}</b>
            <span>{badge.detail}</span>
          </article>
        ))}
      </div>

      {LEVELS.map((level) => {
        const group = topics.filter((topic) => topic.level === level);
        const done = group.filter((topic) => progress.topics[topic.id]).length;
        return (
          <div className="result" key={level}>
            <strong>{level}</strong>
            <span className="meter">
              <span style={{ width: `${(done / group.length) * 100}%` }} />
            </span>
            <span className="meta">
              {done}/{group.length}
            </span>
          </div>
        );
      })}

      <h2>Exams</h2>
      {exams.map((exam) => {
        const saved = progress.exams[exam.id];
        return (
          <Link className="result" href={`/exam/${exam.id}`} key={exam.id}>
            <strong>{exam.title}</strong>
            <span className="meta">{saved ? `${saved.level ? `${saved.level} ` : ""}${saved.score} / ${saved.total}` : "Not taken"}</span>
            <span />
          </Link>
        );
      })}

      {weak.length > 0 && (
        <>
          <h2>Worth another pass</h2>
          {weak.map((topic) => {
            const record = progress.topics[topic.id];
            return (
              <Link className="row" href={`/practice/${topic.id}`} key={topic.id}>
                <span className="num">{topic.level}</span>
                <span>
                  <strong>{topic.de}</strong>
                  <em>
                    Best {record.best}/{record.total}
                  </em>
                </span>
              </Link>
            );
          })}
        </>
      )}

      <div className="actions">
        {armed ? (
          <>
            <button
              className="btn"
              type="button"
              onClick={() => {
                clearProgress();
                setArmed(false);
              }}
            >
              Clear the scores
            </button>
            <button className="btn ghost" type="button" onClick={() => setArmed(false)}>
              Keep them
            </button>
          </>
        ) : (
          <button className="btn ghost" type="button" onClick={() => setArmed(true)}>
            Clear this browser’s record
          </button>
        )}
      </div>
    </div>
  );
}

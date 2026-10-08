"use client";

import Link from "next/link";
import { getTopic, listWorkshops } from "@/src/data";
import { DIFFICULTIES } from "@/src/lib/levels";
import { useProgress } from "./useProgress";

function Depths({ progress, topicId, setId }) {
  return (
    <span className="depths">
      {DIFFICULTIES.map((item) => {
        const saved = progress?.workshops?.[`${topicId}/${setId}/${item.id}`];
        const state = saved?.total && saved.best >= saved.total ? "on" : saved ? "tried" : "";
        return (
          <i key={item.id} className={state} title={item.label}>
            {item.mark}
          </i>
        );
      })}
    </span>
  );
}

const labels = {
  choice: "Choice",
  cloze: "Gaps",
  order: "Word order",
  arrange: "Arrange",
  transform: "Rewrite",
  sort: "Sort",
};

function formats(drills) {
  return [...new Set(drills.map((drill) => labels[drill.type] || drill.type))].join(" · ");
}

export function TopicView({ id }) {
  const topic = getTopic(id);
  const progress = useProgress();
  if (!topic) return null;

  const workshops = listWorkshops(id);
  const kinds = [...new Set(topic.drills.map((drill) => drill.type))];
  const exerciseCount = workshops.length + 1;

  return (
    <div className="page">
      <div className="topic-layout">
        <article>
          <p className="kicker">
            <Link href="/learn">Index</Link>
            {" · "}
            {topic.level}
            {" · "}
            {topic.minutes} min
          </p>
          <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.2rem)" }}>
            {topic.de}
          </h1>
          <p className="deck">{topic.blurb}</p>
          <ul className="focus">
            {topic.focus.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {topic.lesson.map((block) => (
            <section className="rule" key={block.k}>
              <div className="rule-k">{block.k}</div>
              <div>
                <h2>{block.h}</h2>
                <p>{block.body}</p>
                <div className="examples">
                  {block.examples.map(([label, sentence]) => (
                    <figure key={`${label}-${sentence}`}>
                      <figcaption>{label}</figcaption>
                      <blockquote>{sentence}</blockquote>
                    </figure>
                  ))}
                </div>
              </div>
            </section>
          ))}
          {topic.pitfalls?.length > 0 && (
            <div className="pit">
              <h2>Easy to miss</h2>
              {topic.pitfalls.map((item) => (
                <article key={item.bad}>
                  <span className="bad">{item.bad}</span>
                  <span className="good">{item.good}</span>
                  <span className="meta">{item.note}</span>
                </article>
              ))}
            </div>
          )}
          <div className="set-list">
            <h2>Exercises</h2>
            <p className="hint">Each exercise has an easy, medium, and hard sitting. A filled letter is a perfect score.</p>
            {workshops.map((set, index) => {
              const saved = progress?.workshops?.[`${topic.id}/${set.id}`];
              const ratio = saved?.total ? Math.round((saved.best / saved.total) * 100) : 0;
              return (
                <Link className="row" href={`/practice/${topic.id}/${set.id}`} key={set.id}>
                  <span className="num">{String(index + 1).padStart(2, "0")}</span>
                  <span>
                    <strong>{set.title}</strong>
                    <em>
                      {set.level} · {formats(set.drills)} · {set.drills.length} items
                      <Depths progress={progress} topicId={topic.id} setId={set.id} />
                    </em>
                  </span>
                  <span className="meta">{ratio ? `${ratio}%` : "New"}</span>
                </Link>
              );
            })}
            <Link className="row" href={`/practice/${topic.id}`}>
              <span className="num">{String(workshops.length + 1).padStart(2, "0")}</span>
              <span>
                <strong>Mixed practice</strong>
                <em>
                  {topic.level} · {formats(topic.drills)} · {topic.drills.length} items
                  <Depths progress={progress} topicId={topic.id} setId="mixed" />
                </em>
              </span>
              <span className="meta">Review</span>
            </Link>
          </div>
        </article>
        <aside className="sticky-card">
          <p className="kicker" style={{ color: "#f0b2a8" }}>
            Practice
          </p>
          <h2 className="serif" style={{ fontSize: "2rem", margin: "8px 0" }}>
            {exerciseCount} exercises
          </h2>
          <ul>
            {kinds.map((kind) => (
              <li key={kind}>{labels[kind] || kind}</li>
            ))}
          </ul>
          <Link className="btn" href={`/practice/${topic.id}`}>
            Start this chapter
          </Link>
        </aside>
      </div>
    </div>
  );
}

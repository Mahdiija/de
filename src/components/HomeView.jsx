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
          <p className="kicker">Ein Grammatikstudio</p>
          <h1 className="display">
            Deutsche Grammatik,
            <br />
            <em>von A2 bis C1.</em>
          </h1>
          <p className="lede">
            Achtunddreißig Kapitel, wie ein Buch gesetzt und wie ein Studio geübt. Jede Regel ist kurz.
            Jede Aufgabe nennt sofort die richtige Form und den Grund. Drei Prüfungen haben je zweiundsiebzig Fragen.
          </p>
          <div className="hero-actions">
            <Link className="btn" href={last ? `/topic/${last.id}` : "/learn"}>
              {last ? `Weiter · ${last.de}` : "Zum Verzeichnis"}
            </Link>
            <Link className="btn ghost" href="/exams">
              Eine Prüfung schreiben
            </Link>
          </div>
        </div>
        <aside className="side-card">
          <p className="kicker">Auf diesem Tisch</p>
          <strong>{topics.length} Kapitel</strong>
          <p>{studied === 0 ? "In diesem Browser ist noch nichts gespeichert." : `${studied} Kapitel haben schon ein Ergebnis.`}</p>
          <p>Auswahl, Lücken, Wortstellung, Umformen und Zuordnen. Unter jeder getippten Antwort liegen die Umlauttasten.</p>
        </aside>
      </section>

      <div className="section-head">
        <h2>Das Buch</h2>
        <Link href="/learn">Ganzes Verzeichnis</Link>
      </div>
      <div className="chapter-list">
        {LEVELS.map((level) => {
          const group = topics.filter((topic) => topic.level === level);
          return (
            <Link className="chapter" href={`/learn#${anchor(level)}`} key={level}>
              <span className="lv">{level}</span>
              <b>{group.map((topic) => topic.de).slice(0, 3).join(" · ")}</b>
              <span>{group.length} Kapitel</span>
            </Link>
          );
        })}
      </div>

      <div className="section-head">
        <h2>Drei Prüfungen</h2>
        <span className="meta">6 Themen · 72 Fragen</span>
      </div>
      <div className="exam-grid">
        {exams.map((exam) => (
          <Link className="panel" href={`/exam/${exam.id}`} key={exam.id}>
            <span className="roman">{exam.id === "1" ? "I" : exam.id === "2" ? "II" : "III"}</span>
            <h3>{exam.title}</h3>
            <p>{exam.blurb}</p>
            <span className="go">Beginnen</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { structures } from "@/src/data/dsh";
import { matchesAny } from "@/src/lib/text";

const letters = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

function Task({ task }) {
  const [draft, setDraft] = useState("");
  const [phase, setPhase] = useState("answer");
  const right = phase === "feedback" && matchesAny(draft, task.answers);

  function insert(char) {
    setDraft((value) => value + char);
  }

  return (
    <article className="task">
      <p className="kicker">Aufgabe</p>
      <h3 className="serif" style={{ fontSize: "1.6rem", marginBottom: 8 }}>
        {task.instruction}
      </h3>
      <p className="hint">Formen Sie nur den angegebenen Satz um. Der übrige Wortlaut bleibt, soweit die Aufgabe ihn nicht ändern muss.</p>
      <div className="source">{task.source}</div>
      <textarea className="draft" value={draft} disabled={phase === "feedback"} aria-label="Umformung" onChange={(event) => setDraft(event.target.value)} />
      {phase === "answer" && (
        <div className="umlauts">
          {letters.map((char) => (
            <button key={char} type="button" onClick={() => insert(char)}>
              {char}
            </button>
          ))}
        </div>
      )}
      {phase === "feedback" && (
        <div className={right ? "slip" : "slip bad"}>
          <b>{right ? "Richtig." : "Nicht richtig."}</b>
          <p>
            <strong>Ihre Lösung: </strong>
            {draft.trim() || "kein Satz"}
          </p>
          {!right && (
            <p>
              <strong>Verlangt: </strong>
              {task.answers[0]}
            </p>
          )}
          <p>
            <strong>Genau dieser Punkt: </strong>
            {task.why}
          </p>
        </div>
      )}
      {phase === "answer" && (
        <div className="actions">
          <button className="btn" type="button" disabled={!draft.trim()} onClick={() => setPhase("feedback")}>
            Prüfen
          </button>
        </div>
      )}
    </article>
  );
}

export function DshView() {
  return (
    <div className="page narrow">
      <p className="kicker">Wissenschaftssprachliche Strukturen</p>
      <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.2rem)" }}>
        Den Satz
        <br />
        <em>umformen.</em>
      </h1>
      <p className="lede">
        Zwei kurze Berichte in der Form der DSH, Teil wissenschaftssprachliche Strukturen: Relativsatz und Partizip,
        Aktiv und Passiv, Konjunktion und Präposition, in beide Richtungen. Der Wortlaut darf variieren. Die Grammatik nicht.
      </p>
      <p>
        <Link href="/topic/nominal">Nominalisierung</Link>
        {" · "}
        <Link href="/topic/partizip">Partizipien</Link>
        {" · "}
        <Link href="/topic/passiv">Passiv</Link>
      </p>
      {structures.map((piece) => (
        <section key={piece.id}>
          <h2 style={{ marginTop: 48 }}>{piece.de}</h2>
          <p className="meta">
            {piece.level} · {piece.title}
          </p>
          <p>{piece.intro}</p>
          {piece.tasks.map((task) => (
            <Task key={task.source} task={task} />
          ))}
        </section>
      ))}
    </div>
  );
}

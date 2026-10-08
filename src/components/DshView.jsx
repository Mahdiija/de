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
      <h3 className="serif" style={{ fontSize: "1.6rem", marginBottom: 8 }}>
        {task.instruction}
      </h3>
      <div className="source">{task.source}</div>
      <textarea className="draft" value={draft} disabled={phase === "feedback"} aria-label="Rewrite" onChange={(event) => setDraft(event.target.value)} />
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
          <b>{right ? "Correct." : "Not quite."}</b>
          {!right && <p>One accepted answer: {task.answers[0]}</p>}
          <p>{task.why}</p>
        </div>
      )}
      {phase === "answer" && (
        <div className="actions">
          <button className="btn" type="button" disabled={!draft.trim()} onClick={() => setPhase("feedback")}>
            Check
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
        Rewrite the
        <br />
        <em>sentence.</em>
      </h1>
      <p className="lede">
        Two short reports in the shape of the university entrance exam: relative clause to participle, active to
        passive, conjunction to preposition, and back again. The wording can vary. The grammar cannot.
      </p>
      <p>
        <Link href="/topic/nominal">Nominalization</Link>
        {" · "}
        <Link href="/topic/partizip">Participles</Link>
        {" · "}
        <Link href="/topic/passiv">Passive</Link>
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

"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { getTopic, getWorkshop } from "@/src/data";
import { freshBadges } from "@/src/lib/badges";
import { DIFFICULTIES, buildSet } from "@/src/lib/levels";
import { loadProgress, recordTopic, recordWorkshop } from "@/src/lib/progress";
import { matchesAny, parseCloze, shuffle } from "@/src/lib/text";

const keys = ["1", "2", "3", "4"];
const letters = ["ä", "ö", "ü", "ß", "Ä", "Ö", "Ü"];

function expectedText(drill) {
  if (drill.type === "choice") return drill.options[drill.answer];
  if (drill.type === "cloze") return drill.text.replace(/\{([^}]+)\}/g, (_, alt) => alt.split("|")[0]);
  if (drill.type === "order") return drill.answer.join(" ");
  if (drill.type === "arrange") return `${drill.stem} ${drill.answer.join(" ")}`;
  if (drill.type === "transform") return drill.answers[0];
  if (drill.type === "sort") return drill.cards.map((card) => `${card.text} → ${drill.buckets[card.bucket]}`).join(" · ");
  return "";
}

function Marked({ card }) {
  const text = card.text || "";
  const mark = card.mark;
  if (!mark || !text.includes(mark)) return text;
  const start = text.indexOf(mark);
  return (
    <>
      {text.slice(0, start)}
      <mark>{mark}</mark>
      {text.slice(start + mark.length)}
    </>
  );
}

function orderBank(drill) {
  let bank = drill.answer.map((word, index) => ({ id: String(index), word }));
  bank = shuffle(bank);
  if (bank.length > 1 && bank.every((item, index) => item.word === drill.answer[index])) {
    [bank[0], bank[1]] = [bank[1], bank[0]];
  }
  return bank;
}

function Drill({ drill, level = "medium", onDone }) {
  const parsed = drill.type === "cloze" ? parseCloze(drill.text) : null;
  const [picked, setPicked] = useState(null);
  const [phase, setPhase] = useState("answer");
  const [right, setRight] = useState(false);
  const [draft, setDraft] = useState("");
  const [blanks, setBlanks] = useState(() => (parsed ? parsed.blanks.map(() => "") : []));
  const [bank, setBank] = useState(() => (drill.type === "order" || drill.type === "arrange" ? orderBank(drill) : []));
  const [placed, setPlaced] = useState([]);
  const [assign, setAssign] = useState({});
  const [verdict, setVerdict] = useState({});
  const [selected, setSelected] = useState(null);
  const [focus, setFocus] = useState(drill.type === "transform" ? { kind: "draft" } : { kind: "cloze", i: 0 });
  const draftRef = useRef(null);
  const clozeRefs = useRef([]);
  const locked = useRef(false);
  const skipClick = useRef(false);

  function relocate(id, target) {
    const item = [...placed, ...bank].find((entry) => entry.id === id);
    if (!item || phase !== "answer") return;
    const nextPlaced = placed.filter((entry) => entry.id !== id);
    const nextBank = bank.filter((entry) => entry.id !== id);
    if (target.zone === "bank") {
      setBank([...nextBank, item]);
      setPlaced(nextPlaced);
      return;
    }
    const index = target.before ? nextPlaced.findIndex((entry) => entry.id === target.before) : nextPlaced.length;
    nextPlaced.splice(index < 0 ? nextPlaced.length : index, 0, item);
    setPlaced(nextPlaced);
    setBank(nextBank);
  }

  function placeCard(cardIndex, bucketIndex) {
    if (phase !== "answer" || verdict[cardIndex] !== undefined) return;
    const card = drill.cards[cardIndex];
    setAssign((current) => ({ ...current, [cardIndex]: bucketIndex }));
    setVerdict((current) => ({ ...current, [cardIndex]: card.bucket === bucketIndex }));
    setSelected(null);
  }

  function ready() {
    if (drill.type === "choice") return picked !== null;
    if (drill.type === "cloze") return blanks.every((value) => value.trim());
    if (drill.type === "order" || drill.type === "arrange") return placed.length === drill.answer.length;
    if (drill.type === "transform") return draft.trim().length > 0;
    if (drill.type === "sort") return drill.cards.every((_, index) => assign[index] !== undefined);
    return false;
  }

  function evaluate() {
    if (drill.type === "choice") return picked === drill.answer;
    if (drill.type === "cloze") return parsed.blanks.every((alts, index) => matchesAny(blanks[index], alts));
    if (drill.type === "order" || drill.type === "arrange") return placed.map((item) => item.word).join("\u0001") === drill.answer.join("\u0001");
    if (drill.type === "transform") return matchesAny(draft, drill.answers);
    if (drill.type === "sort") return drill.cards.every((card, index) => assign[index] === card.bucket);
    return false;
  }

  function check() {
    if (phase !== "answer" || !ready()) return;
    if (drill.type === "sort") {
      const correct = drill.cards.filter((_, index) => verdict[index]).length;
      setRight(correct === drill.cards.length);
    } else {
      setRight(evaluate());
    }
    setPhase("feedback");
  }

  function finish() {
    if (locked.current || phase !== "feedback") return;
    locked.current = true;
    if (drill.type === "sort") {
      const wrongs = drill.cards
        .map((card, index) => ({ card, index }))
        .filter(({ index }) => verdict[index] === false)
        .map(({ card }) => ({
          prompt: card.text,
          expected: drill.buckets[card.bucket],
          why: card.why,
        }));
      const correct = drill.cards.filter((_, index) => verdict[index]).length;
      onDone({ correct, wrongs });
      return;
    }
    onDone(right);
  }

  function insert(char) {
    if (focus.kind === "draft") {
      const el = draftRef.current;
      const start = el?.selectionStart ?? draft.length;
      const end = el?.selectionEnd ?? draft.length;
      const next = draft.slice(0, start) + char + draft.slice(end);
      setDraft(next);
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(start + char.length, start + char.length);
      });
      return;
    }
    const index = focus.i || 0;
    setBlanks((values) => {
      const copy = [...values];
      const el = clozeRefs.current[index];
      const value = copy[index] || "";
      const start = el?.selectionStart ?? value.length;
      const end = el?.selectionEnd ?? value.length;
      copy[index] = value.slice(0, start) + char + value.slice(end);
      requestAnimationFrame(() => {
        el?.focus();
        el?.setSelectionRange(start + char.length, start + char.length);
      });
      return copy;
    });
  }

  useEffect(() => {
    function onKey(event) {
      if (event.target instanceof HTMLTextAreaElement && event.key === "Enter" && !event.metaKey && !event.ctrlKey) return;
      if (phase === "feedback" && event.key === "Enter") {
        event.preventDefault();
        finish();
        return;
      }
      if (phase !== "answer") return;
      if (drill.type === "choice" && keys.includes(event.key)) {
        setPicked(Number(event.key) - 1);
      }
      if (event.key === "Enter" && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        check();
      }
      if (event.key === "Enter" && event.target instanceof HTMLTextAreaElement && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        check();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const showKeys = drill.type === "transform" || drill.type === "cloze";
  const aufgabe = {
    choice: "Wählen Sie genau eine Lösung. Nur eine Form erfüllt die genannte Bedingung.",
    cloze: "Schreiben Sie in jede Lücke die genaue Form, die der Hinweis verlangt.",
    order: "Bringen Sie jedes Wort an seine Stelle. Die Reihenfolge selbst ist die Aufgabe.",
    arrange: "Der Anfang bleibt stehen. Ordnen Sie den Rest genau nach der genannten Stellung.",
    transform: "Schreiben Sie einen neuen Satz. Er muss die Anweisung erfüllen, nicht nur ungefähr denselben Inhalt.",
    sort: "Jeder markierte Teil gehört in genau einen Rahmen. Die Überschrift des Rahmens ist die Kategorie.",
  }[drill.type];

  function learnerText() {
    if (drill.type === "choice") return picked == null ? "keine Wahl" : drill.options[picked];
    if (drill.type === "cloze" && parsed) {
      let cursor = 0;
      return parsed.parts.map((part) => (part.kind === "text" ? part.value : blanks[cursor++] || "___")).join("");
    }
    if (drill.type === "order") return placed.map((item) => item.word).join(" ");
    if (drill.type === "arrange") return `${drill.stem} ${placed.map((item) => item.word).join(" ")}`.trim();
    if (drill.type === "transform") return draft.trim() || "kein Satz";
    return "";
  }

  return (
    <div>
      <p className="kicker">Aufgabe</p>
      <p className="hint">{aufgabe}</p>
      <h2 className="prompt">{drill.prompt}</h2>
      {drill.type === "order" && <p className="hint">Tippen Sie die Wörter in der richtigen Reihenfolge an. Ein gesetztes Wort tippen Sie wieder zurück.</p>}
      {drill.type === "arrange" && level !== "hard" && (
        <p className="hint">
          {level === "easy"
            ? "Der Anfang ist vorgegeben. Zusammengehörige Wörter bleiben in einer Gruppe."
            : "Der Anfang ist vorgegeben. Ziehen Sie jedes Wort an die richtige Stelle, oder tippen Sie es an."}
        </p>
      )}
      {drill.type === "sort" && (
        <p className="hint">Ziehen Sie den markierten Teil in einen Rahmen, oder tippen Sie ihn an und wählen Sie den Rahmen. Die Rückmeldung kommt sofort.</p>
      )}
      {drill.type === "choice" && (
        <div className="options">
          {drill.options.map((option, index) => {
            let className = "opt";
            if (phase === "answer" && picked === index) className += " on";
            if (phase === "feedback" && index === drill.answer) className += " good";
            if (phase === "feedback" && picked === index && index !== drill.answer) className += " bad";
            return (
              <button
                key={option}
                className={className}
                type="button"
                onClick={() => phase === "answer" && setPicked(index)}
              >
                <span className="key">{index + 1}</span>
                <span>{option}</span>
              </button>
            );
          })}
        </div>
      )}
      {drill.type === "cloze" && (
        <p className="cloze-sentence">
          {parsed.parts.map((part, index) =>
            part.kind === "text" ? (
              <span key={index}>{part.value}</span>
            ) : (
              <input
                key={index}
                ref={(node) => {
                  clozeRefs.current[part.index] = node;
                }}
                aria-label={`Lücke ${part.index + 1}`}
                value={blanks[part.index]}
                onFocus={() => setFocus({ kind: "cloze", i: part.index })}
                onChange={(event) =>
                  setBlanks((values) => values.map((value, blank) => (blank === part.index ? event.target.value : value)))
                }
                disabled={phase === "feedback"}
              />
            )
          )}
        </p>
      )}
      {drill.type === "arrange" && (
        <>
          <div
            className="arrange-line"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              relocate(event.dataTransfer.getData("text/plain"), { zone: "line" });
            }}
          >
            <span className="stem">{drill.stem}</span>
            {placed.map((item) => (
              <button
                key={item.id}
                className="chip"
                type="button"
                draggable={phase === "answer"}
                onDragStart={(event) => {
                  skipClick.current = true;
                  event.dataTransfer.setData("text/plain", item.id);
                }}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  relocate(event.dataTransfer.getData("text/plain"), { zone: "line", before: item.id });
                }}
                onClick={() => {
                  if (skipClick.current) {
                    skipClick.current = false;
                    return;
                  }
                  relocate(item.id, { zone: "bank" });
                }}
              >
                {item.word}
              </button>
            ))}
          </div>
          <div
            className="bank"
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              event.preventDefault();
              relocate(event.dataTransfer.getData("text/plain"), { zone: "bank" });
            }}
          >
            {bank.map((item) => (
              <button
                key={item.id}
                className="chip"
                type="button"
                draggable={phase === "answer"}
                onDragStart={(event) => {
                  skipClick.current = true;
                  event.dataTransfer.setData("text/plain", item.id);
                }}
                onClick={() => {
                  if (skipClick.current) {
                    skipClick.current = false;
                    return;
                  }
                  relocate(item.id, { zone: "line" });
                }}
              >
                {item.word}
              </button>
            ))}
          </div>
          {phase === "answer" && (
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                setPlaced([]);
                setBank(orderBank(drill));
              }}
            >
              Neu beginnen
            </button>
          )}
        </>
      )}
      {drill.type === "order" && (
        <>
          <div className="placed">
            {placed.map((item) => (
              <button
                key={item.id}
                className="token"
                type="button"
                onClick={() => {
                  if (phase !== "answer") return;
                  setPlaced((list) => list.filter((entry) => entry.id !== item.id));
                  setBank((list) => [...list, item]);
                }}
              >
                {item.word}
              </button>
            ))}
          </div>
          <div className="bank">
            {bank.map((item) => (
              <button
                key={item.id}
                className="token"
                type="button"
                onClick={() => {
                  if (phase !== "answer") return;
                  setBank((list) => list.filter((entry) => entry.id !== item.id));
                  setPlaced((list) => [...list, item]);
                }}
              >
                {item.word}
              </button>
            ))}
          </div>
        </>
      )}
      {drill.type === "transform" && (
        <>
          <div className="source">{drill.source}</div>
          <textarea
            ref={draftRef}
            className="draft"
            value={draft}
            disabled={phase === "feedback"}
            aria-label="Ihr Satz"
            onFocus={() => setFocus({ kind: "draft" })}
            onChange={(event) => setDraft(event.target.value)}
          />
        </>
      )}
      {drill.type === "sort" && (
        <>
          <div className="buckets">
            {drill.buckets.map((bucket, bucketIndex) => (
              <div
                key={bucket}
                className={selected !== null && phase === "answer" ? "bucket hot" : "bucket"}
                onDragOver={(event) => event.preventDefault()}
                onDrop={(event) => {
                  event.preventDefault();
                  const cardIndex = Number(event.dataTransfer.getData("text/plain"));
                  if (Number.isInteger(cardIndex)) placeCard(cardIndex, bucketIndex);
                }}
                onClick={() => {
                  if (phase !== "answer" || selected === null) return;
                  placeCard(selected, bucketIndex);
                }}
              >
                <header>{bucket}</header>
                <div className="tray">
                  {drill.cards.map((card, cardIndex) =>
                    assign[cardIndex] === bucketIndex ? (
                      <span key={`${card.text}-${card.mark || cardIndex}`} className={verdict[cardIndex] ? "pill line good" : "pill line bad"}>
                        <Marked card={card} />
                        {verdict[cardIndex] === false && <small> → {drill.buckets[card.bucket]}</small>}
                      </span>
                    ) : null
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="tray">
            {drill.cards.map((card, cardIndex) =>
              assign[cardIndex] === undefined ? (
                <button
                  key={`${card.text}-${card.mark || cardIndex}`}
                  className={selected === cardIndex ? "pill line on" : "pill line"}
                  type="button"
                  draggable={phase === "answer"}
                  onDragStart={(event) => event.dataTransfer.setData("text/plain", String(cardIndex))}
                  onClick={() => phase === "answer" && setSelected(cardIndex)}
                >
                  <Marked card={card} />
                </button>
              ) : null
            )}
          </div>
        </>
      )}
      {showKeys && phase === "answer" && (
        <div className="umlauts" aria-label="Deutsche Zeichen">
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
          {drill.type === "sort" ? (
            <>
              <p>
                {drill.cards.filter((_, index) => verdict[index]).length} von {drill.cards.length} Teilen sitzen im richtigen Rahmen.
              </p>
              {drill.cards.map((card, index) =>
                verdict[index] === false ? (
                  <p key={`${card.text}-${card.mark || index}`}>
                    <strong>{card.mark || card.text}: </strong>
                    Sie haben „{drill.buckets[assign[index]]}“ gewählt. Verlangt ist „{drill.buckets[card.bucket]}“.
                    {card.why ? ` ${card.why}` : ""}
                  </p>
                ) : null
              )}
            </>
          ) : (
            <>
              <p>
                <strong>Ihre Lösung: </strong>
                {learnerText()}
              </p>
              {!right && (
                <p>
                  <strong>Verlangt: </strong>
                  {expectedText(drill)}
                </p>
              )}
              {drill.why && (
                <p>
                  <strong>Genau dieser Punkt: </strong>
                  {drill.why}
                </p>
              )}
            </>
          )}
        </div>
      )}
      <div className="actions">
        {phase === "answer" ? (
          <button className="btn" type="button" disabled={!ready()} onClick={check}>
            Prüfen
          </button>
        ) : (
          <button className="btn" type="button" onClick={finish}>
            Weiter
          </button>
        )}
      </div>
    </div>
  );
}

export function PracticeView({ id, setId }) {
  const topic = getTopic(id);
  const workshop = setId ? getWorkshop(id, setId) : null;
  const source = workshop ? workshop.drills : topic?.drills;
  const [level, setLevel] = useState(null);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [possible, setPossible] = useState(0);
  const [misses, setMisses] = useState([]);
  const [done, setDone] = useState(false);
  const [earned, setEarned] = useState([]);
  const drills = useMemo(() => (source && level ? buildSet(source, level) : []), [source, level]);

  if (!topic || !source?.length) return null;

  function reset(nextLevel) {
    setLevel(nextLevel);
    setIndex(0);
    setScore(0);
    setPossible(0);
    setMisses([]);
    setDone(false);
    setEarned([]);
  }

  function finishOne(result, drill) {
    const weighted = result && typeof result === "object";
    const gained = weighted ? result.correct : result ? 1 : 0;
    const weight = weighted ? drill.cards.length : 1;
    const nextScore = score + gained;
    const nextPossible = possible + weight;
    const nextMisses = weighted
      ? [...misses, ...result.wrongs]
      : result
        ? misses
        : [...misses, { prompt: drill.prompt, why: drill.why, expected: expectedText(drill) }];
    if (nextMisses.length !== misses.length) setMisses(nextMisses);
    setScore(nextScore);
    setPossible(nextPossible);
    if (index + 1 >= drills.length) {
      setDone(true);
      const before = loadProgress();
      const after = workshop
        ? recordWorkshop(topic.id, workshop.id, level, nextScore, nextPossible)
        : recordTopic(topic.id, level, nextScore, nextPossible);
      setEarned(freshBadges(before, after));
    } else {
      setIndex(index + 1);
    }
  }

  const title = workshop ? workshop.title : topic.de;

  if (!level) {
    return (
      <div className="page">
        <div className="stage">
          <div className="stage-top">
            <Link href={`/topic/${topic.id}`}>{title}</Link>
            <span>{source.some((drill) => drill.type === "sort" && drill.cards.some((card) => card.tier)) ? "drei Tafeln" : `${source.length} Aufgaben`}</span>
          </div>
          <p className="kicker">Stufe wählen</p>
          <h2 className="prompt">Leicht, mittel oder schwer.</h2>
          <p className="hint">Eine fehlerfreie Stufe setzt ein Zeichen. Alle drei Stufen derselben Übung ergeben das Zeichen „Drei Stufen“.</p>
          <div className="level-pick">
            {DIFFICULTIES.map((item) => (
              <button className="level-card" type="button" key={item.id} onClick={() => reset(item.id)}>
                <span className="seal">{item.mark}</span>
                <strong>{item.label}</strong>
                <span>{item.practice}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const sitting = DIFFICULTIES.find((item) => item.id === level);

  const sorting = drills.some((drill) => drill.type === "sort");

  return (
    <div className="page">
      <div className={sorting ? "stage broad" : "stage"}>
        <div className="stage-top">
          <Link href={`/topic/${topic.id}`}>{title}</Link>
          <span>
            {sitting.label} · {sorting ? `${drills[index]?.cards?.length || possible} Sätze` : `${done ? drills.length : index + 1} / ${drills.length}`}
          </span>
        </div>
        {workshop?.note && level !== "hard" && !done && <p className="hint">{workshop.note}</p>}
        {done ? (
          <div className="summary">
            <p className="kicker">{sitting.label} beendet</p>
            <h2>
              {score}
              <span style={{ color: "var(--muted)" }}>/{possible}</span>
            </h2>
            <p className="lede">
              {score === possible ? "Jede Aufgabe ist richtig." : "Unten stehen die Fehler, jeweils mit der richtigen Lösung und dem Grund."}
            </p>
            {earned.length > 0 && (
              <div className="badge-row">
                {earned.map((badge) => (
                  <article className="badge" key={badge.id}>
                    <span className="seal">+</span>
                    <b>{badge.title}</b>
                    <span>{badge.detail}</span>
                  </article>
                ))}
              </div>
            )}
            {misses.map((miss) => (
              <article className="miss" key={miss.prompt}>
                <strong>{miss.prompt}</strong>
                <p>
                  <strong>Verlangt: </strong>
                  {miss.expected}
                </p>
                <p className="meta">
                  <strong>Genau dieser Punkt: </strong>
                  {miss.why}
                </p>
              </article>
            ))}
            <div className="actions">
              <button className="btn" type="button" onClick={() => reset(level)}>
                Noch einmal üben
              </button>
              <button className="btn ghost" type="button" onClick={() => reset(null)}>
                Stufe wechseln
              </button>
              <Link className="btn ghost" href={`/topic/${topic.id}`}>
                Kapitel noch einmal lesen
              </Link>
            </div>
          </div>
        ) : (
          <Drill
            key={`${topic.id}-${setId || "core"}-${level}-${index}`}
            drill={drills[index]}
            level={level}
            onDone={(ok) => finishOne(ok, drills[index])}
          />
        )}
      </div>
    </div>
  );
}

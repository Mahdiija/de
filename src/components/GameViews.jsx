"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { exams } from "@/src/data";
import { recordGame } from "@/src/lib/progress";
import { shuffle } from "@/src/lib/text";
import { useProgress } from "./useProgress";

const verbs = [
  ["aufstehen", true],
  ["verstehen", false],
  ["einkaufen", true],
  ["bekommen", false],
  ["anrufen", true],
  ["erzählen", false],
  ["mitkommen", true],
  ["besuchen", false],
  ["aufmachen", true],
  ["gehören", false],
  ["abholen", true],
  ["empfehlen", false],
  ["zuhören", true],
  ["zerstören", false],
  ["einladen", true],
  ["versprechen", false],
  ["weggehen", true],
  ["entscheiden", false],
  ["vorbereiten", true],
  ["erklären", false],
];

const preps = [
  ["durch", 0],
  ["für", 0],
  ["gegen", 0],
  ["ohne", 0],
  ["um", 0],
  ["aus", 1],
  ["bei", 1],
  ["mit", 1],
  ["nach", 1],
  ["seit", 1],
  ["von", 1],
  ["zu", 1],
  ["wegen", 2],
  ["während", 2],
  ["trotz", 2],
  ["statt", 2],
];

export function GameList() {
  const progress = useProgress();
  const cards = [
    ["crossing", "Der Übergang", "Eine Serie zählt mehr. Drei Fehler beenden den Weg, und jeder Fehler nennt das Präfix."],
    ["chambers", "Die Kammern", "Fünfundvierzig Sekunden. Nennen Sie den Kasus. Eine falsche Präposition zeigt die Regel und bricht die Serie."],
    ["blitz", "Blitz", "Prüfungsfragen gegen die Uhr. Tempo zählt, aber eine Serie ist mehr wert als ein Rateversuch."],
  ];
  return (
    <div className="page">
      <p className="kicker">Spiele</p>
      <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.4rem)" }}>
        Schneller als
        <br />
        <em>ein Kapitel.</em>
      </h1>
      <p className="lede">Sie spielen gegen Ihr bestes Ergebnis in diesem Browser. Eine Serie zählt mehr als ein Rateversuch, und ein Fehler zeigt die Regel.</p>
      <div className="game-grid" style={{ marginTop: 28 }}>
        {cards.map(([slug, title, text], index) => (
          <Link className="panel" href={`/games/${slug}`} key={slug}>
            <span className="roman">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
            <span className="go">{progress?.games?.[slug] ? `Bestes Ergebnis ${progress.games[slug].best}` : "Spielen"}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function pointsFor(streak) {
  return Math.min(streak, 4);
}

function useMark(id, round) {
  const progress = useProgress();
  const [mark, setMark] = useState(0);
  const snapped = useRef(null);
  useEffect(() => {
    if (!progress || snapped.current === round) return;
    snapped.current = round;
    setMark(progress.games?.[id]?.best || 0);
  }, [progress, round, id]);
  return mark;
}

function Race({ score, best, streak }) {
  return (
    <div className="race">
      <div>
        <span>Punkte</span>
        <b>{score}</b>
      </div>
      <div>
        <span>Bestes</span>
        <b>{best}</b>
      </div>
      <div>
        <span>Serie</span>
        <b>{streak}</b>
      </div>
    </div>
  );
}

function Verdict({ score, best }) {
  if (score > best) return <p className="lede">Neues bestes Ergebnis. Der alte Stand war {best}.</p>;
  if (best > 0 && score === best) return <p className="lede">Sie haben Ihr bestes Ergebnis erreicht.</p>;
  if (best > 0) return <p className="lede">Ihr bestes Ergebnis bleibt {best}. Diese Runde liegt {best - score} darunter.</p>;
  return <p className="lede">Das ist der erste Stand in diesem Browser.</p>;
}

function prefixNote(verb, separates) {
  if (separates) return `${verb} ist trennbar. Das Präfix ist betont und steht im Hauptsatz am Ende.`;
  return `${verb} bleibt zusammen. be-, emp-, ent-, er-, ver- und zer- verlassen das Verb nicht.`;
}

export function CrossingGame() {
  const [round, setRound] = useState(0);
  const best = useMark("crossing", round);
  const deck = useMemo(() => shuffle(verbs).slice(0, 12), [round]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [wrongs, setWrongs] = useState(0);
  const [misses, setMisses] = useState([]);
  const [note, setNote] = useState("");
  const [locked, setLocked] = useState(false);
  const saved = useRef(false);
  const scoreRef = useRef(0);
  const over = wrongs >= 3 || step >= deck.length;

  useEffect(() => {
    if (!over || saved.current) return;
    saved.current = true;
    recordGame("crossing", scoreRef.current);
  }, [over]);

  function choose(separable) {
    if (over || locked) return;
    const [verb, separates] = deck[step];
    const correct = separates === separable;
    setLocked(true);
    if (correct) {
      const nextStreak = streak + 1;
      const gained = pointsFor(nextStreak);
      scoreRef.current += gained;
      setStreak(nextStreak);
      setScore(scoreRef.current);
      setNote(`+${gained}. ${prefixNote(verb, separates)}`);
    } else {
      setStreak(0);
      setWrongs((value) => value + 1);
      setMisses((list) => [...list, { verb, note: prefixNote(verb, separates) }]);
      setNote(prefixNote(verb, separates));
    }
    window.setTimeout(() => {
      setStep((value) => value + 1);
      setNote("");
      setLocked(false);
    }, correct ? 450 : 1100);
  }

  const current = deck[Math.min(step, deck.length - 1)];

  return (
    <div className="page narrow">
      <p className="kicker">
        <Link href="/games">Spiele</Link> · Der Übergang
      </p>
      {over ? (
        <div className="summary">
          <h2>{score}</h2>
          <Verdict score={score} best={best} />
          <p className="lede">{wrongs >= 3 ? "Drei Fehler. Das andere Ufer wartet." : "Sie sind hinüber."}</p>
          {misses.map((miss) => (
            <article className="miss" key={miss.verb}>
              <strong>{miss.verb}</strong>
              <p>{miss.note}</p>
            </article>
          ))}
          <div className="actions">
            <Link className="btn" href="/topic/trennbar">
              Trennbare Verben lesen
            </Link>
            <button
              className="btn ghost"
              type="button"
              onClick={() => {
                saved.current = false;
                scoreRef.current = 0;
                setRound((value) => value + 1);
                setStep(0);
                setScore(0);
                setStreak(0);
                setWrongs(0);
                setMisses([]);
                setNote("");
                setLocked(false);
              }}
            >
              Noch einmal gehen
            </button>
          </div>
        </div>
      ) : (
        <>
          <Race score={score} best={best} streak={streak} />
          <div className="stage-top">
            <div className="lives" aria-label={`${3 - wrongs} Versuche übrig`}>
              {[0, 1, 2].map((mark) => (
                <i key={mark} className={mark < wrongs ? "off" : undefined} />
              ))}
            </div>
            <span>
              {step + 1}/{deck.length}
            </span>
          </div>
          <p className="verb">{current[0]}</p>
          <p className="hint">{note || "Trennt sich das Präfix vom Verb? Eine Serie zählt mehr als ein einzelner Schritt."}</p>
          <div className="actions">
            <button className="btn" type="button" onClick={() => choose(true)}>
              Es trennt sich
            </button>
            <button className="btn ghost" type="button" onClick={() => choose(false)}>
              Es bleibt zusammen
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const cases = ["Akkusativ", "Dativ", "Genitiv"];
const caseRule = [
  "durch, für, gegen, ohne, um",
  "aus, bei, mit, nach, seit, von, zu",
  "wegen, während, trotz, statt",
];

export function ChambersGame() {
  const [round, setRound] = useState(0);
  const best = useMark("chambers", round);
  const deck = useMemo(() => shuffle([...preps, ...preps]), [round]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [left, setLeft] = useState(45);
  const [over, setOver] = useState(false);
  const [held, setHeld] = useState(false);
  const [note, setNote] = useState("");
  const [misses, setMisses] = useState([]);
  const saved = useRef(false);
  const scoreRef = useRef(0);
  const item = deck[index % deck.length];

  useEffect(() => {
    if (over) return undefined;
    const timer = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setOver(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [over, round]);

  useEffect(() => {
    if (!over || saved.current) return;
    saved.current = true;
    recordGame("chambers", scoreRef.current);
  }, [over]);

  function choose(caseIndex) {
    if (over || held) return;
    const correct = caseIndex === item[1];
    if (correct) {
      const nextStreak = streak + 1;
      scoreRef.current += pointsFor(nextStreak);
      setStreak(nextStreak);
      setScore(scoreRef.current);
      setNote("");
      setIndex((value) => value + 1);
      return;
    }
    setStreak(0);
    setHeld(true);
    setNote(`${item[0]} regiert den ${cases[item[1]]}: ${caseRule[item[1]]}.`);
    setMisses((list) => [...list.filter((miss) => miss.word !== item[0]), { word: item[0], note: `${cases[item[1]]}. ${caseRule[item[1]]}.` }]);
    window.setTimeout(() => {
      setNote("");
      setHeld(false);
      setIndex((value) => value + 1);
    }, 900);
  }

  function again() {
    saved.current = false;
    scoreRef.current = 0;
    setRound((value) => value + 1);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setLeft(45);
    setOver(false);
    setHeld(false);
    setNote("");
    setMisses([]);
  }

  return (
    <div className="page narrow">
      <p className="kicker">
        <Link href="/games">Spiele</Link> · Die Kammern
      </p>
      {over ? (
        <div className="summary">
          <h2>{score}</h2>
          <Verdict score={score} best={best} />
          {misses.map((miss) => (
            <article className="miss" key={miss.word}>
              <strong>{miss.word}</strong>
              <p>{miss.note}</p>
            </article>
          ))}
          <div className="slip">
            <p>Akkusativ: {caseRule[0]}. Dativ: {caseRule[1]}. Genitiv in der Schriftsprache: {caseRule[2]}.</p>
          </div>
          <div className="actions">
            <Link className="btn" href="/topic/praepositionen">
              Präpositionen öffnen
            </Link>
            <button className="btn ghost" type="button" onClick={again}>
              Noch einmal
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="timer">{left}</div>
          <Race score={score} best={best} streak={streak} />
          <p className="verb">{item[0]}</p>
          <p className="hint">{note || "Welchen Kasus regiert sie?"}</p>
          <div className="actions">
            {cases.map((label, caseIndex) => (
              <button className="btn" type="button" key={label} onClick={() => choose(caseIndex)}>
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function BlitzGame() {
  const [round, setRound] = useState(0);
  const best = useMark("blitz", round);
  const deck = useMemo(() => shuffle(exams.flatMap((exam) => exam.questions)), [round]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [left, setLeft] = useState(45);
  const [over, setOver] = useState(false);
  const [held, setHeld] = useState(false);
  const [picked, setPicked] = useState(null);
  const [misses, setMisses] = useState([]);
  const saved = useRef(false);
  const scoreRef = useRef(0);
  const question = deck[index % deck.length];

  useEffect(() => {
    if (over) return undefined;
    const timer = window.setInterval(() => {
      setLeft((value) => {
        if (value <= 1) {
          setOver(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [over, round]);

  useEffect(() => {
    if (!over || saved.current) return;
    saved.current = true;
    recordGame("blitz", scoreRef.current);
  }, [over]);

  useEffect(() => {
    function onKey(event) {
      if (!["1", "2", "3", "4"].includes(event.key)) return;
      event.preventDefault();
      pick(Number(event.key) - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  function pick(choice) {
    if (over || held || choice < 0 || choice >= question.options.length) return;
    const correct = choice === question.answer;
    if (correct) {
      const nextStreak = streak + 1;
      scoreRef.current += pointsFor(nextStreak);
      setStreak(nextStreak);
      setScore(scoreRef.current);
      setIndex((value) => value + 1);
      return;
    }
    setStreak(0);
    setHeld(true);
    setPicked(choice);
    setMisses((list) =>
      [{ prompt: question.prompt, answer: question.options[question.answer], why: question.why }, ...list].slice(0, 4),
    );
    window.setTimeout(() => {
      setPicked(null);
      setHeld(false);
      setIndex((value) => value + 1);
    }, 900);
  }

  function again() {
    saved.current = false;
    scoreRef.current = 0;
    setRound((value) => value + 1);
    setIndex(0);
    setScore(0);
    setStreak(0);
    setLeft(45);
    setOver(false);
    setHeld(false);
    setPicked(null);
    setMisses([]);
  }

  return (
    <div className="page narrow">
      <p className="kicker">
        <Link href="/games">Spiele</Link> · Blitz
      </p>
      {over ? (
        <div className="summary">
          <h2>{score}</h2>
          <Verdict score={score} best={best} />
          {misses.map((miss) => (
            <article className="miss" key={miss.prompt}>
              <strong>{miss.prompt}</strong>
              <p>{miss.answer}</p>
              <p className="meta">{miss.why}</p>
            </article>
          ))}
          <button className="btn" type="button" onClick={again}>
            Noch einmal
          </button>
        </div>
      ) : (
        <>
          <div className="timer">{left}</div>
          <Race score={score} best={best} streak={streak} />
          <h2 className="prompt">{question.prompt}</h2>
          <div className="options">
            {question.options.map((option, optionIndex) => {
              let className = "opt";
              if (held && optionIndex === question.answer) className += " good";
              if (held && optionIndex === picked && optionIndex !== question.answer) className += " bad";
              return (
                <button key={`${index}-${optionIndex}`} className={className} type="button" onClick={() => pick(optionIndex)}>
                  <span className="key">{optionIndex + 1}</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>
          <p className="hint">{held ? question.why : "Tasten 1–4. Eine falsche Antwort kostet die Serie und fast eine Sekunde."}</p>
        </>
      )}
    </div>
  );
}

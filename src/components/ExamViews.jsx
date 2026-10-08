"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { exams, getExam } from "@/src/data";
import { freshBadges } from "@/src/lib/badges";
import { DIFFICULTIES, examPaper } from "@/src/lib/levels";
import { loadProgress, recordExam } from "@/src/lib/progress";
import { useProgress } from "./useProgress";

const roman = { 1: "I", 2: "II", 3: "III" };

function bestSitting(progress, id) {
  const candidates = DIFFICULTIES.map((item) => progress?.exams?.[`${id}/${item.id}`]).filter((item) => item?.total);
  return candidates.sort((left, right) => right.score / right.total - left.score / left.total)[0] || null;
}

export function ExamList() {
  const progress = useProgress();
  return (
    <div className="page">
      <p className="kicker">Exams</p>
      <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5.4rem)" }}>
        Seventy-two
        <br />
        <em>questions.</em>
      </h1>
      <p className="lede">
        Each paper has three sittings. Easy is four direct questions a topic. Medium is eight. Hard is the later
        six, and the pass mark rises with the sitting. Answers stay hidden until you hand the paper in.
      </p>
      <div className="exam-grid" style={{ marginTop: 28 }}>
        {exams.map((exam) => {
          const saved = bestSitting(progress, exam.id);
          return (
            <Link className="panel" href={`/exam/${exam.id}`} key={exam.id}>
              <span className="roman">{roman[exam.id]}</span>
              <h3>{exam.title}</h3>
              <p>{exam.blurb}</p>
              <span className="go">
                {saved ? `Best ${saved.level} ${saved.score} / ${saved.total}` : "Choose a sitting"}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export function ExamRun({ id }) {
  const exam = getExam(id);
  const progress = useProgress();
  const [level, setLevel] = useState(null);
  const [cursor, setCursor] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [arm, setArm] = useState(false);
  const [earned, setEarned] = useState([]);
  const paper = useMemo(() => (exam && level ? examPaper(exam, level) : null), [exam, level]);
  const sitting = DIFFICULTIES.find((item) => item.id === level);

  const groups = paper?.sections || [];

  if (!exam) return null;

  function choose(next) {
    setLevel(next);
    setCursor(0);
    setAnswers({});
    setSubmitted(false);
    setArm(false);
    setEarned([]);
  }

  if (!level || !paper) {
    return (
      <div className="page">
        <div className="stage">
          <div className="stage-top">
            <Link href="/exams">{exam.title}</Link>
            <span>72 in the full bank</span>
          </div>
          <p className="kicker">Choose a sitting</p>
          <h2 className="prompt">The same six topics. A different cut.</h2>
          <div className="level-pick">
            {DIFFICULTIES.map((item) => {
              const saved = progress?.exams?.[`${exam.id}/${item.id}`];
              const count = item.id === "easy" ? 24 : item.id === "medium" ? 48 : 36;
              return (
                <button className="level-card" type="button" key={item.id} onClick={() => choose(item.id)}>
                  <span className="seal">{item.mark}</span>
                  <strong>{item.label}</strong>
                  <span>
                    {item.exam} {count} questions. Pass mark {Math.round(item.bar * 100)}%.
                    {saved ? ` Best ${saved.score}/${saved.total}.` : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const question = paper.questions[cursor];
  const unanswered = paper.questions.length - Object.keys(answers).length;

  function handIn() {
    const byTopic = {};
    groups.forEach((group) => {
      const slice = paper.questions.slice(group.start, group.start + group.count);
      const correct = slice.filter((item, index) => answers[group.start + index] === item.answer).length;
      byTopic[group.id] = { correct, total: group.count, href: group.href, title: group.title };
    });
    const score = Object.values(byTopic).reduce((sum, item) => sum + item.correct, 0);
    const before = loadProgress();
    const after = recordExam(exam.id, level, { score, total: paper.questions.length, byTopic });
    setEarned(freshBadges(before, after));
    setSubmitted(true);
    setArm(false);
  }

  if (submitted) {
    const saved = groups.map((group) => {
      const slice = paper.questions.slice(group.start, group.start + group.count);
      const correct = slice.filter((item, index) => answers[group.start + index] === item.answer).length;
      return { ...group, correct };
    });
    const score = saved.reduce((sum, item) => sum + item.correct, 0);
    const bar = Math.round(sitting.bar * 100);
    const wrongs = paper.questions
      .map((item, index) => ({ item, index, picked: answers[index] }))
      .filter((entry) => entry.picked !== entry.item.answer);

    return (
      <div className="page narrow">
        <p className="kicker">
          {exam.title} · {sitting.label}
        </p>
        <h1 className="display" style={{ fontSize: "clamp(3.4rem, 8vw, 6rem)" }}>
          {score}
          <span style={{ color: "var(--muted)" }}>/{paper.questions.length}</span>
        </h1>
        <p className="lede">Red bars are under {bar}%. Open the chapter and the rule is still there.</p>
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
        {saved.map((group) => {
          const pct = Math.round((group.correct / group.count) * 100);
          return (
            <Link className="result" href={`/topic/${group.href}`} key={group.id}>
              <strong>{group.title}</strong>
              <span className={pct < bar ? "meter weak" : "meter"}>
                <span style={{ width: `${pct}%` }} />
              </span>
              <span className="meta">
                {group.correct}/{group.count}
              </span>
            </Link>
          );
        })}
        {wrongs.length > 0 && (
          <>
            <h2 style={{ marginTop: 36 }}>Missed</h2>
            {wrongs.map(({ item, index }) => (
              <article className="miss" key={index}>
                <strong>
                  {index + 1}. {item.prompt}
                </strong>
                <p>{item.options[item.answer]}</p>
                <p className="meta">{item.why}</p>
              </article>
            ))}
          </>
        )}
        <div className="actions">
          <button className="btn" type="button" onClick={() => choose(null)}>
            Another sitting
          </button>
          <Link className="btn ghost" href="/exams">
            All exams
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="exam-layout">
        <aside className="rail">
          <p className="kicker">
            {exam.title} · {sitting.label}
          </p>
          {groups.map((group) => (
            <div key={group.id}>
              <h3>{group.title}</h3>
              <div className="dots">
                {Array.from({ length: group.count }, (_, offset) => {
                  const index = group.start + offset;
                  const className = ["dot", answers[index] !== undefined ? "filled" : "", index === cursor ? "here" : ""]
                    .filter(Boolean)
                    .join(" ");
                  return (
                    <button key={index} className={className} type="button" aria-label={`Question ${index + 1}`} onClick={() => setCursor(index)} />
                  );
                })}
              </div>
            </div>
          ))}
        </aside>
        <div className="stage">
          <div className="stage-top">
            <span>
              {cursor + 1} / {paper.questions.length}
            </span>
            <span>{unanswered} open</span>
          </div>
          <h2 className="prompt">{question.prompt}</h2>
          <div className="options">
            {question.options.map((option, index) => (
              <button
                key={`${cursor}-${index}`}
                className={answers[cursor] === index ? "opt on" : "opt"}
                type="button"
                onClick={() => setAnswers((current) => ({ ...current, [cursor]: index }))}
              >
                <span className="key">{index + 1}</span>
                <span>{option}</span>
              </button>
            ))}
          </div>
          <div className="actions">
            <button className="btn ghost" type="button" disabled={cursor === 0} onClick={() => setCursor((value) => value - 1)}>
              Back
            </button>
            {cursor < paper.questions.length - 1 ? (
              <button className="btn" type="button" onClick={() => setCursor((value) => value + 1)}>
                Next
              </button>
            ) : (
              <button className="btn" type="button" onClick={() => setArm(true)}>
                Hand in
              </button>
            )}
            {cursor < paper.questions.length - 1 && (
              <button className="btn ghost" type="button" onClick={() => setArm(true)}>
                Hand in early
              </button>
            )}
          </div>
          {arm && (
            <div className="slip">
              <b>{unanswered ? `${unanswered} questions are still open.` : "Ready to hand this in?"}</b>
              <p>You will see the score by topic, and every miss with the reason.</p>
              <div className="actions">
                <button className="btn" type="button" onClick={handIn}>
                  Show the result
                </button>
                <button className="btn ghost" type="button" onClick={() => setArm(false)}>
                  Keep working
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

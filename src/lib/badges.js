import { LEVELS, listWorkshops, topics } from "../data/index.js";
import { DIFFICULTIES } from "./levels.js";

function records(progress) {
  return Object.entries(progress?.workshops || {}).filter(([key]) => key.split("/").length === 3);
}

function perfect(record) {
  return Boolean(record && record.total && record.best >= record.total);
}

function examsOf(progress) {
  return Object.entries(progress?.exams || {}).filter(([key]) => key.includes("/"));
}

function ratio(record) {
  if (!record?.total) return 0;
  return record.score / record.total;
}

export function badgeList(progress) {
  const rows = records(progress);
  const perfectRows = rows.filter(([, record]) => perfect(record));
  const byDepth = (level) => perfectRows.some(([key]) => key.endsWith(`/${level}`));
  const grouped = new Map();
  perfectRows.forEach(([key]) => {
    const [topicId, setId, level] = key.split("/");
    const id = `${topicId}/${setId}`;
    if (!grouped.has(id)) grouped.set(id, new Set());
    grouped.get(id).add(level);
  });
  const threeDepths = [...grouped.values()].some((levels) => levels.size === 3);
  const chapter = topics.some((topic) => {
    const sets = listWorkshops(topic.id);
    return sets.length > 0 && sets.every((set) => grouped.has(`${topic.id}/${set.id}`));
  });
  const bands = LEVELS.every((level) =>
    perfectRows.some(([key]) => {
      const topic = topics.find((item) => item.id === key.split("/")[0]);
      return topic?.level === level;
    }),
  );
  const papers = examsOf(progress);
  const cleared = papers.filter(([, record]) => {
    const level = record.level || "medium";
    const bar = DIFFICULTIES.find((item) => item.id === level)?.bar ?? 0.6;
    return ratio(record) >= bar;
  });
  const hardIds = new Set(
    papers.filter(([key, record]) => key.endsWith("/hard") && ratio(record) >= 0.8).map(([key]) => key.split("/")[0]),
  );
  const satIds = new Set(papers.map(([key]) => key.split("/")[0]));

  const items = [
    ["first-sitting", "Erste Runde", "Eine Übung zu Ende gemacht.", rows.length > 0],
    ["clean-sheet", "Ohne Fehler", "In einer Übung jede Aufgabe richtig.", perfectRows.length > 0],
    ["light-hand", "Leichte Stufe", "Eine leichte Übung ohne Fehler.", byDepth("easy")],
    ["even-pace", "Mittlere Stufe", "Eine mittlere Übung ohne Fehler.", byDepth("medium")],
    ["hard-line", "Schwere Stufe", "Eine schwere Übung ohne Fehler.", byDepth("hard")],
    ["three-depths", "Drei Stufen", "Leicht, mittel und schwer, alle ohne Fehler, in derselben Übung.", threeDepths],
    ["whole-chapter", "Ganzes Kapitel", "Jede Übung eines Kapitels auf irgendeiner Stufe ohne Fehler.", chapter],
    ["ten-sheets", "Zehn Blätter", "Zehn verschiedene Übungen ohne Fehler.", perfectRows.length >= 10],
    ["paper", "Prüfung abgegeben", "Eine Prüfung abgegeben.", papers.length > 0],
    ["the-bar", "Bestanden", "Die Bestehensgrenze einer Prüfung erreicht.", cleared.length > 0],
    ["distinction", "Mit Auszeichnung", "Mindestens 90 Prozent in einer Prüfung.", papers.some(([, record]) => ratio(record) >= 0.9)],
    ["unmarked", "Ohne Strich", "Jede Prüfungsfrage richtig.", papers.some(([, record]) => ratio(record) === 1)],
    ["hard-paper", "Schwere Prüfung", "Eine schwere Prüfung bestanden.", hardIds.size > 0],
    ["three-papers", "Drei Prüfungen", "Alle drei Prüfungen abgegeben.", satIds.size >= 3],
    ["hard-set", "Schweres Trio", "Alle drei Prüfungen auf schwer bestanden.", hardIds.size >= 3],
    ["the-bands", "Alle Niveaus", "Eine fehlerfreie Übung auf jeder Stufe von A2 bis C1.", bands],
  ];

  return items.map(([id, title, detail, earned]) => ({ id, title, detail, earned }));
}

export function freshBadges(before, after) {
  const owned = new Set(badgeList(before).filter((badge) => badge.earned).map((badge) => badge.id));
  return badgeList(after).filter((badge) => badge.earned && !owned.has(badge.id));
}

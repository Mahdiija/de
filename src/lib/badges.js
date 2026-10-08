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
    ["first-sitting", "First sitting", "Finish any practice.", rows.length > 0],
    ["clean-sheet", "Clean sheet", "Every item right in one practice.", perfectRows.length > 0],
    ["light-hand", "Light hand", "A perfect easy practice.", byDepth("easy")],
    ["even-pace", "Even pace", "A perfect medium practice.", byDepth("medium")],
    ["hard-line", "Hard line", "A perfect hard practice.", byDepth("hard")],
    ["three-depths", "Three depths", "Easy, medium, and hard, all perfect, on the same exercise.", threeDepths],
    ["whole-chapter", "Whole chapter", "Every exercise in one chapter perfect at some depth.", chapter],
    ["ten-sheets", "Ten sheets", "Ten different perfect practices.", perfectRows.length >= 10],
    ["paper", "Paper", "Hand in an exam.", papers.length > 0],
    ["the-bar", "The bar", "Clear an exam’s pass mark.", cleared.length > 0],
    ["distinction", "Distinction", "90% or better on an exam.", papers.some(([, record]) => ratio(record) >= 0.9)],
    ["unmarked", "Unmarked", "Every exam question right.", papers.some(([, record]) => ratio(record) === 1)],
    ["hard-paper", "Hard paper", "Clear a hard exam.", hardIds.size > 0],
    ["three-papers", "Three papers", "Sit all three exams.", satIds.size >= 3],
    ["hard-set", "Hard set", "Clear all three exams on hard.", hardIds.size >= 3],
    ["the-bands", "The bands", "A perfect practice in every band from A2 to C1.", bands],
  ];

  return items.map(([id, title, detail, earned]) => ({ id, title, detail, earned }));
}

export function freshBadges(before, after) {
  const owned = new Set(badgeList(before).filter((badge) => badge.earned).map((badge) => badge.id));
  return badgeList(after).filter((badge) => badge.earned && !owned.has(badge.id));
}

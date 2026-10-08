const KEY = "klarform.progress.v1";

const empty = () => ({
  topics: {},
  workshops: {},
  exams: {},
  games: {},
  lastTopic: null,
});

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    return { ...empty(), ...JSON.parse(raw) };
  } catch {
    return empty();
  }
}

export function saveProgress(progress) {
  localStorage.setItem(KEY, JSON.stringify(progress));
  window.dispatchEvent(new Event("klarform-progress"));
}

function writeWorkshop(progress, key, correct, total) {
  const prev = progress.workshops?.[key] || { best: 0 };
  progress.workshops = {
    ...(progress.workshops || {}),
    [key]: {
      best: Math.max(prev.best, correct),
      total,
      last: correct,
      perfects: (prev.perfects || 0) + (correct === total ? 1 : 0),
      at: Date.now(),
    },
  };
}

export function recordWorkshop(topicId, setId, level, correct, total) {
  const progress = loadProgress();
  writeWorkshop(progress, `${topicId}/${setId}/${level}`, correct, total);
  progress.lastTopic = topicId;
  saveProgress(progress);
  return progress;
}

export function recordTopic(id, level, correct, total) {
  const progress = loadProgress();
  const prev = progress.topics[id] || { best: 0, attempts: 0, last: 0 };
  progress.topics[id] = {
    best: Math.max(prev.best, correct),
    attempts: prev.attempts + 1,
    last: correct,
    total,
    at: Date.now(),
  };
  writeWorkshop(progress, `${id}/mixed/${level}`, correct, total);
  progress.lastTopic = id;
  saveProgress(progress);
  return progress;
}

export function recordExam(id, level, result) {
  const progress = loadProgress();
  const entry = { ...result, level, at: Date.now() };
  progress.exams[`${id}/${level}`] = entry;
  const previous = progress.exams[id];
  const previousRatio = previous?.total ? previous.score / previous.total : -1;
  const nextRatio = result.total ? result.score / result.total : 0;
  if (!previous || nextRatio >= previousRatio) progress.exams[id] = entry;
  saveProgress(progress);
  return progress;
}

export function clearProgress() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("klarform-progress"));
  return empty();
}

export function recordGame(id, score) {
  const progress = loadProgress();
  const prev = progress.games[id] || { best: 0, runs: 0 };
  progress.games[id] = {
    best: Math.max(prev.best || 0, score),
    last: score,
    runs: (prev.runs || 0) + 1,
    at: Date.now(),
  };
  saveProgress(progress);
  return progress;
}

export const DIFFICULTIES = [
  {
    id: "easy",
    label: "Easy",
    mark: "E",
    practice: "The shorter items. Words that belong together stay in one piece.",
    exam: "Four questions from each topic, the more direct ones.",
    bar: 0.6,
  },
  {
    id: "medium",
    label: "Medium",
    mark: "M",
    practice: "A full middle set. Ordering items are split into single words.",
    exam: "Eight questions from each topic.",
    bar: 0.7,
  },
  {
    id: "hard",
    label: "Hard",
    mark: "H",
    practice: "The longest sentences. Less of the line is given, and the note stays hidden.",
    exam: "The later questions only, six from each topic.",
    bar: 0.8,
  },
];

export function difficultyById(id) {
  return DIFFICULTIES.find((item) => item.id === id) || DIFFICULTIES[1];
}

export function difficultyScore(drill) {
  if (!drill) return 0;
  if (drill.type === "arrange" || drill.type === "order") return drill.answer.length * 4 + drill.answer.join(" ").length;
  if (drill.type === "cloze") return (drill.text.match(/\{/g) || []).length * 14 + drill.text.length / 6;
  if (drill.type === "transform") return Math.max(...drill.answers.map((answer) => answer.split(/\s+/).length));
  if (drill.type === "choice") return drill.options.join(" ").length / 12;
  if (drill.type === "sort") return drill.cards.length * 4;
  return 1;
}

function chunkWords(words) {
  if (words.length <= 3) return words.slice();
  const size = words.length >= 8 ? 3 : 2;
  const chunks = [];
  for (let index = 0; index < words.length; index += size) chunks.push(words.slice(index, index + size).join(" "));
  if (chunks.length > 1 && !chunks.at(-1).includes(" ")) {
    const last = chunks.pop();
    chunks[chunks.length - 1] = `${chunks[chunks.length - 1]} ${last}`;
  }
  return chunks;
}

function hardenArrange(drill) {
  const stemWords = String(drill.stem || "").trim().split(/\s+/).filter(Boolean);
  if (stemWords.length < 4) return drill;
  const keep = 2;
  return {
    ...drill,
    stem: stemWords.slice(0, keep).join(" "),
    answer: [...stemWords.slice(keep), ...drill.answer],
  };
}

function present(drill, level) {
  if (drill.type === "sort" && drill.cards.some((card) => card.tier)) {
    const cards = drill.cards.filter((card) => card.tier === level);
    return { ...drill, cards: cards.length ? cards : drill.cards };
  }
  if (level === "hard" && drill.type === "arrange") return hardenArrange(drill);
  if (level === "easy" && (drill.type === "arrange" || drill.type === "order") && drill.answer.length > 3) {
    return { ...drill, answer: chunkWords(drill.answer) };
  }
  return drill;
}

export function buildSet(drills, level) {
  const ranked = drills
    .map((drill, index) => ({ drill, index, score: difficultyScore(drill) }))
    .sort((left, right) => left.score - right.score || left.index - right.index);
  const count = ranked.length;
  let chosen = ranked;
  if (count > 4) {
    const take = level === "hard" ? Math.max(5, Math.ceil(count * 0.6)) : Math.max(4, Math.ceil(count * 0.45));
    if (level === "easy") chosen = ranked.slice(0, take);
    else if (level === "hard") chosen = ranked.slice(count - take);
    else {
      const start = Math.max(0, Math.floor((count - take) / 2));
      chosen = ranked.slice(start, start + take);
    }
  }
  return chosen.map(({ drill }) => present(drill, level));
}

export function examPaper(exam, level) {
  const window = level === "easy" ? [0, 4] : level === "hard" ? [6, 12] : [2, 10];
  const questions = [];
  const sections = exam.sections.map((section) => {
    const all = exam.questions.filter((question) => question.topic === section.id);
    const slice = all.slice(window[0], window[1]);
    const start = questions.length;
    questions.push(...slice);
    return { ...section, start, count: slice.length };
  });
  return { questions, sections };
}

export function sittingKey(scope, id, level) {
  return `${scope}/${id}/${level}`;
}

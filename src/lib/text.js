export function fold(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[„“”"«»']/g, "")
    .replace(/[.!?,;:()[\]—–-]/g, "")
    .replace(/\s+/g, " ")
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");
}

export function sameText(input, expected) {
  return fold(input) === fold(expected);
}

export function matchesAny(input, answers) {
  const got = fold(input);
  return answers.some((answer) => fold(answer) === got);
}

export function parseCloze(text) {
  const parts = [];
  const blanks = [];
  const re = /\{([^}]+)\}/g;
  let last = 0;
  let match;
  while ((match = re.exec(text))) {
    parts.push({ kind: "text", value: text.slice(last, match.index) });
    blanks.push(match[1].split("|").map((item) => item.trim()));
    parts.push({ kind: "blank", index: blanks.length - 1 });
    last = match.index + match[0].length;
  }
  parts.push({ kind: "text", value: text.slice(last) });
  return { parts, blanks };
}

export function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

export function uid() {
  return Math.random().toString(36).slice(2, 9);
}

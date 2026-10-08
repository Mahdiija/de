import { exams, topics, workshops } from "../src/data/index.js";
import { parseCloze } from "../src/lib/text.js";

const errors = [];

for (const topic of topics) {
  if (!topic.lesson?.length) errors.push(`${topic.id} has no lesson`);
  if (!topic.drills?.length) errors.push(`${topic.id} has no drills`);
  topic.drills.forEach((drill, index) => {
    const where = `${topic.id}#${index}`;
    if (!drill.prompt || (drill.type !== "sort" && !drill.why)) errors.push(`${where} missing prompt or why`);
    if (drill.type === "choice") {
      if (!Array.isArray(drill.options) || drill.answer < 0 || drill.answer >= drill.options.length) {
        errors.push(`${where} bad choice`);
      } else if (new Set(drill.options).size !== drill.options.length) {
        errors.push(`${where} duplicate options`);
      }
    } else if (drill.type === "cloze") {
      if (!parseCloze(drill.text).blanks.length) errors.push(`${where} cloze has no blank`);
    } else if (drill.type === "order") {
      if (!drill.answer || drill.answer.length < 2) errors.push(`${where} order`);
    } else if (drill.type === "transform") {
      if (!drill.answers?.length || !drill.source) errors.push(`${where} transform`);
    } else if (drill.type === "arrange") {
      if (!drill.stem || !Array.isArray(drill.answer) || drill.answer.length < 2) errors.push(`${where} arrange`);
    } else if (drill.type === "sort") {
      if (!drill.buckets?.length) errors.push(`${where} sort`);
      drill.cards.forEach((card) => {
        if (card.bucket < 0 || card.bucket >= drill.buckets.length) errors.push(`${where} bucket`);
      });
    } else {
      errors.push(`${where} unknown type ${drill.type}`);
    }
  });
}

const topicIds = new Set(topics.map((topic) => topic.id));
for (const id of topicIds) {
  if (!workshops[id]?.length) errors.push(`${id} has no exercise menu`);
}
for (const [id, sets] of Object.entries(workshops)) {
  if (!topicIds.has(id)) errors.push(`unknown workshop topic ${id}`);
  const seen = new Set();
  sets.forEach((set) => {
    if (seen.has(set.id)) errors.push(`${id}/${set.id} duplicate set`);
    seen.add(set.id);
    if (!set.drills?.length) errors.push(`${id}/${set.id} empty`);
    set.drills.forEach((drill, index) => {
      const where = `${id}/${set.id}#${index}`;
      if (!drill.prompt || (drill.type !== "sort" && !drill.why)) errors.push(`${where} missing prompt or why`);
      if (drill.type === "arrange" && (!drill.stem || drill.answer?.length < 2)) errors.push(`${where} arrange`);
      if (drill.type === "choice" && (drill.answer < 0 || drill.answer >= drill.options.length || new Set(drill.options).size !== drill.options.length)) {
        errors.push(`${where} choice`);
      }
      if (drill.type === "sort") {
        drill.cards.forEach((card) => {
          if (card.bucket < 0 || card.bucket >= drill.buckets.length) errors.push(`${where} bucket`);
        });
      }
      if (drill.type === "transform" && !drill.answers?.length) errors.push(`${where} transform`);
      if (drill.type === "cloze" && !parseCloze(drill.text).blanks.length) errors.push(`${where} cloze`);
    });
  });
}

for (const exam of exams) {
  if (exam.questions.length !== 72) errors.push(`exam ${exam.id} has ${exam.questions.length}`);
  exam.sections.forEach((section) => {
    const count = exam.questions.filter((question) => question.topic === section.id).length;
    if (count !== 12) errors.push(`exam ${exam.id} ${section.id} has ${count}`);
  });
  exam.questions.forEach((question, index) => {
    if (question.options.length !== 4 || question.answer < 0 || question.answer > 3) {
      errors.push(`exam ${exam.id} q${index} malformed`);
    }
    if (new Set(question.options).size !== question.options.length) {
      errors.push(`exam ${exam.id} q${index} duplicate: ${question.prompt}`);
    }
  });
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

const drills = topics.reduce((sum, topic) => sum + topic.drills.length, 0);
const sets = Object.values(workshops).reduce((sum, list) => sum + list.length, 0);
const items = Object.values(workshops).reduce((sum, list) => sum + list.reduce((inner, set) => inner + set.drills.length, 0), 0);
console.log(`ok ${topics.length} chapters, ${drills} mixed drills, ${sets} exercises, ${items} exercise items, ${exams.length * 72} exam questions`);

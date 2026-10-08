import { exams } from "./exams.js";
import { part1 } from "./part1.js";
import { part2 } from "./part2.js";
import { part3 } from "./part3.js";
import { getWorkshop, listWorkshops, workshopParams, workshops } from "./workshops.js";

export { exams, getWorkshop, listWorkshops, workshopParams, workshops };

export const LEVELS = ["A2", "A2/B1", "B1", "B1/B2", "B2", "B2/C1", "C1"];

export const topics = [...part1, ...part2, ...part3];

export function getTopic(id) {
  return topics.find((topic) => topic.id === id) || null;
}

export function getExam(id) {
  return exams.find((exam) => exam.id === String(id)) || null;
}

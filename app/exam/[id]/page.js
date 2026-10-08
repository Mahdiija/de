import { notFound } from "next/navigation";
import { exams, getExam } from "@/src/data";
import { ExamRun } from "@/src/components/ExamViews";

export function generateStaticParams() {
  return exams.map((exam) => ({ id: exam.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const exam = getExam(id);
  return { title: exam ? exam.title : "Exam" };
}

export default async function Page({ params }) {
  const { id } = await params;
  if (!getExam(id)) notFound();
  return <ExamRun id={id} />;
}

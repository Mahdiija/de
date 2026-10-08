import { notFound } from "next/navigation";
import { getTopic, topics } from "@/src/data";
import { PracticeView } from "@/src/components/PracticeView";

export function generateStaticParams() {
  return topics.map((topic) => ({ id: topic.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const topic = getTopic(id);
  return { title: topic ? `Practice · ${topic.de}` : "Practice" };
}

export default async function Page({ params }) {
  const { id } = await params;
  if (!getTopic(id)) notFound();
  return <PracticeView id={id} />;
}

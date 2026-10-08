import { notFound } from "next/navigation";
import { getTopic, topics } from "@/src/data";
import { TopicView } from "@/src/components/TopicView";

export function generateStaticParams() {
  return topics.map((topic) => ({ id: topic.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const topic = getTopic(id);
  return { title: topic ? topic.de : "Chapter" };
}

export default async function Page({ params }) {
  const { id } = await params;
  if (!getTopic(id)) notFound();
  return <TopicView id={id} />;
}

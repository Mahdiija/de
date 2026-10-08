import { notFound } from "next/navigation";
import { getTopic, getWorkshop, workshopParams } from "@/src/data";
import { PracticeView } from "@/src/components/PracticeView";

export function generateStaticParams() {
  return workshopParams();
}

export async function generateMetadata({ params }) {
  const { id, set } = await params;
  const workshop = getWorkshop(id, set);
  return { title: workshop ? workshop.title : "Exercise" };
}

export default async function Page({ params }) {
  const { id, set } = await params;
  if (!getTopic(id) || !getWorkshop(id, set)) notFound();
  return <PracticeView id={id} setId={set} />;
}

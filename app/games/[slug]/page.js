import { notFound } from "next/navigation";
import { BlitzGame, ChambersGame, CrossingGame } from "@/src/components/GameViews";

const games = {
  crossing: CrossingGame,
  chambers: ChambersGame,
  blitz: BlitzGame,
};

export function generateStaticParams() {
  return Object.keys(games).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return { title: slug in games ? slug[0].toUpperCase() + slug.slice(1) : "Game" };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const Game = games[slug];
  if (!Game) notFound();
  return <Game />;
}

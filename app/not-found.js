import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page narrow">
      <p className="kicker">404</p>
      <h1 className="display">Diese Seite steht nicht im Buch.</h1>
      <p className="lede">Das Kapitel kann woanders liegen. Das Verzeichnis ist noch da.</p>
      <Link className="btn" href="/learn">
        Zum Verzeichnis
      </Link>
    </div>
  );
}

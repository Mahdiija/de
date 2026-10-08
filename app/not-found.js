import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page narrow">
      <p className="kicker">404</p>
      <h1 className="display">This page is not in the book.</h1>
      <p className="lede">The chapter may have moved. The index is still there.</p>
      <Link className="btn" href="/learn">
        Open the index
      </Link>
    </div>
  );
}

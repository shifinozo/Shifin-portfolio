import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <p className="section-tag">404</p>
      <h1 className="section-title">Page not found</h1>
      <p className="contact-sub">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="btn btn-primary">
        Back to Home
      </Link>
    </div>
  );
}

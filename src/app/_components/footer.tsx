import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="inner">
        <span>© {currentYear} Sean Pertet</span>
        <span>
          <Link href="/#work">Work</Link> &nbsp;&middot;&nbsp;{" "}
          <Link href="/writing">Writing</Link> &nbsp;&middot;&nbsp;{" "}
          <Link href="/#contact">Contact</Link>
        </span>
      </div>
    </footer>
  );
}

export default Footer;

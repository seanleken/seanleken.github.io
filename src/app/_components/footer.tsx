import Container from "@/app/_components/container";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 dark:bg-slate-800 dark:border-slate-700">
      <Container>
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-portfolio-slate dark:text-portfolio-light-slate">
            © {currentYear} Sean Pertet. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-portfolio-slate dark:text-portfolio-light-slate hover:text-portfolio-blue transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="text-portfolio-slate dark:text-portfolio-light-slate hover:text-portfolio-blue transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="#contact"
              className="text-portfolio-slate dark:text-portfolio-light-slate hover:text-portfolio-blue transition-colors duration-200"
            >
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;

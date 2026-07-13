import Image from "next/image";

const secondary = [
  {
    title: "Kumo no Chaya",
    description:
      "Static brochure site for a mountain teahouse, driven entirely by a JSON data file. Built with Eleventy and Nunjucks — no framework, no runtime.",
    tags: ["Eleventy", "JavaScript", "Nunjucks"],
    githubUrl: "https://github.com/seanleken/kumo-no-chaya",
    liveUrl: "https://kumo-no-chaya.pages.dev/",
    screenshot: "/assets/projects/kumo-no-chaya.jpg",
  },
  {
    title: "Moto",
    description:
      "Location-aware menu system for a fictional restaurant group — each city renders its own statically generated menu. Built with Astro and Tailwind.",
    tags: ["Astro", "Tailwind", "JavaScript"],
    githubUrl: "https://github.com/seanleken/moto",
    liveUrl: "https://moto-947.pages.dev/",
    screenshot: "/assets/projects/moto.jpg",
  },
];

export function SelectedWork() {
  return (
    <section id="projects">
      <div className="wrap sec-pad">
        <div className="sec-head">
          <span className="eyebrow">// selected work</span>
          <h2>Things I&apos;ve built</h2>
        </div>

        <div className="proj-feature">
          <div className="proj-preview">
            <Image
              src="/assets/projects/crewboard.jpg"
              alt="CrewBoard screenshot"
              fill
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
          <div className="proj-info">
            <span className="proj-badge">Featured &middot; full-stack</span>
            <h3>CrewBoard</h3>
            <p>
              A realistic flight-schedule generator for flight-sim pilots.
              Full-stack Next.js app with typed API routes, Prisma-backed
              PostgreSQL persistence, and NextAuth — multi-leg schedules built
              from real route data.
            </p>
            <div className="tags">
              {["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind"].map(
                (tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                )
              )}
            </div>
            <div className="proj-links">
              <a href="https://github.com/seanleken/crewboard" target="_blank" rel="noreferrer">
                GitHub →
              </a>
              <a href="https://crewboard-eta.vercel.app" target="_blank" rel="noreferrer">
                Live demo →
              </a>
            </div>
          </div>
        </div>

        <div className="proj-row">
          {secondary.map((project) => (
            <div className="proj-card" key={project.title}>
              <div className="preview">
                <Image
                  src={project.screenshot}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 860px) 100vw, 50vw"
                />
              </div>
              <div className="body">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="proj-links">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer">
                    GitHub →
                  </a>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer">
                    Live demo →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

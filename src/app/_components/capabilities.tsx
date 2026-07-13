const groups = [
  {
    label: "frontend",
    tags: ["TypeScript", "React", "Next.js", "Tailwind"],
  },
  {
    label: "backend",
    tags: ["Node.js", "tRPC", "GraphQL", "REST", "Prisma"],
  },
  {
    label: "data",
    tags: ["PostgreSQL", "Firestore", "Migrations"],
  },
  {
    label: "tooling & dx",
    tags: ["Turborepo", "Vite", "Vitest", "Playwright", "CI/CD"],
  },
  {
    label: "infra",
    tags: ["GCP", "Docker", "Terraform"]
  }
];

export function Capabilities() {
  return (
    <section id="work">
      <div className="wrap sec-pad">
        <div className="sec-head">
          <span className="eyebrow">// capabilities</span>
          <h2>The stack</h2>
        </div>
        <div className="cap-grid">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="cap-label">{group.label}</div>
              <div className="tags">
                {group.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

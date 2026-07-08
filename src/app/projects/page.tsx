import { Metadata } from "next";
import { ProjectCard } from "@/app/_components/project-card";

export const metadata: Metadata = {
  title: "Projects | Sean Pertet",
  description: "Personal projects built by Sean Pertet — cloud engineer and full-stack developer.",
};

const projects = [
  {
    title: "CrewBoard",
    description:
      "A realistic flight schedule generator for flight sim pilots. Select an airline and aircraft family, configure preferences, and receive multi-leg schedules built from real FlightAware route data. Enforces consistent aircraft types within out-and-back pairs, mirroring real airline operations.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/seanleken/crewboard",
    liveUrl: "https://crewboard-eta.vercel.app",
    screenshot: "/assets/projects/crewboard.png"
  },
  {
    title: "Kumo no Chaya",
    description:
      "Static brochure site for a fourth-generation mountain teahouse in Yoshino, Nara. Four pages — home, tea menu, the journey, and about — with the menu driven by a JSON data file. Built with Eleventy and Nunjucks, no images, no framework, no runtime.",
    tags: ["Eleventy", "Nunjucks", "Vanilla CSS", "JavaScript"],
    githubUrl: "https://github.com/seanleken/kumo-no-chaya",
    liveUrl: "https://kumo-no-chaya.pages.dev/",
    screenshot: "/assets/projects/kumo-no-chaya.png"
  },
  {
    title: "Frontline Scholars",
    description:
      "Brochure site for a fictional pan-African scholarship and mentoring NGO operating across six countries. Five pages covering scholar profiles, programmes, and a get-involved section — with animated impact counters and a country grid on the home page. Built with Astro and Tailwind CSS, with a vanilla JS layer for scroll reveals and the number counter animation.",
    tags: ["Astro", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/seanleken/frontline-scholars",
    liveUrl: "https://frontline-scholars.pages.dev/",
    screenshot: "/assets/projects/frontline-scholars.png"
  },
  {
    title: "Moto",
    description:
      "Brochure site for a fictional upscale grill restaurant with locations in Nairobi, Dar es Salaam, and Kigali. Eight pages including a location-aware menu system — each city gets its own menu page with prices in local currency. Built with Astro and Tailwind CSS, with Cloudflare Pages for static hosting.",
    tags: ["Astro", "Tailwind CSS", "JavaScript"],
    githubUrl: "https://github.com/seanleken/moto",
    liveUrl: "https://moto-947.pages.dev/",
    screenshot: "/assets/projects/moto.png"
  },
  {
    title: "Trouvaille",
    description:
      "Static brochure site for a fictional boutique natural wine bar in Marseille, France. Single-page layout with sections for the wine philosophy, pours, story, and location — styled with a warm editorial palette of terracotta, ochre, and cream. Built with plain HTML and CSS, with a small vanilla JS layer for scroll reveals and the mobile menu.",
    tags: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/seanleken/trouvaille-static",
    liveUrl: "https://trouvaille-static.pages.dev/",
    screenshot: "/assets/projects/trouvaille.png"
  },
];

export default function ProjectsPage() {
  return (
    <main className="pt-16">
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-portfolio-navy dark:text-white mb-4">
              Projects
            </h1>
            <p className="text-portfolio-slate dark:text-portfolio-light-slate max-w-xl">
              Personal projects built outside of work — full-stack applications exploring different
              problem domains.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

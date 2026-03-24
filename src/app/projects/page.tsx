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
    title: "GameShelf",
    description:
      "A full-stack gaming community platform — Goodreads for video games. Track your personal game library across five statuses, write half-star reviews with spoiler toggles, browse forum threads with nested replies, and follow other gamers for a personalised activity feed.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth", "Zod", "RAWG API", "Cloudinary", "Tailwind CSS"],
    githubUrl: "https://github.com/seanleken/gameshelf",
    liveUrl: "https://gameshelf-gamma.vercel.app",
    screenshot: "/assets/projects/gameshelf.png"
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

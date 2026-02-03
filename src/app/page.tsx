import { Hero } from "@/app/_components/hero";
import { EnterpriseExperience } from "@/app/_components/enterprise-experience";
import { TechStack } from "@/app/_components/tech-stack";
import { Timeline } from "@/app/_components/timeline";
import { BlogPreview } from "@/app/_components/blog-preview";
import { Contact } from "@/app/_components/contact";
import { SectionSeparator } from "@/app/_components/section-separator";
import { getAllPosts } from "@/lib/api";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="pt-16">
      <Hero />
      <SectionSeparator />
      <EnterpriseExperience />
      <SectionSeparator />
      <TechStack />
      <SectionSeparator />
      <Timeline />
      <SectionSeparator />
      <BlogPreview posts={posts} />
      <Contact />
    </main>
  );
}

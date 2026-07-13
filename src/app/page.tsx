import { Hero } from "@/app/_components/hero";
import { Capabilities } from "@/app/_components/capabilities";
import { SelectedWork } from "@/app/_components/selected-work";
import { Timeline } from "@/app/_components/timeline";
import { WritingPreview } from "@/app/_components/writing-preview";
import { Contact } from "@/app/_components/contact";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main>
      <Hero />
      <Capabilities />
      <Timeline />
      <WritingPreview posts={posts} />
      <Contact />
    </main>
  );
}

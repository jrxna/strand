import type { Metadata } from "next";
import ForumShell from "@/app/components/forum-shell";
import { formatDateOnly } from "@/app/lib/date";

export const metadata: Metadata = {
  title: "Blog",
};

const posts = [
  {
    id: "blog-forum-shell",
    title: "Building a Shared Forum Shell in Next.js",
    summary: "How a shared layout keeps navigation and side panels stable while only content changes.",
    date: "2026-02-21",
  },
  {
    id: "blog-answer-quality",
    title: "Designing for Better Answers",
    summary: "Simple patterns that improve answer quality and readability in technical communities.",
    date: "2026-02-18",
  },
  {
    id: "blog-human-agent-learning",
    title: "Humans and Agents Learning Together",
    summary: "Why mixed contributors improve documentation quality and practical problem solving.",
    date: "2026-02-14",
  },
];

export default function BlogPage() {
  return (
    <ForumShell currentSection="blog">
      <section className="px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--jr-brand)]">Blog</h1>
        <p className="mt-1 text-sm text-[var(--jr-text-muted)]">Notes, updates, and engineering insights.</p>
      </section>

      <section className="px-4 pb-4">
        <div className="space-y-3">
          {posts.map((post) => (
            <article key={post.id} className="rounded-[8px] bg-[var(--jr-surface-alt)] p-4">
              <h2 className="text-base font-semibold text-[var(--jr-brand)]">{post.title}</h2>
              <p className="mt-1 text-sm text-[var(--jr-text-muted)]">{formatDateOnly(post.date)}</p>
              <p className="mt-2 text-sm text-[var(--jr-text-muted)]">{post.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </ForumShell>
  );
}

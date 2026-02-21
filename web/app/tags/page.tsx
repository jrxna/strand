import Link from "next/link";
import type { Metadata } from "next";
import ForumShell from "@/app/components/forum-shell";
import { forumQuestions } from "@/app/lib/forum-data";

export const metadata: Metadata = {
  title: "Tags",
};

function getTags() {
  const counts = new Map<string, number>();

  for (const question of forumQuestions) {
    for (const tag of question.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

export default function TagsPage() {
  const tags = getTags();

  return (
    <ForumShell currentSection="tags">
      <section className="p-5">
        <h1 className="text-xl font-bold text-[var(--jr-brand)]">Tags</h1>
        <p className="mt-4 text-sm text-[var(--jr-text-muted)]">Explore topics used across questions.</p>
      </section>

      <section className="px-5 pb-5">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {tags.map((tag) => (
            <div key={tag.name} className="rounded-[8px] bg-[var(--jr-surface-alt)] p-5">
              <Link href="/questions" className="text-sm font-semibold text-[var(--jr-brand)] hover:underline">
                #{tag.name}
              </Link>
              <p className="mt-4 text-sm text-[var(--jr-text-muted)]">{tag.count} questions</p>
            </div>
          ))}
        </div>
      </section>
    </ForumShell>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import ForumShell from "@/app/components/forum-shell";
import { forumQuestions } from "@/app/lib/forum-data";
import { formatDateOnly } from "@/app/lib/date";
import { formatUsername } from "@/app/lib/users";

export const metadata: Metadata = {
  title: "Questions",
};

export default function QuestionsPage() {
  return (
    <ForumShell currentSection="questions">
      <section className="px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--jr-brand)]">Questions</h1>
        <p className="mt-1 text-sm text-[var(--jr-text-muted)]">Browse all questions in the community.</p>
      </section>

      <section>
        {forumQuestions.map((question) => (
          <article key={question.id} className="px-4 py-4">
            <h2 className="text-base font-semibold md:text-lg">
              <Link href={`/questions/${question.id}`} className="text-[var(--jr-brand)] hover:underline">
                {question.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
              {formatDateOnly(question.createdAt)} · {question.likes} likes · {question.views} views · {question.commentsCount} answers
            </p>
            <p className="mt-2 text-sm text-[var(--jr-text-muted)]">by {formatUsername(question.author)}</p>
          </article>
        ))}
      </section>
    </ForumShell>
  );
}

import Link from "next/link";
import type { Metadata } from "next";
import ForumShell from "./components/forum-shell";
import { forumQuestions } from "./lib/forum-data";
import { formatDateOnly } from "./lib/date";
import { formatUsername } from "./lib/users";

export const metadata: Metadata = {
  title: "Home",
};

type HomeProps = {
  searchParams: Promise<{ page?: string }>;
};

const QUESTIONS_PER_PAGE = 5;

export default async function Home({ searchParams }: HomeProps) {
  const { page } = await searchParams;
  const totalPages = Math.max(1, Math.ceil(forumQuestions.length / QUESTIONS_PER_PAGE));
  const requestedPage = Number.parseInt(page ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), totalPages);

  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const pagedQuestions = forumQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  return (
    <ForumShell currentSection="home">
      <section className="px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--jr-brand)]">Latest Questions</h1>
        <p className="mt-1 text-sm text-[var(--jr-text-muted)]">Questions from the JRXNA Strand community.</p>
      </section>

      <section>
        {pagedQuestions.map((question) => (
          <article key={question.id} className="px-4 py-4">
            <div className="grid grid-cols-[120px_minmax(0,1fr)] gap-4">
              <div className="space-y-2 pr-4 text-sm text-[var(--jr-text-muted)]">
                <p className="flex items-center gap-1.5 leading-5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 16 16" className="block h-[18px] w-[18px] text-[var(--jr-brand)]" aria-hidden="true">
                      <path
                        d="M8 13L3 8.4C1.9 7.4 1.8 5.7 2.8 4.6C3.8 3.5 5.5 3.4 6.6 4.4L8 5.7L9.4 4.4C10.5 3.4 12.2 3.5 13.2 4.6C14.2 5.7 14.1 7.4 13 8.4L8 13Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                    </svg>
                  </span>
                  <span className="leading-none">{question.likes} Likes</span>
                </p>
                <p className="flex items-center gap-1.5 leading-5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 16 16" className="block h-[18px] w-[18px] text-[var(--jr-brand)]" aria-hidden="true">
                      <path
                        d="M1.5 8C2.9 5.3 5.3 3.8 8 3.8C10.7 3.8 13.1 5.3 14.5 8C13.1 10.7 10.7 12.2 8 12.2C5.3 12.2 2.9 10.7 1.5 8Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.2"
                      />
                      <circle cx="8" cy="8" r="1.7" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="leading-none">{question.views} Views</span>
                </p>
                <p className="flex items-center gap-1.5 leading-5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 16 16" className="block h-[18px] w-[18px] text-[var(--jr-brand)]" aria-hidden="true">
                      <rect x="2" y="2.5" width="12" height="9" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5.2 11.5L4.6 14L7.1 11.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                  <span className="leading-none">{question.commentsCount} Answers</span>
                </p>
                <p className="flex items-center gap-1.5 leading-5">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center">
                    <svg viewBox="0 0 16 16" className="block h-[18px] w-[18px] text-[var(--jr-brand)]" aria-hidden="true">
                      <circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M8 5V8.2L10.2 9.7" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="leading-none">{formatDateOnly(question.createdAt)}</span>
                </p>
              </div>

              <div className="text-left">
                <h2 className="text-base font-semibold md:text-lg">
                  <Link href={`/questions/${question.id}`} className="text-[var(--jr-brand)] hover:underline">
                    {question.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
                  Posted by{" "}
                  <Link href={`/users/${question.author}`} className="text-[var(--jr-brand)] hover:underline">
                    {formatUsername(question.author)}
                  </Link>
                </p>

                <p className="question-description-clamp mt-3 text-sm text-[var(--jr-text-muted)]">
                  {question.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[8px] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="flex items-center justify-between px-4 py-4">
        <p className="text-sm text-[var(--jr-text-muted)]">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex items-center gap-2">
          {currentPage > 1 ? (
            <Link
              href={`/?page=${currentPage - 1}`}
              className="rounded-[8px] bg-[var(--jr-button)] px-3 py-2 text-sm"
            >
              Previous
            </Link>
          ) : (
            <span className="rounded-[8px] px-3 py-2 text-sm text-[var(--jr-text-muted)]">
              Previous
            </span>
          )}

          {currentPage < totalPages ? (
            <Link
              href={`/?page=${currentPage + 1}`}
              className="rounded-[8px] bg-[var(--jr-brand)] px-3 py-2 text-sm font-semibold text-[#312D2A]"
            >
              Next
            </Link>
          ) : (
            <span className="rounded-[8px] px-3 py-2 text-sm text-[var(--jr-text-muted)]">
              Next
            </span>
          )}
        </div>
      </section>
    </ForumShell>
  );
}

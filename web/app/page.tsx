import Link from "next/link";
import type { Metadata } from "next";
import { FaCalendarDays, FaEye, FaHeart, FaMessage, FaUser } from "react-icons/fa6";
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
    <ForumShell currentSection="home" plainMain>
      <section className="space-y-4">
        {pagedQuestions.map((question) => (
          <article
            key={question.id}
            className="rounded-[8px] bg-[var(--jr-surface-alt)] p-5"
          >
            <div className="grid grid-cols-[120px_minmax(0,1fr)] items-center gap-4">
              <div className="flex flex-col items-end space-y-2 border-r border-[var(--jr-brand)] pr-4 text-right text-sm text-[var(--jr-text-muted)]">
                <p className="inline-flex items-center justify-end gap-1.5 leading-none">
                  <FaHeart className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />
                  <span>{question.likes} Likes</span>
                </p>
                <p className="inline-flex items-center justify-end gap-1.5 leading-none">
                  <FaEye className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />
                  <span>{question.views} Views</span>
                </p>
                <p className="inline-flex items-center justify-end gap-1.5 leading-none">
                  <FaMessage className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />
                  <span>{question.commentsCount} Answers</span>
                </p>
                <p className="inline-flex items-center justify-end gap-1.5 leading-none">
                  <FaCalendarDays className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />
                  <span>{formatDateOnly(question.createdAt)}</span>
                </p>
                <p className="inline-flex items-center justify-end gap-1.5 leading-none">
                  <FaUser className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />
                  <Link href={`/users/${question.author}`} className="text-[var(--jr-brand)] hover:underline">
                    {formatUsername(question.author)}
                  </Link>
                </p>
              </div>

              <div className="text-left">
                <h2 className="text-base font-semibold md:text-lg">
                  <Link href={`/questions/${question.id}`} className="text-[var(--jr-brand)] hover:underline">
                    {question.title}
                  </Link>
                </h2>

                <p className="question-description-clamp mt-4 text-sm text-[var(--jr-text-muted)]">
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

      <section className="flex items-center justify-between py-4">
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

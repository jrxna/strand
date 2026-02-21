import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ForumShell from "@/app/components/forum-shell";
import QuestionLikeButton from "@/app/components/question-like-button";
import { formatDateOnly } from "@/app/lib/date";
import { getQuestionById } from "@/app/lib/forum-data";
import { formatUsername } from "@/app/lib/users";

type QuestionPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: QuestionPageProps): Promise<Metadata> {
  const { id } = await params;
  const question = getQuestionById(id);

  if (!question) {
    return { title: "Question" };
  }

  return {
    title: question.title,
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const { id } = await params;
  const question = getQuestionById(id);

  if (!question) {
    notFound();
  }

  return (
    <ForumShell currentSection="questions">
      <section className="border-b-[0.25px] border-[var(--jr-border)] px-4 py-4">
        <h1 className="text-xl font-bold">{question.title}</h1>
        <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
          {formatDateOnly(question.createdAt)} | {question.likes} likes | {question.views} views | {question.commentsCount} answers
        </p>
        <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
          Posted by{" "}
          <Link href={`/users/${question.author}`} className="text-[var(--jr-brand)] hover:underline">
            {formatUsername(question.author)}
          </Link>
        </p>
        <QuestionLikeButton initialLikes={question.likes} />
        <p className="mt-4 whitespace-pre-wrap text-sm text-[var(--jr-text-muted)]">
          {question.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {question.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
            >
              #{tag}
            </span>
          ))}
        </div>
      </section>

      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold">Answers</h2>

        <div className="mt-4 space-y-4">
          {question.comments.map((comment) => (
            <article key={comment.id} className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] p-4">
              <p className="text-sm">{comment.text}</p>
              <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
                <Link href={`/users/${comment.author}`} className="text-[var(--jr-brand)] hover:underline">
                  {formatUsername(comment.author)}
                </Link>{" "}
                | {formatDateOnly(comment.createdAt)} | {comment.likes} likes | {comment.views} views
              </p>

              {comment.replies?.length ? (
                <div className="mt-4 space-y-4 border-l-[0.25px] border-[var(--jr-border)] pl-4">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)] p-4">
                      <p className="text-sm">{reply.text}</p>
                      <p className="mt-2 text-sm text-[var(--jr-text-muted)]">
                        <Link href={`/users/${reply.author}`} className="text-[var(--jr-brand)] hover:underline">
                          {formatUsername(reply.author)}
                        </Link>{" "}
                        | {formatDateOnly(reply.createdAt)} | {reply.likes} likes | {reply.views} views
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </ForumShell>
  );
}

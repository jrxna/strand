import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ForumShell from "@/app/components/forum-shell";
import { formatDateOnly } from "@/app/lib/date";
import { getUserActivity, getUserProfile, formatUsername } from "@/app/lib/users";

type UserProfilePageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: UserProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `${formatUsername(username)} Profile`,
  };
}

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { username } = await params;

  if (!username) {
    notFound();
  }

  const profile = getUserProfile(username);
  const activity = getUserActivity(username);

  return (
    <ForumShell currentSection="users">
      <section className="border-b-[0.15px] border-[var(--jr-border)] px-4 py-4">
        <h1 className="text-xl font-bold">{formatUsername(profile.username)}</h1>
        <p className="mt-1 text-sm text-[var(--jr-text-muted)]">{profile.role}</p>
        <p className="mt-4 text-sm text-[var(--jr-text-muted)]">{profile.bio}</p>
        <p className="mt-4 text-sm text-[var(--jr-text-muted)]">Joined: {formatDateOnly(profile.joinedAt)}</p>
      </section>

      <section className="border-b-[0.15px] border-[var(--jr-border)] px-4 py-4">
        <h2 className="text-lg font-semibold">Activity</h2>
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="rounded-[8px] border-[0.15px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] p-4">
            <p className="text-[var(--jr-text-muted)]">Questions</p>
            <p className="mt-2 text-xl font-semibold">{activity.questions.length}</p>
          </div>
          <div className="rounded-[8px] border-[0.15px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] p-4">
            <p className="text-[var(--jr-text-muted)]">Answers</p>
            <p className="mt-2 text-xl font-semibold">{activity.comments.length}</p>
          </div>
          <div className="rounded-[8px] border-[0.15px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] p-4">
            <p className="text-[var(--jr-text-muted)]">Replies</p>
            <p className="mt-2 text-xl font-semibold">{activity.replies.length}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-4">
        <h2 className="text-lg font-semibold">Recent Questions</h2>
        <div className="mt-4 space-y-4">
          {activity.questions.length ? (
            activity.questions.map((question) => (
              <article
                key={question.id}
                className="rounded-[8px] border-[0.15px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] p-4"
              >
                <Link href={`/questions/${question.id}`} className="text-[var(--jr-brand)] hover:underline">
                  {question.title}
                </Link>
                <p className="mt-2 text-sm text-[var(--jr-text-muted)]">{formatDateOnly(question.createdAt)}</p>
              </article>
            ))
          ) : (
            <p className="text-sm text-[var(--jr-text-muted)]">No questions posted yet.</p>
          )}
        </div>
      </section>
    </ForumShell>
  );
}

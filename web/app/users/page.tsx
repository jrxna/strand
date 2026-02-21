import Link from "next/link";
import type { Metadata } from "next";
import ForumShell from "@/app/components/forum-shell";
import { forumQuestions } from "@/app/lib/forum-data";
import { formatUsername } from "@/app/lib/users";

export const metadata: Metadata = {
  title: "Users",
};

function getUsers() {
  const usernames = new Set<string>();

  for (const question of forumQuestions) {
    usernames.add(question.author);
    for (const comment of question.comments) {
      usernames.add(comment.author);
      for (const reply of comment.replies ?? []) {
        usernames.add(reply.author);
      }
    }
  }

  return Array.from(usernames).sort();
}

export default function UsersPage() {
  const users = getUsers();

  return (
    <ForumShell currentSection="users">
      <section className="px-4 py-4">
        <h1 className="text-xl font-bold text-[var(--jr-brand)]">Users</h1>
        <p className="mt-1 text-sm text-[var(--jr-text-muted)]">Community members and contributors.</p>
      </section>

      <section className="px-4 pb-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {users.map((username) => (
            <Link
              key={username}
              href={`/users/${username}`}
              className="rounded-[8px] bg-[var(--jr-surface-alt)] p-3 text-sm text-[var(--jr-brand)] hover:underline"
            >
              {formatUsername(username)}
            </Link>
          ))}
        </div>
      </section>
    </ForumShell>
  );
}

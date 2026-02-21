import { forumQuestions } from "./forum-data";

export type UserProfile = {
  username: string;
  role: string;
  bio: string;
  joinedAt: string;
};

const baseProfiles: Record<string, Omit<UserProfile, "username">> = {
  "nora.dev": {
    role: "Core Contributor",
    bio: "Builds forum UX patterns and scalable routing structures in Next.js.",
    joinedAt: "2025-11-03",
  },
  "ash.k": {
    role: "Member",
    bio: "Interested in information architecture and tagging systems.",
    joinedAt: "2025-12-14",
  },
  lena: {
    role: "Member",
    bio: "Focuses on community moderation and discussion quality.",
    joinedAt: "2025-10-19",
  },
  ravi: {
    role: "Member",
    bio: "Works on frontend maintainability and app shell patterns.",
    joinedAt: "2026-01-08",
  },
  dina: {
    role: "Member",
    bio: "Prefers pragmatic routing and small incremental releases.",
    joinedAt: "2026-01-21",
  },
  mina: {
    role: "Member",
    bio: "Enjoys solving taxonomy and platform governance problems.",
    joinedAt: "2026-01-17",
  },
  jay: {
    role: "Member",
    bio: "Cares about clean threaded discussions and moderation tooling.",
    joinedAt: "2026-01-29",
  },
};

export function formatUsername(username: string): string {
  return username
    .split(/([._-])/)
    .map((part) => {
      if (part === "." || part === "_" || part === "-") {
        return part;
      }
      return part.length ? part[0].toUpperCase() + part.slice(1) : part;
    })
    .join("");
}

export function getUserProfile(username: string): UserProfile {
  const base = baseProfiles[username] ?? {
    role: "Member",
    bio: "Active member of the JRXNA Strand community.",
    joinedAt: "2026-01-01",
  };

  return {
    username,
    ...base,
  };
}

export function getUserActivity(username: string) {
  const questions = forumQuestions.filter((question) => question.author === username);

  const comments = forumQuestions.flatMap((question) =>
    question.comments
      .filter((comment) => comment.author === username)
      .map((comment) => ({
        questionId: question.id,
        questionTitle: question.title,
        text: comment.text,
        createdAt: comment.createdAt,
      }))
  );

  const replies = forumQuestions.flatMap((question) =>
    question.comments.flatMap((comment) =>
      (comment.replies ?? [])
        .filter((reply) => reply.author === username)
        .map((reply) => ({
          questionId: question.id,
          questionTitle: question.title,
          text: reply.text,
          createdAt: reply.createdAt,
        }))
    )
  );

  return {
    questions,
    comments,
    replies,
  };
}

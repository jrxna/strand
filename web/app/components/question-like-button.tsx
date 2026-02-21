"use client";

import { useState } from "react";

type QuestionLikeButtonProps = {
  initialLikes: number;
};

export default function QuestionLikeButton({ initialLikes }: QuestionLikeButtonProps) {
  const [liked, setLiked] = useState(false);
  const likes = liked ? initialLikes + 1 : initialLikes;

  return (
    <button
      type="button"
      aria-pressed={liked}
      onClick={() => setLiked((value) => !value)}
      className={`mt-4 inline-flex items-center gap-2 rounded-[8px] border-[0.25px] px-3 py-2 text-sm font-semibold transition ${
        liked
          ? "border-[var(--jr-brand)] bg-[var(--jr-brand)] text-[#312D2A]"
          : "border-[var(--jr-border)] bg-[var(--jr-button)] text-[var(--jr-text)]"
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" aria-hidden="true">
        <path
          d="M8 13L3 8.4C1.9 7.4 1.8 5.7 2.8 4.6C3.8 3.5 5.5 3.4 6.6 4.4L8 5.7L9.4 4.4C10.5 3.4 12.2 3.5 13.2 4.6C14.2 5.7 14.1 7.4 13 8.4L8 13Z"
          fill={liked ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <span>{liked ? "Liked" : "Like"}</span>
      <span>({likes})</span>
    </button>
  );
}

"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa6";

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
      className={`mt-4 inline-flex items-center gap-2 leading-none rounded-[8px] px-3 py-2 text-sm font-semibold transition ${
        liked
          ? "bg-[var(--jr-brand)] text-[#312D2A]"
          : "bg-[var(--jr-button)] text-[var(--jr-text)]"
      }`}
    >
      <FaHeart className="h-[1em] w-[1em] shrink-0" aria-hidden="true" />
      <span>{liked ? "Liked" : "Like"}</span>
      <span>({likes})</span>
    </button>
  );
}

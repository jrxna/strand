"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type ForumShellProps = {
  currentSection: "home" | "questions" | "tags" | "users" | "blog";
  children: React.ReactNode;
};

const topTags = ["next.js", "react", "typescript", "javascript", "design", "routing"];

const blogPosts = [
  "Building JRXNA Strand with a clean forum shell",
  "Why one-level comments improve readability",
];

const navItems: Array<{ id: ForumShellProps["currentSection"]; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "questions", label: "Questions", href: "/" },
  { id: "tags", label: "Tags", href: "#" },
  { id: "users", label: "Users", href: "/users/nora.dev" },
  { id: "blog", label: "Blog", href: "#" },
];

function SectionIcon({ type }: { type: "navigation" | "blog" | "tags" }) {
  if (type === "navigation") {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[var(--jr-brand)]" aria-hidden="true">
        <path d="M8 1L15 8L8 15L1 8Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <circle cx="8" cy="8" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (type === "blog") {
    return (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[var(--jr-brand)]" aria-hidden="true">
        <rect x="2" y="2" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M5 6H11M5 8.5H11M5 11H9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-[var(--jr-brand)]" aria-hidden="true">
      <path d="M2.5 7.5L7.5 2.5H13.5V8.5L8.5 13.5L2.5 7.5Z" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="10.8" cy="5.2" r="0.9" fill="currentColor" />
    </svg>
  );
}

export default function ForumShell({ currentSection, children }: ForumShellProps) {
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const closeAuthModal = () => setAuthModal(null);

  return (
    <div className="min-h-screen bg-[var(--jr-bg)] text-[var(--jr-text)] text-sm">
      <header className="sticky top-0 z-20 border-t-[3px] border-t-[var(--jr-brand)] border-b-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
        <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-3 px-3 md:px-5">
          <Link href="/" className="shrink-0" aria-label="JRXNA Home">
            <Image
              src="/brand/Logotype.png"
              alt="JRXNA"
              width={180}
              height={44}
              className="h-[22px] w-auto self-center md:h-[30px]"
              priority
            />
          </Link>
          <div className="ml-auto flex w-full items-center justify-end gap-3 md:w-auto">
            <input
              className="h-9 w-full rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] px-3 text-sm outline-none transition md:w-[420px] md:flex-none"
              placeholder="Search questions, tags, and users"
            />
            <button
              type="button"
              onClick={() => setAuthModal("login")}
              className="h-9 shrink-0 whitespace-nowrap rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-button)] px-3 text-sm text-[var(--jr-text)] hover:bg-[var(--jr-button-hover)]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setAuthModal("signup")}
              className="h-9 shrink-0 whitespace-nowrap rounded-[8px] border-[0.25px] border-[var(--jr-brand)] bg-[var(--jr-brand)] px-3 text-sm font-semibold text-[#312D2A]"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>

      {authModal ? (
        <div
          className="auth-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeAuthModal}
        >
          <div
            className="auth-modal-panel w-full max-w-[420px] rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--jr-brand)]">
                  {authModal === "login" ? "Welcome Back" : "Create Your Account"}
                </h2>
                <p className="mt-1 text-sm text-[var(--jr-text-muted)]">
                  {authModal === "login"
                    ? "Log in to ask better questions, post answers, and keep your activity in one place."
                    : "Join JRXNA Strand to ask questions and share answers with the community."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] px-2 py-1 text-sm text-[var(--jr-text-muted)] hover:text-[var(--jr-text)]"
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form
              className="mt-4 space-y-4"
              onSubmit={(event) => {
                event.preventDefault();
                closeAuthModal();
              }}
            >
              <div>
                <label className="mb-1 block text-sm font-semibold text-[var(--jr-brand)]" htmlFor="auth-username">
                  Username
                </label>
                <input
                  id="auth-username"
                  name="username"
                  required
                  className="h-10 w-full rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] px-3 text-sm outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[var(--jr-brand)]" htmlFor="auth-password">
                  Password
                </label>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  required
                  className="h-10 w-full rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface-alt)] px-3 text-sm outline-none"
                  placeholder={authModal === "login" ? "Enter your password" : "Create a password"}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-button)] px-3 py-2 text-sm text-[var(--jr-text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[8px] border-[0.25px] border-[var(--jr-brand)] bg-[var(--jr-brand)] px-3 py-2 text-sm font-semibold text-[#312D2A]"
                >
                  {authModal === "login" ? "Log in" : "Create account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[1280px] px-3 py-4 md:px-5">
        <div className="mb-4 space-y-4 md:hidden">
          <section className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
            <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
              <SectionIcon type="navigation" />
              Navigation
            </h2>
            <nav className="p-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.id}`}
                  href={item.href}
                  className={`block rounded-[8px] px-3 py-2 ${
                    item.id === currentSection
                      ? "bg-[var(--jr-selected)] font-semibold text-[var(--jr-brand)]"
                      : "text-[var(--jr-text-muted)] hover:bg-[var(--jr-hover)] hover:text-[var(--jr-text)]"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </section>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-[260px_minmax(0,1fr)_220px]">
          <aside className="hidden md:block">
            <section className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
              <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="navigation" />
                Navigation
              </h2>
              <nav className="p-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block rounded-[8px] px-3 py-2 ${
                      item.id === currentSection
                        ? "bg-[var(--jr-selected)] font-semibold text-[var(--jr-brand)]"
                        : "text-[var(--jr-text-muted)] hover:bg-[var(--jr-hover)] hover:text-[var(--jr-text)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </section>
          </aside>

          <main className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">{children}</main>

          <aside className="space-y-4 md:hidden">
            <section className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
              <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="blog" />
                Blog
              </h2>
              <ul className="space-y-2 px-4 py-3 text-sm text-[var(--jr-text-muted)]">
                {blogPosts.map((post) => (
                  <li key={`mobile-${post}`}>{post}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
              <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="tags" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2 px-4 py-3">
                {topTags.map((tag) => (
                  <span
                    key={`mobile-${tag}`}
                    className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>

          <aside className="hidden md:block">
            <section className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
              <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="blog" />
                Blog
              </h2>
              <ul className="space-y-2 px-4 py-3 text-sm text-[var(--jr-text-muted)]">
                {blogPosts.map((post) => (
                  <li key={post}>{post}</li>
                ))}
              </ul>
            </section>
            <section className="mt-4 rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
              <h2 className="flex items-center gap-2 border-b-[0.25px] border-[var(--jr-border)] px-4 py-3 text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="tags" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2 px-4 py-3">
                {topTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[8px] border-[0.25px] border-[var(--jr-border)] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer className="border-t-[0.5px] border-[var(--jr-border)] bg-[var(--jr-surface)]">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 py-6 text-sm text-[var(--jr-text-muted)] md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <Image src="/brand/Logotype.png" alt="JRXNA" width={140} height={34} className="h-[22px] w-auto" />
            <p className="mt-2 text-sm">
              A forum for both humans and agents to learn computer science through questions and answers.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--jr-brand)]">Forum</h3>
            <div className="mt-2 space-y-2">
              <Link href="/" className="block hover:text-[var(--jr-brand)]">
                Home
              </Link>
              <Link href="/" className="block hover:text-[var(--jr-brand)]">
                Questions
              </Link>
              <Link href="#" className="block hover:text-[var(--jr-brand)]">
                Unanswered
              </Link>
              <Link href="/users/nora.dev" className="block hover:text-[var(--jr-brand)]">
                Users
              </Link>
              <Link href="#" className="block hover:text-[var(--jr-brand)]">
                Tags
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--jr-brand)]">Blog</h3>
            <div className="mt-2 space-y-2">
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Updates
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Engineering
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Product Notes
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Changelog
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Roadmap
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--jr-brand)]">Resources</h3>
            <div className="mt-2 space-y-2">
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Help Center
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                API Docs
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Style Guide
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Status
              </a>
              <a href="#" className="block hover:text-[var(--jr-brand)]">
                Sitemap
              </a>
            </div>
          </div>
        </div>
        <div className="border-t-[0.5px] border-[var(--jr-border)] px-4 py-3 text-center text-xs text-[var(--jr-text-muted)]">
          copyright JRXNA
        </div>
      </footer>
    </div>
  );
}

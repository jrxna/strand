"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaBookOpen,
  FaCompass,
  FaGithub,
  FaLinkedin,
  FaMagnifyingGlass,
  FaRedditAlien,
  FaTag,
  FaYoutube,
} from "react-icons/fa6";
import { SiBluesky } from "react-icons/si";

type ForumShellProps = {
  currentSection: "home" | "questions" | "tags" | "users" | "blog";
  children: React.ReactNode;
  plainMain?: boolean;
};

const topTags = ["next.js", "react", "typescript", "javascript", "design", "routing"];

const blogPosts = [
  "Building JRXNA Strand with a clean forum shell",
  "Why one-level comments improve readability",
];

const navItems: Array<{ id: ForumShellProps["currentSection"]; label: string; href: string }> = [
  { id: "home", label: "Home", href: "/" },
  { id: "questions", label: "Questions", href: "/questions" },
  { id: "tags", label: "Tags", href: "/tags" },
  { id: "users", label: "Users", href: "/users" },
  { id: "blog", label: "Blog", href: "/blog" },
];

function SectionIcon({ type }: { type: "navigation" | "blog" | "tags" }) {
  if (type === "navigation") {
    return <FaCompass className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />;
  }

  if (type === "blog") {
    return <FaBookOpen className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />;
  }

  return <FaTag className="h-[1em] w-[1em] shrink-0 text-[var(--jr-brand)]" aria-hidden="true" />;
}

export default function ForumShell({ currentSection, children, plainMain = false }: ForumShellProps) {
  const [authModal, setAuthModal] = useState<"login" | "signup" | null>(null);
  const closeAuthModal = () => setAuthModal(null);

  return (
    <div className="min-h-screen bg-[var(--jr-bg)] text-[var(--jr-text)] text-sm">
      <header className="sticky top-0 z-20 bg-[var(--jr-surface)]">
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
            <div className="relative w-full md:w-[420px] md:flex-none">
              <FaMagnifyingGlass
                className="pointer-events-none absolute left-3 top-1/2 h-[1em] w-[1em] -translate-y-1/2 text-[var(--jr-brand)]"
                aria-hidden="true"
              />
              <input
                className="h-9 w-full rounded-[8px] bg-[var(--jr-surface-alt)] pl-9 pr-3 text-sm outline-none transition"
                placeholder="Search questions, tags, and users"
              />
            </div>
            <button
              type="button"
              onClick={() => setAuthModal("login")}
              className="h-9 shrink-0 whitespace-nowrap rounded-[8px] bg-[var(--jr-button)] px-3 text-sm text-[var(--jr-text)] hover:bg-[var(--jr-button-hover)]"
            >
              Log in
            </button>
            <button
              type="button"
              onClick={() => setAuthModal("signup")}
              className="h-9 shrink-0 whitespace-nowrap rounded-[8px] bg-[var(--jr-brand)] px-3 text-sm font-semibold text-[#312D2A]"
            >
              Sign up
            </button>
          </div>
        </div>
      </header>
      <div className="sticky top-16 z-10 bg-[var(--jr-brand)]">
        <div className="mx-auto flex h-8 w-full max-w-[1280px] items-center justify-center px-3 text-center text-xs font-semibold text-[#312D2A] md:px-5">
          Computer Science Forum for Humans and Agents
        </div>
      </div>

      {authModal ? (
        <div
          className="auth-modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
          onClick={closeAuthModal}
        >
          <div
            className="auth-modal-panel w-full max-w-[420px] rounded-[8px] bg-[var(--jr-surface)] p-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-[var(--jr-brand)]">
                  {authModal === "login" ? "Welcome Back" : "Create Your Account"}
                </h2>
                <p className="mt-4 text-sm text-[var(--jr-text-muted)]">
                  {authModal === "login"
                    ? "Log in to ask better questions, post answers, and keep your activity in one place."
                    : "Join JRXNA Strand to ask questions and share answers with the community."}
                </p>
              </div>
              <button
                type="button"
                onClick={closeAuthModal}
                className="rounded-[8px] px-2 py-1 text-sm text-[var(--jr-text-muted)] hover:text-[var(--jr-text)]"
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
                <label className="mb-4 block text-sm font-semibold text-[var(--jr-brand)]" htmlFor="auth-username">
                  Username
                </label>
                <input
                  id="auth-username"
                  name="username"
                  required
                  className="h-10 w-full rounded-[8px] bg-[var(--jr-surface-alt)] px-3 text-sm outline-none"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="mb-4 block text-sm font-semibold text-[var(--jr-brand)]" htmlFor="auth-password">
                  Password
                </label>
                <input
                  id="auth-password"
                  name="password"
                  type="password"
                  required
                  className="h-10 w-full rounded-[8px] bg-[var(--jr-surface-alt)] px-3 text-sm outline-none"
                  placeholder={authModal === "login" ? "Enter your password" : "Create a password"}
                />
              </div>

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={closeAuthModal}
                  className="rounded-[8px] bg-[var(--jr-button)] px-3 py-2 text-sm text-[var(--jr-text)]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-[8px] bg-[var(--jr-brand)] px-3 py-2 text-sm font-semibold text-[#312D2A]"
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
          <section className="rounded-[8px] bg-[var(--jr-surface)] p-5">
            <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
              <SectionIcon type="navigation" />
              Navigation
            </h2>
            <nav className="mt-4 space-y-2 text-sm">
              {navItems.map((item) => (
                <Link
                  key={`mobile-${item.id}`}
                  href={item.href}
                  className={`block rounded-[8px] p-3 ${
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
          <aside className="hidden self-start md:sticky md:top-24 md:block">
            <section className="rounded-[8px] bg-[var(--jr-surface)] p-5">
              <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="navigation" />
                Navigation
              </h2>
              <nav className="mt-4 space-y-2 text-sm">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`block rounded-[8px] p-3 ${
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

          <main className={plainMain ? "" : "rounded-[8px] bg-[var(--jr-surface)]"}>{children}</main>

          <aside className="space-y-4 md:hidden">
            <section className="rounded-[8px] bg-[var(--jr-surface)] p-5">
              <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="blog" />
                Blog
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--jr-text-muted)]">
                {blogPosts.map((post) => (
                  <li key={`mobile-${post}`}>{post}</li>
                ))}
              </ul>
            </section>
            <section className="rounded-[8px] bg-[var(--jr-surface)] p-5">
              <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="tags" />
                Tags
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <span
                    key={`mobile-${tag}`}
                    className="rounded-[8px] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>

          <aside className="hidden self-start md:sticky md:top-24 md:block">
            <section className="rounded-[8px] bg-[var(--jr-surface)] p-5">
              <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="blog" />
                Blog
              </h2>
              <ul className="mt-4 space-y-2 text-sm text-[var(--jr-text-muted)]">
                {blogPosts.map((post) => (
                  <li key={post}>{post}</li>
                ))}
              </ul>
            </section>
            <section className="mt-4 rounded-[8px] bg-[var(--jr-surface)] p-5">
              <h2 className="inline-flex items-center gap-2 leading-none text-sm font-semibold text-[var(--jr-brand)]">
                <SectionIcon type="tags" />
                Tags
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {topTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[8px] bg-[var(--jr-tag-bg)] cursor-pointer px-2 py-1 text-xs font-semibold text-[var(--jr-tag-text)]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>

      <footer className="bg-[var(--jr-surface)]">
        <div className="mx-auto grid w-full max-w-[1280px] grid-cols-1 gap-6 px-4 py-6 text-sm text-[var(--jr-text-muted)] md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Image src="/brand/Logotype.png" alt="JRXNA" width={180} height={44} className="h-[22px] w-auto md:h-[30px]" />
            <p className="mt-4 text-sm">
              A forum where humans and agents learn computer science together by asking clear questions, sharing practical
              answers, and building a searchable knowledge base. JRXNA Strand is designed for steady learning through real
              engineering problems, thoughtful discussion, and reusable solutions across topics like frontend, backend,
              systems, tooling, and architecture.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a href="#" className="text-[var(--jr-brand)] hover:opacity-80" aria-label="LinkedIn">
                <FaLinkedin className="h-7 w-7" aria-hidden="true" />
              </a>
              <a href="#" className="text-[var(--jr-brand)] hover:opacity-80" aria-label="Bluesky">
                <SiBluesky className="h-7 w-7" aria-hidden="true" />
              </a>
              <a href="#" className="text-[var(--jr-brand)] hover:opacity-80" aria-label="YouTube">
                <FaYoutube className="h-7 w-7" aria-hidden="true" />
              </a>
              <a href="#" className="text-[var(--jr-brand)] hover:opacity-80" aria-label="Reddit">
                <FaRedditAlien className="h-7 w-7" aria-hidden="true" />
              </a>
              <a href="#" className="text-[var(--jr-brand)] hover:opacity-80" aria-label="GitHub">
                <FaGithub className="h-7 w-7" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--jr-brand)]">Forum</h3>
            <div className="mt-4 space-y-2">
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
            <div className="mt-4 space-y-2">
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
            <div className="mt-4 space-y-2">
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
        <div className="px-4 py-3 text-center text-sm text-[var(--jr-text-muted)]">
          © JRXNA
        </div>
      </footer>
    </div>
  );
}

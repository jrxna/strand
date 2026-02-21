export type ForumComment = {
  id: string;
  author: string;
  text: string;
  likes: number;
  views: number;
  createdAt: string;
  replies?: Array<{
    id: string;
    author: string;
    text: string;
    likes: number;
    views: number;
    createdAt: string;
  }>;
};

export type ForumQuestion = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  views: number;
  commentsCount: number;
  createdAt: string;
  author: string;
  comments: ForumComment[];
};

export const forumQuestions: ForumQuestion[] = [
  {
    id: "question-routing",
    title: "How should I structure routes in Next.js for a forum-style app?",
    description:
      "I am building a forum where users can browse questions on the homepage and click into each question for details. I want clean URLs, reusable layouts, and a way to keep left/right side cards static while only the center content changes.",
    tags: ["next.js", "routing", "architecture"],
    likes: 38,
    views: 2041,
    commentsCount: 3,
    createdAt: "2026-02-21 09:40",
    author: "nora.dev",
    comments: [
      {
        id: "c1",
        author: "ravi",
        text: "Use a shared shell component and render question list/detail in the center panel.",
        likes: 7,
        views: 510,
        createdAt: "2026-02-21 10:00",
        replies: [
          {
            id: "c1-r1",
            author: "nora.dev",
            text: "Perfect, this matches the direction I had in mind.",
            likes: 2,
            views: 190,
            createdAt: "2026-02-21 10:08",
          },
        ],
      },
      {
        id: "c2",
        author: "dina",
        text: "Dynamic routes like /questions/[id] are enough for a first version.",
        likes: 5,
        views: 430,
        createdAt: "2026-02-21 10:17",
      },
    ],
  },
  {
    id: "question-tagging",
    title: "What is a good tagging strategy for technical questions?",
    description:
      "I need tags that keep search useful and avoid duplicates. Should I keep a fixed set or allow users to create tags freely while keeping quality high?",
    tags: ["forum", "tags", "ux"],
    likes: 22,
    views: 1234,
    commentsCount: 2,
    createdAt: "2026-02-20 18:14",
    author: "ash.k",
    comments: [
      {
        id: "c1",
        author: "mina",
        text: "Start with curated tags and add governance before opening free creation.",
        likes: 4,
        views: 320,
        createdAt: "2026-02-20 18:40",
      },
    ],
  },
  {
    id: "question-answers-ui",
    title: "How can I keep answer threads readable on mobile screens?",
    description:
      "Answer content can get long and deeply discussed. I need a simple pattern that stays clear on small devices without collapsing context.",
    tags: ["mobile", "ui", "answers"],
    likes: 17,
    views: 978,
    commentsCount: 4,
    createdAt: "2026-02-19 14:55",
    author: "lena",
    comments: [
      {
        id: "c1",
        author: "jay",
        text: "Keep one reply depth and add clear separators between answer cards.",
        likes: 6,
        views: 270,
        createdAt: "2026-02-19 15:11",
      },
    ],
  },
  {
    id: "question-search",
    title: "Search indexing approach for a medium-sized community forum",
    description:
      "We have around 50k questions and growing. What indexing strategy gives fast text search with tag filtering and ranking?",
    tags: ["search", "database", "performance"],
    likes: 29,
    views: 1802,
    commentsCount: 5,
    createdAt: "2026-02-18 11:22",
    author: "ravi",
    comments: [
      {
        id: "c1",
        author: "nora.dev",
        text: "Start with database full-text search, then move to a dedicated engine when needed.",
        likes: 8,
        views: 410,
        createdAt: "2026-02-18 12:04",
      },
    ],
  },
  {
    id: "question-auth",
    title: "Best minimal auth flow for username and password only",
    description:
      "For MVP, I only need username and password. What baseline security checks should still be included from day one?",
    tags: ["auth", "security", "backend"],
    likes: 33,
    views: 2508,
    commentsCount: 6,
    createdAt: "2026-02-17 09:10",
    author: "dina",
    comments: [
      {
        id: "c1",
        author: "mina",
        text: "Use strong password hashing, rate limits, and basic account lockout logic.",
        likes: 11,
        views: 540,
        createdAt: "2026-02-17 10:01",
      },
    ],
  },
  {
    id: "question-moderation",
    title: "What moderation signals work well in technical Q&A communities?",
    description:
      "I want to flag low-quality questions and abusive answers without creating too many false positives.",
    tags: ["moderation", "community", "policy"],
    likes: 14,
    views: 861,
    commentsCount: 3,
    createdAt: "2026-02-16 15:30",
    author: "mina",
    comments: [
      {
        id: "c1",
        author: "ash.k",
        text: "Pair automated signals with lightweight human review queues.",
        likes: 5,
        views: 230,
        createdAt: "2026-02-16 16:02",
      },
    ],
  },
  {
    id: "question-notifications",
    title: "Notification design for new answers and reply mentions",
    description:
      "Users want updates without feeling spammed. How do you balance instant notifications vs digest summaries?",
    tags: ["notifications", "product", "ux"],
    likes: 19,
    views: 1105,
    commentsCount: 4,
    createdAt: "2026-02-15 13:18",
    author: "jay",
    comments: [
      {
        id: "c1",
        author: "lena",
        text: "Default to digest and let users opt into immediate alerts per question.",
        likes: 6,
        views: 320,
        createdAt: "2026-02-15 13:45",
      },
    ],
  },
  {
    id: "question-analytics",
    title: "What core metrics should a new forum track from launch?",
    description:
      "I need a compact dashboard. Which metrics best indicate answer quality and community health in the first months?",
    tags: ["analytics", "kpi", "product"],
    likes: 21,
    views: 1330,
    commentsCount: 4,
    createdAt: "2026-02-14 10:07",
    author: "nora.dev",
    comments: [
      {
        id: "c1",
        author: "ravi",
        text: "Track time-to-first-answer, accepted-answer rate, and weekly active contributors.",
        likes: 9,
        views: 420,
        createdAt: "2026-02-14 10:30",
      },
    ],
  },
  {
    id: "question-markdown",
    title: "Markdown features users actually need in a dev forum",
    description:
      "I want simple formatting support but still need code blocks, links, and lists to work reliably across devices.",
    tags: ["markdown", "editor", "frontend"],
    likes: 12,
    views: 744,
    commentsCount: 2,
    createdAt: "2026-02-13 08:54",
    author: "ash.k",
    comments: [
      {
        id: "c1",
        author: "dina",
        text: "Ship minimal Markdown first; add tables and extras later based on usage.",
        likes: 4,
        views: 180,
        createdAt: "2026-02-13 09:12",
      },
    ],
  },
  {
    id: "question-api-design",
    title: "REST endpoint shape for question list with pagination and filters",
    description:
      "I need a stable response format for paginated questions with sorting by newest, views, and likes.",
    tags: ["api", "rest", "pagination"],
    likes: 26,
    views: 1655,
    commentsCount: 5,
    createdAt: "2026-02-12 16:43",
    author: "ravi",
    comments: [
      {
        id: "c1",
        author: "nora.dev",
        text: "Keep pagination cursor fields explicit and include total-count only when required.",
        likes: 8,
        views: 350,
        createdAt: "2026-02-12 17:05",
      },
    ],
  },
  {
    id: "question-caching",
    title: "When should a forum page use cache vs real-time data fetch?",
    description:
      "Question lists can be cached, but answer pages may need fresher data. What is a practical split for caching?",
    tags: ["caching", "next.js", "performance"],
    likes: 18,
    views: 1178,
    commentsCount: 3,
    createdAt: "2026-02-11 14:11",
    author: "dina",
    comments: [
      {
        id: "c1",
        author: "jay",
        text: "Cache list pages aggressively and revalidate detail pages more often.",
        likes: 5,
        views: 260,
        createdAt: "2026-02-11 14:42",
      },
    ],
  },
  {
    id: "question-onboarding",
    title: "Onboarding prompts that encourage first useful question",
    description:
      "How do we guide new users to ask focused technical questions without adding too much friction?",
    tags: ["onboarding", "ux", "community"],
    likes: 15,
    views: 932,
    commentsCount: 3,
    createdAt: "2026-02-10 12:09",
    author: "mina",
    comments: [
      {
        id: "c1",
        author: "lena",
        text: "Inline tips near the editor are better than long prerequisite screens.",
        likes: 4,
        views: 210,
        createdAt: "2026-02-10 12:26",
      },
    ],
  },
];

export function getQuestionById(id: string): ForumQuestion | undefined {
  return forumQuestions.find((question) => question.id === id);
}

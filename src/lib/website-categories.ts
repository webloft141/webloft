export type WebsiteEntry = {
  name: string;
  url: string;
};

export type WebsiteCategory = {
  title: string;
  description: string;
  sites: WebsiteEntry[];
};

export const WEBSITE_CATEGORIES: WebsiteCategory[] = [
  {
    title: "Learning",
    description: "Courses, documentation and coding practice platforms.",
    sites: [
      { name: "freeCodeCamp", url: "https://www.freecodecamp.org" },
      { name: "MDN Docs", url: "https://developer.mozilla.org" },
      { name: "Coursera", url: "https://www.coursera.org" },
    ],
  },
  {
    title: "Design & Inspiration",
    description: "UI ideas, graphics, and creative references.",
    sites: [
      { name: "Dribbble", url: "https://dribbble.com" },
      { name: "Behance", url: "https://www.behance.net" },
      { name: "Awwwards", url: "https://www.awwwards.com" },
    ],
  },
  {
    title: "Developer Tools",
    description: "Build, deploy and test faster with essential tools.",
    sites: [
      { name: "GitHub", url: "https://github.com" },
      { name: "Vercel", url: "https://vercel.com" },
      { name: "Postman", url: "https://www.postman.com" },
    ],
  },
  {
    title: "Productivity",
    description: "Daily workflow and team collaboration websites.",
    sites: [
      { name: "Notion", url: "https://www.notion.so" },
      { name: "Trello", url: "https://trello.com" },
      { name: "Slack", url: "https://slack.com" },
    ],
  },
];

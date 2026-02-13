export type WebsiteEntry = {
  id?: string;
  name: string;
  url: string;
  shortDescription?: string;
};

export type WebsiteSubcategory = {
  title: string;
  sites: WebsiteEntry[];
};

export type WebsiteCategory = {
  title: string;
  description: string;
  subcategories: WebsiteSubcategory[];
};

export const WEBSITE_CATEGORIES: WebsiteCategory[] = [
  {
    title: "Development Tools",
    description: "Core platforms and references for modern software development.",
    subcategories: [
      {
        title: "Code Platforms",
        sites: [
          { name: "GitHub", url: "https://github.com" },
          { name: "GitLab", url: "https://gitlab.com" },
          { name: "Stack Overflow", url: "https://stackoverflow.com" },
          { name: "CodePen", url: "https://codepen.io" },
          { name: "Replit", url: "https://replit.com" },
        ],
      },
      {
        title: "Build & Deploy",
        sites: [
          { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
          { name: "npm", url: "https://www.npmjs.com" },
          { name: "Docker", url: "https://www.docker.com" },
          { name: "Vercel", url: "https://vercel.com" },
          { name: "Netlify", url: "https://www.netlify.com" },
        ],
      },
    ],
  },
  {
    title: "AI & Automation",
    description: "AI assistants, model platforms, and no-code automation tools.",
    subcategories: [
      {
        title: "AI Platforms",
        sites: [
          { name: "OpenAI", url: "https://openai.com" },
          { name: "Anthropic", url: "https://www.anthropic.com" },
          { name: "Google AI Studio", url: "https://aistudio.google.com" },
          { name: "Hugging Face", url: "https://huggingface.co" },
          { name: "Perplexity", url: "https://www.perplexity.ai" },
        ],
      },
      {
        title: "Automation Stack",
        sites: [
          { name: "Zapier", url: "https://zapier.com" },
          { name: "Make", url: "https://www.make.com" },
          { name: "LangChain", url: "https://www.langchain.com" },
          { name: "Replicate", url: "https://replicate.com" },
          { name: "Poe", url: "https://poe.com" },
        ],
      },
    ],
  },
  {
    title: "Learning & Courses",
    description: "Trusted websites for structured learning and online education.",
    subcategories: [
      {
        title: "Course Platforms",
        sites: [
          { name: "Coursera", url: "https://www.coursera.org" },
          { name: "edX", url: "https://www.edx.org" },
          { name: "Udemy", url: "https://www.udemy.com" },
          { name: "FutureLearn", url: "https://www.futurelearn.com" },
          { name: "Skillshare", url: "https://www.skillshare.com" },
        ],
      },
      {
        title: "Learning Resources",
        sites: [
          { name: "Khan Academy", url: "https://www.khanacademy.org" },
          { name: "freeCodeCamp", url: "https://www.freecodecamp.org" },
          { name: "MIT OpenCourseWare", url: "https://ocw.mit.edu" },
          { name: "Codecademy", url: "https://www.codecademy.com" },
          { name: "Pluralsight", url: "https://www.pluralsight.com" },
        ],
      },
    ],
  },
  {
    title: "Design & Creativity",
    description: "Inspiration and design resources for UI, graphics, and media.",
    subcategories: [
      {
        title: "Design Tools",
        sites: [
          { name: "Figma", url: "https://www.figma.com" },
          { name: "Canva", url: "https://www.canva.com" },
          { name: "Adobe Color", url: "https://color.adobe.com" },
          { name: "Coolors", url: "https://coolors.co" },
          { name: "Pinterest", url: "https://www.pinterest.com" },
        ],
      },
      {
        title: "Inspiration & Assets",
        sites: [
          { name: "Dribbble", url: "https://dribbble.com" },
          { name: "Behance", url: "https://www.behance.net" },
          { name: "Unsplash", url: "https://unsplash.com" },
          { name: "Pexels", url: "https://www.pexels.com" },
          { name: "Awwwards", url: "https://www.awwwards.com" },
        ],
      },
    ],
  },
  {
    title: "Productivity & Collaboration",
    description: "Plan work, manage projects, and collaborate better with teams.",
    subcategories: [
      {
        title: "Project Management",
        sites: [
          { name: "Notion", url: "https://www.notion.so" },
          { name: "Trello", url: "https://trello.com" },
          { name: "Asana", url: "https://asana.com" },
          { name: "ClickUp", url: "https://clickup.com" },
          { name: "Monday.com", url: "https://monday.com" },
        ],
      },
      {
        title: "Team Workflow",
        sites: [
          { name: "Evernote", url: "https://evernote.com" },
          { name: "Todoist", url: "https://todoist.com" },
          { name: "Airtable", url: "https://www.airtable.com" },
          { name: "Miro", url: "https://miro.com" },
          { name: "Calendly", url: "https://calendly.com" },
        ],
      },
    ],
  },
  {
    title: "Business & Marketing",
    description: "Marketing, CRM, and social growth tools for online businesses.",
    subcategories: [
      {
        title: "Marketing Suite",
        sites: [
          { name: "HubSpot", url: "https://www.hubspot.com" },
          { name: "Mailchimp", url: "https://mailchimp.com" },
          { name: "Semrush", url: "https://www.semrush.com" },
          { name: "Ahrefs", url: "https://ahrefs.com" },
          { name: "Google Ads", url: "https://ads.google.com" },
        ],
      },
      {
        title: "Growth & CRM",
        sites: [
          { name: "Meta Business Suite", url: "https://business.facebook.com" },
          { name: "Buffer", url: "https://buffer.com" },
          { name: "Hootsuite", url: "https://www.hootsuite.com" },
          { name: "ConvertKit", url: "https://convertkit.com" },
          { name: "Zoho CRM", url: "https://www.zoho.com/crm" },
        ],
      },
    ],
  },
  {
    title: "News & Research",
    description: "News, insights, and research repositories for informed decisions.",
    subcategories: [
      {
        title: "News Channels",
        sites: [
          { name: "Google News", url: "https://news.google.com" },
          { name: "Reuters", url: "https://www.reuters.com" },
          { name: "BBC", url: "https://www.bbc.com" },
          { name: "The Verge", url: "https://www.theverge.com" },
          { name: "TechCrunch", url: "https://techcrunch.com" },
        ],
      },
      {
        title: "Knowledge Sources",
        sites: [
          { name: "Hacker News", url: "https://news.ycombinator.com" },
          { name: "Medium", url: "https://medium.com" },
          { name: "Quora", url: "https://www.quora.com" },
          { name: "JSTOR", url: "https://www.jstor.org" },
          { name: "arXiv", url: "https://arxiv.org" },
        ],
      },
    ],
  },
  {
    title: "Finance & Careers",
    description: "Career platforms, payment tools, and financial intelligence hubs.",
    subcategories: [
      {
        title: "Careers",
        sites: [
          { name: "LinkedIn", url: "https://www.linkedin.com" },
          { name: "Indeed", url: "https://www.indeed.com" },
          { name: "Glassdoor", url: "https://www.glassdoor.com" },
          { name: "Wellfound", url: "https://wellfound.com" },
          { name: "Upwork", url: "https://www.upwork.com" },
        ],
      },
      {
        title: "Finance Tools",
        sites: [
          { name: "Stripe", url: "https://stripe.com" },
          { name: "PayPal", url: "https://www.paypal.com" },
          { name: "Investopedia", url: "https://www.investopedia.com" },
          { name: "Yahoo Finance", url: "https://finance.yahoo.com" },
          { name: "TradingView", url: "https://www.tradingview.com" },
        ],
      },
    ],
  },
  {
    title: "Shopping & Deals",
    description: "Global online marketplaces and trusted shopping destinations.",
    subcategories: [
      {
        title: "Marketplaces",
        sites: [
          { name: "Amazon", url: "https://www.amazon.com" },
          { name: "Flipkart", url: "https://www.flipkart.com" },
          { name: "eBay", url: "https://www.ebay.com" },
          { name: "Etsy", url: "https://www.etsy.com" },
          { name: "AliExpress", url: "https://www.aliexpress.com" },
        ],
      },
      {
        title: "Retail Stores",
        sites: [
          { name: "Walmart", url: "https://www.walmart.com" },
          { name: "Myntra", url: "https://www.myntra.com" },
          { name: "Best Buy", url: "https://www.bestbuy.com" },
          { name: "Target", url: "https://www.target.com" },
          { name: "Newegg", url: "https://www.newegg.com" },
        ],
      },
    ],
  },
  {
    title: "Entertainment & Lifestyle",
    description: "Streaming, travel, food, books, and everyday lifestyle services.",
    subcategories: [
      {
        title: "Streaming & Media",
        sites: [
          { name: "YouTube", url: "https://www.youtube.com" },
          { name: "Spotify", url: "https://www.spotify.com" },
          { name: "Netflix", url: "https://www.netflix.com" },
          { name: "Disney+", url: "https://www.disneyplus.com" },
          { name: "Prime Video", url: "https://www.primevideo.com" },
        ],
      },
      {
        title: "Lifestyle & Leisure",
        sites: [
          { name: "Twitch", url: "https://www.twitch.tv" },
          { name: "IMDb", url: "https://www.imdb.com" },
          { name: "Goodreads", url: "https://www.goodreads.com" },
          { name: "Tripadvisor", url: "https://www.tripadvisor.com" },
          { name: "Zomato", url: "https://www.zomato.com" },
        ],
      },
    ],
  },
];

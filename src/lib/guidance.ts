import type { ProjectSpecs } from "@/lib/types"

// ---------------------------------------------------------------------------
// 1. STEP_GUIDANCE -- contextual help for each wizard step
// ---------------------------------------------------------------------------

export interface StepGuidance {
  headline: string
  explanation: string
  tips: string[]
  example?: string
}

export const STEP_GUIDANCE: Record<string, StepGuidance> = {
  basics: {
    headline: "A clear name and description save you hours later.",
    explanation:
      "Your project name becomes the folder name, the title in your browser tab, and the way you refer to this thing for months. The description is even more important -- it tells the AI what you are actually trying to build, so the more specific you are, the better code you get back.",
    tips: [
      "Use lowercase-with-dashes for the project name (e.g. \"pet-tracker\" not \"Pet Tracker\"). This avoids annoying issues with file paths later.",
      "In the description, mention WHO uses it and WHAT they accomplish. \"A dashboard where restaurant owners track daily sales\" beats \"a dashboard app.\"",
      "Include the one thing that makes your project different. \"Like Notion but for recipe planning\" gives the AI a mental model to work from.",
      "Don't worry about being too detailed here -- you will add features and tech choices in later steps.",
    ],
    example:
      "meal-prep-planner -- A web app where busy parents can plan weekly meals, generate grocery lists, and save favorite recipes. Should feel simple and fast, like a to-do list for food.",
  },

  stack: {
    headline: "Your tech stack is the set of tools your app is built with.",
    explanation:
      "Think of the tech stack like the materials for building a house. The framework is your construction method (prefab vs. custom), the language is what you write the instructions in, and the styling choice is how you make it look good. You do not need to be an expert -- just pick what matches your project type and AI tools will handle the rest.",
    tips: [
      "If you are not sure, go with Next.js + TypeScript + Tailwind CSS. It is the most popular combo for AI-assisted coding and has the best support in tools like Claude, Cursor, and Copilot.",
      "Building something without a user interface (just an API)? Pick Express.js or Fastify and choose \"None (API only)\" for styling.",
      "TypeScript is almost always a better choice than plain JavaScript -- it catches mistakes before they happen, and AI tools generate more reliable TypeScript code.",
      "If your project is a simple marketing site or blog with minimal interactivity, Astro is a great lightweight choice.",
    ],
    example:
      "For a typical SaaS web app: Framework = Next.js 14 (App Router), Language = TypeScript, Styling = Tailwind CSS",
  },

  data: {
    headline: "The data layer is where your app remembers things.",
    explanation:
      "When a user creates an account, writes a post, or uploads a photo, that information needs to be stored somewhere so it is there next time they visit. A database is that storage. An ORM is a helper that makes it easier to talk to the database from your code. Authentication (auth) is how users prove they are who they say they are -- logins, passwords, that sort of thing.",
    tips: [
      "Supabase is the easiest starting point for most projects -- it gives you a database, auth, and file storage in one package, with a generous free tier.",
      "If you picked Supabase as your database, also pick Supabase Auth -- they work together seamlessly and share the same dashboard.",
      "If your project does not need user accounts or saved data (e.g. a calculator or converter tool), it is totally fine to pick \"None\" for all three.",
      "Prisma is the most popular ORM for TypeScript projects. It has excellent AI support and auto-generates types for your database tables.",
    ],
    example:
      "For a project with user accounts and saved data: Database = Supabase, ORM = Prisma, Auth = Supabase Auth",
  },

  features: {
    headline: "Start with the one thing your app MUST do, then add from there.",
    explanation:
      "Features are the actions users can take in your app. It is tempting to list everything you can imagine, but the most successful projects start small. Think about the core loop -- the single most important thing a user does -- and build outward. AI tools are great at adding features later, so you will not be locked in.",
    tips: [
      "Write features as user actions: \"User can upload a profile photo\" is clearer than just \"photo uploads.\"",
      "Aim for 3 to 5 core features for your first version. You can always add more later and AI coding tools make that easy.",
      "Put your features in priority order -- the AI will focus on the first ones listed when generating code.",
      "If you are stuck, think about: What does a user do the FIRST time they open your app? What do they do EVERY time they come back?",
    ],
    example:
      "For a recipe sharing app: User can create an account and log in, User can add a new recipe with ingredients and steps, User can search recipes by ingredient, User can save favorite recipes to a personal collection",
  },

  architecture: {
    headline: "Architecture is how the pieces of your app are organized.",
    explanation:
      "Do not overthink this one. For most projects built with AI coding tools, a simple monolith (everything in one codebase) is the right call. It is easier to build, easier to debug, and easier for AI to understand. Microservices, serverless, and event-driven architectures solve problems you probably do not have yet.",
    tips: [
      "For a web app with a UI, a simple monolith is almost always the right choice. Next.js already handles both the frontend and backend in one project.",
      "Pick Vercel for hosting if you are using Next.js -- deployment is literally one click and the free tier is generous.",
      "Only consider microservices if you have a very specific reason (e.g. one part of your app needs to scale independently). For 99% of new projects, a monolith is faster to build.",
      "Write something brief in the architecture notes like \"Simple monolith, deploy to Vercel\" -- this helps the AI generate a clean, straightforward project structure.",
    ],
    example:
      "Architecture Notes: Monolith with Next.js API routes. Server components where possible, client components only for interactive parts. Hosting: Vercel",
  },

  constraints: {
    headline: "Constraints keep your project realistic and focused.",
    explanation:
      "Every project has limits -- time, money, who needs to use it, and what devices it runs on. Being upfront about these helps the AI make smarter trade-offs. For example, if you need to launch in two weeks, it will not suggest building a custom design system from scratch.",
    tips: [
      "Mention your timeline: \"MVP in 2 weeks\" vs. \"no rush, learning project\" leads to very different code suggestions.",
      "If your app needs to work on phones, say so explicitly. The AI will prioritize responsive design and mobile-friendly interactions.",
      "Budget matters: if you need to stay on free tiers, mention that. The AI will avoid suggesting services that get expensive quickly.",
      "Accessibility is important and often overlooked. Even saying \"basic accessibility -- keyboard navigation and screen reader support\" makes a real difference.",
    ],
    example:
      "MVP ready in 2 weeks. Must work well on mobile. Stay within free tiers for all services. Basic accessibility support. Target audience is not very tech-savvy so the UI needs to be dead simple.",
  },

  "ai-goals": {
    headline: "Tell the AI how you plan to build this and what success looks like.",
    explanation:
      "This is where you describe your coding setup and what you are hoping to achieve. Are you using Claude Code in the terminal? Cursor in your editor? Copilot? This context helps generate prompts that work with YOUR specific workflow. Also share your goal -- is this a weekend project, a startup MVP, or a learning exercise?",
    tips: [
      "Name the specific AI tools you plan to use: \"Building with Claude Code CLI\" or \"Using Cursor with Claude\" helps tailor the output to your workflow.",
      "Be honest about your experience level. \"I have never coded before\" is useful context that leads to simpler, more heavily-commented code.",
      "State what \"done\" looks like: \"Deployed and usable by 10 beta users\" is more actionable than just \"finished.\"",
      "If you are learning, say so! The AI can generate more comments and explanations in the code to help you understand what is happening.",
    ],
    example:
      "AI Coding Approach: Using Claude Code CLI for most development. Will use Cursor for quick edits. No prior coding experience. Project Goals: Working MVP deployed to Vercel in 2 weeks. Should be polished enough to demo to potential investors.",
  },
}

// ---------------------------------------------------------------------------
// 2. OPTION_GUIDANCE -- per-option help for every dropdown choice
// ---------------------------------------------------------------------------

export interface OptionGuidance {
  summary: string
  bestFor: string
  difficulty: "beginner" | "intermediate" | "advanced"
  aiSupport: "excellent" | "good" | "limited"
}

export const OPTION_GUIDANCE: Record<string, Record<string, OptionGuidance>> = {
  // ---- FRAMEWORK OPTIONS (14) ----
  framework: {
    "Next.js 14 (App Router)": {
      summary:
        "The newest version of Next.js -- the most popular React framework. Handles both the visible website and the behind-the-scenes server logic in one project.",
      bestFor: "Most web apps, SaaS products, and anything that needs good SEO and fast loading.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    "Next.js 14 (Pages Router)": {
      summary:
        "The older, more established pattern for Next.js. Same framework but organizes pages differently. Tons of tutorials and examples exist for this version.",
      bestFor: "Projects where you are following an older tutorial, or you prefer a battle-tested approach with more learning resources.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    "React + Vite": {
      summary:
        "Plain React without the extra features of Next.js, bundled with Vite (a super-fast build tool). Your app runs entirely in the browser with no server-side rendering.",
      bestFor: "Single-page apps, dashboards, or tools where search engine visibility does not matter. Great for learning React basics.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Remix: {
      summary:
        "A React framework focused on web standards and fast page loads. Similar to Next.js but with a different philosophy about how data flows through your app.",
      bestFor: "Web apps where page speed and progressive enhancement are top priorities.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Astro: {
      summary:
        "A framework designed for content-heavy websites. Ships zero JavaScript by default, making pages incredibly fast. You can still add interactive bits where needed.",
      bestFor: "Blogs, marketing sites, documentation, and portfolios -- anything mostly static with sprinkles of interactivity.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    SvelteKit: {
      summary:
        "A full-stack framework using Svelte, which takes a fundamentally different (and some say simpler) approach to building UIs. Less boilerplate code than React.",
      bestFor: "Developers who want a clean, minimal syntax. Great for interactive apps and smooth animations.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Nuxt 3": {
      summary:
        "The Vue.js equivalent of Next.js. If you prefer Vue's template-based approach over React's JSX syntax, this is your go-to full-stack framework.",
      bestFor: "Vue.js fans, teams coming from Vue 2, or anyone who finds React's syntax confusing.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Express.js": {
      summary:
        "The most popular Node.js web server. Minimal and flexible -- you build exactly what you need, nothing more. No built-in UI; this is for APIs and backend services.",
      bestFor: "REST APIs, backend services, or when you want full control over your server with no opinions imposed on your code structure.",
      difficulty: "intermediate",
      aiSupport: "excellent",
    },
    Fastify: {
      summary:
        "A faster, more modern alternative to Express. Similar concept (a Node.js server) but with better performance and built-in input validation.",
      bestFor: "High-performance APIs and backend services where speed matters.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Django: {
      summary:
        "A Python web framework that comes with everything included -- admin panel, database tools, auth, and more. The \"batteries included\" approach to web development.",
      bestFor: "Python developers building data-heavy apps, admin tools, or projects that lean on Python's data science libraries.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Flask: {
      summary:
        "A lightweight Python web framework. Like Express but for Python -- minimal, flexible, and you add only what you need.",
      bestFor: "Simple Python APIs, microservices, or projects that use Python machine-learning libraries on the backend.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Rails: {
      summary:
        "Ruby on Rails -- the framework that pioneered \"convention over configuration.\" It makes strong decisions about how your code should be organized so you can move fast.",
      bestFor: "Rapid prototyping, startups that need to ship fast, and developers who like opinionated frameworks that make decisions for you.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Laravel: {
      summary:
        "The most popular PHP framework. Similar philosophy to Rails -- elegant syntax, lots of built-in tools, and a huge ecosystem of packages.",
      bestFor: "PHP developers, WordPress-adjacent projects, or traditional web apps with server-rendered pages.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Other: {
      summary:
        "Something not listed here. You can type in whatever framework you plan to use in the project description.",
      bestFor: "When you have a specific framework in mind that is not in this list.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- LANGUAGE OPTIONS (8) ----
  language: {
    TypeScript: {
      summary:
        "JavaScript with added type safety. Catches bugs before you run your code and gives AI tools much better context to generate accurate, reliable code.",
      bestFor: "Almost every web project. The number one recommended language for AI-assisted vibe coding.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    JavaScript: {
      summary:
        "The original language of the web. Runs in every browser and on servers via Node.js. More forgiving than TypeScript but also easier to introduce bugs.",
      bestFor: "Quick prototypes, small scripts, or if TypeScript's types feel overwhelming at first.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Python: {
      summary:
        "Known for its readable, English-like syntax. Dominant in data science, machine learning, and backend APIs. Not typically used for frontend web interfaces.",
      bestFor: "Backend APIs, data processing, machine learning projects, and automation scripts.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Ruby: {
      summary:
        "A language designed for developer happiness with elegant, expressive syntax. Almost always paired with the Rails framework for web projects.",
      bestFor: "Rails projects, rapid prototyping, and developers who value clean, readable code.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Go: {
      summary:
        "A fast, simple language created by Google. Compiles to a single file you can run anywhere, making deployment easy. Great for performance-critical backend services.",
      bestFor: "High-performance APIs, microservices, CLI tools, and infrastructure projects.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Rust: {
      summary:
        "A systems programming language focused on safety and performance. Very fast but has a steep learning curve. Not recommended for beginners or typical web apps.",
      bestFor: "Performance-critical applications, WebAssembly, CLI tools, and projects where memory safety is essential.",
      difficulty: "advanced",
      aiSupport: "good",
    },
    PHP: {
      summary:
        "One of the oldest web languages, powering WordPress and a huge chunk of the internet. Modern PHP (version 8+) is actually quite pleasant to write.",
      bestFor: "WordPress sites, Laravel projects, and traditional server-rendered web applications.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    Other: {
      summary:
        "A language not listed here. You can specify it in your project description.",
      bestFor: "When you have a specific language requirement not covered by the options above.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- STYLING OPTIONS (8) ----
  styling: {
    "Tailwind CSS": {
      summary:
        "A utility-first approach where you style elements by adding small helper classes directly in your HTML. No separate CSS files needed. Incredibly fast once you get the hang of it.",
      bestFor: "Almost any web project. The number one choice for AI-assisted development because AI tools generate Tailwind code extremely well.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    "CSS Modules": {
      summary:
        "Regular CSS but automatically scoped to each component so styles never accidentally leak to other parts of your app. Built into Next.js out of the box.",
      bestFor: "Projects that want traditional CSS with the safety of component scoping. Good for teams with existing CSS experience.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    "Styled Components": {
      summary:
        "Write your CSS directly inside your JavaScript or TypeScript files using special tagged template literals. Each component carries its own styles with it.",
      bestFor: "React projects that want dynamic, theme-able styling tightly coupled to components.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Emotion: {
      summary:
        "Similar to Styled Components but with a slightly different API and better performance in some cases. Another CSS-in-JS approach.",
      bestFor: "Projects that need CSS-in-JS with maximum flexibility and runtime theming.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Sass/SCSS": {
      summary:
        "CSS with superpowers -- variables, nesting, mixins, and more. Compiles down to regular CSS. Has been around for years and is very mature and stable.",
      bestFor: "Large projects with complex design systems, or developers who already know and love Sass.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Vanilla CSS": {
      summary:
        "Plain, standard CSS with no frameworks or preprocessors. Modern CSS now has variables, nesting, and container queries built in natively.",
      bestFor: "Simple projects, learning CSS fundamentals, or when you want zero extra dependencies for styling.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    "None (API only)": {
      summary:
        "No styling needed because this project has no user interface. It is purely a backend service or API that other programs talk to.",
      bestFor: "Backend APIs, microservices, CLI tools, or background worker processes with no visual interface.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Other: {
      summary:
        "A styling approach not listed here. You can specify it in your project details.",
      bestFor: "When you have a specific styling framework or methodology in mind.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- DATABASE OPTIONS (10) ----
  database: {
    PostgreSQL: {
      summary:
        "The gold standard of databases. Reliable, powerful, and handles everything from tiny apps to massive enterprise systems. Stores data in structured tables with rows and columns.",
      bestFor: "Almost any project that needs to store structured data. The safe, reliable default choice for production applications.",
      difficulty: "intermediate",
      aiSupport: "excellent",
    },
    MySQL: {
      summary:
        "One of the most widely-used databases in the world. Similar to PostgreSQL but with some differences in advanced features. Powers WordPress and many existing systems.",
      bestFor: "Traditional web apps, WordPress-adjacent projects, or when the hosting provider only supports MySQL.",
      difficulty: "intermediate",
      aiSupport: "excellent",
    },
    SQLite: {
      summary:
        "A database that lives in a single file on your computer -- no separate database server to install or run. Super simple to set up but limited for apps with many simultaneous users.",
      bestFor: "Prototypes, local development, embedded applications, or single-user tools. Not ideal for production web apps with many concurrent users.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    MongoDB: {
      summary:
        "A NoSQL database that stores data as flexible JSON-like documents instead of rigid tables. No need to define your exact data structure upfront.",
      bestFor: "Projects with rapidly changing data structures, content management, or when your data does not fit neatly into rows and columns.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Supabase: {
      summary:
        "A hosted PostgreSQL database with a beautiful dashboard, built-in auth, file storage, and real-time features. Think of it as an all-in-one backend you can set up in minutes.",
      bestFor: "The top recommendation for AI-assisted vibe coding. You get a database, auth, and more with minimal setup and a generous free tier.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Firebase: {
      summary:
        "Google's all-in-one backend platform. Includes a NoSQL database (Firestore), auth, hosting, and more. Great tooling but can get expensive and locks you into Google's ecosystem.",
      bestFor: "Mobile apps, real-time apps (like chat), and projects that heavily use other Google services.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    PlanetScale: {
      summary:
        "A serverless MySQL database with a Git-like branching workflow for your database structure. Scales automatically and has a modern developer-friendly interface.",
      bestFor: "Production apps that need MySQL compatibility with modern developer tooling and automatic scaling.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Neon: {
      summary:
        "Serverless PostgreSQL that scales to zero -- you only pay when your database is actually being used. Great developer experience with branching and instant setup.",
      bestFor: "Projects that want PostgreSQL with modern, serverless deployment and cost efficiency.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    None: {
      summary:
        "No database needed. The app does not store any persistent data -- everything either lives in the browser temporarily or is fetched from external APIs.",
      bestFor: "Static sites, calculators, single-page tools, or apps that only consume external APIs without storing their own data.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Other: {
      summary:
        "A database not listed here. You can specify it in your project details or description.",
      bestFor: "When you have a specific database requirement not covered by the options above.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- ORM OPTIONS (9) ----
  orm: {
    Prisma: {
      summary:
        "The most popular TypeScript ORM. You define your database structure in a simple schema file and Prisma generates type-safe code to interact with it. Feels almost magical.",
      bestFor: "Any TypeScript or JavaScript project using a SQL database. The top recommendation for AI-assisted coding because of its excellent type generation.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Drizzle: {
      summary:
        "A newer, lighter TypeScript ORM that stays closer to raw SQL. Faster than Prisma at runtime and gives you more control over the exact queries being run.",
      bestFor: "Developers who want type safety but prefer writing SQL-like code, or projects where query performance is critical.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    TypeORM: {
      summary:
        "An ORM that works with both TypeScript and JavaScript. Uses decorators (special annotations on your code) to define your data models. Been around longer than Prisma.",
      bestFor: "Enterprise-style TypeScript projects, or developers coming from Java or C# who are familiar with the decorator pattern.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Sequelize: {
      summary:
        "One of the oldest and most battle-tested Node.js ORMs. Works well but its TypeScript support is not as smooth as newer options like Prisma.",
      bestFor: "Legacy JavaScript projects or teams already familiar with Sequelize. For new projects, Prisma is usually a better choice.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    Mongoose: {
      summary:
        "The standard way to interact with MongoDB from Node.js. Defines data models (called schemas) and provides a clean API for all database operations.",
      bestFor: "Any project using MongoDB as its database. If you picked MongoDB, Mongoose is the natural pairing.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    Knex: {
      summary:
        "A SQL query builder (not a full ORM). You write queries that look like SQL but in JavaScript. Gives you direct control without the abstraction layers of a full ORM.",
      bestFor: "Developers who are comfortable with SQL and want a thin helper layer rather than a full-featured ORM.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    SQLAlchemy: {
      summary:
        "The most popular Python ORM. Extremely powerful and flexible, used everywhere in the Python ecosystem from small scripts to large enterprise applications.",
      bestFor: "Any Python project (Django, Flask, FastAPI) that needs database access. The Python equivalent of Prisma.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    None: {
      summary:
        "No ORM -- you will either write raw database queries, use the database's built-in client library, or your project does not need database access at all.",
      bestFor: "Projects with no database, very simple data needs, or when you prefer writing raw SQL queries directly.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Other: {
      summary:
        "An ORM or query builder not listed here. You can specify it in your project details.",
      bestFor: "When you have a specific ORM requirement not covered by the options above.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- AUTH OPTIONS (8) ----
  auth: {
    "NextAuth / Auth.js": {
      summary:
        "The most popular authentication library for Next.js. Supports dozens of sign-in providers (Google, GitHub, email, etc.) and handles sessions automatically.",
      bestFor: "Next.js projects that need social logins or email-based auth. Well-documented and widely used in the community.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Clerk: {
      summary:
        "A fully-managed auth service with beautiful pre-built UI components. Drop in their login and signup forms and they handle everything -- passwords, sessions, multi-factor auth.",
      bestFor: "Projects where you want auth set up in minutes with zero custom UI work. Generous free tier for small projects.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    "Supabase Auth": {
      summary:
        "Authentication built into the Supabase platform. Handles email and password, magic links, social logins, and row-level security (controlling who can see what data).",
      bestFor: "Any project already using Supabase for the database. Everything works together seamlessly -- auth, database, and file storage share one dashboard.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    "Firebase Auth": {
      summary:
        "Google's authentication service. Supports email, phone number, social logins, and anonymous auth. Tight integration with other Firebase services.",
      bestFor: "Projects using Firebase for other features, mobile apps, or apps that need phone number authentication.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    "Passport.js": {
      summary:
        "A flexible Node.js authentication middleware with hundreds of strategies (plugins) for different login methods. Very customizable but requires more manual setup.",
      bestFor: "Express.js or Fastify projects that need custom authentication flows or unusual login providers.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Custom JWT": {
      summary:
        "Building authentication from scratch using JSON Web Tokens. You control every aspect of the login flow, token generation, and session management yourself.",
      bestFor: "Advanced projects with very specific auth requirements, or developers who want to learn how authentication works under the hood.",
      difficulty: "advanced",
      aiSupport: "good",
    },
    None: {
      summary:
        "No authentication needed. The app does not have user accounts or any protected content that requires login.",
      bestFor: "Public tools, calculators, informational sites, or apps where every visitor sees the same thing.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Other: {
      summary:
        "An auth solution not listed here. You can specify it in your project details.",
      bestFor: "When you have a specific authentication requirement not covered by the options above.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },

  // ---- HOSTING OPTIONS (10) ----
  hosting: {
    Vercel: {
      summary:
        "The company behind Next.js. One-click deployment from GitHub, automatic preview URLs for every change, and a generous free tier. The easiest way to get a web app online.",
      bestFor: "Next.js projects (perfect match), React apps, and any frontend project. The top choice for AI-assisted vibe coding projects.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Netlify: {
      summary:
        "Similar to Vercel -- easy deployment, preview URLs, and great developer experience. Slightly better for static sites and has useful built-in features like form handling.",
      bestFor: "Static sites, Astro projects, and JAMstack apps. Also great for projects that need built-in form handling without a backend.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    AWS: {
      summary:
        "Amazon Web Services -- the largest cloud platform. Incredibly powerful but complex. Has services for literally everything, but the learning curve is steep.",
      bestFor: "Enterprise projects, complex architectures, or when you need specific cloud services. Not recommended for beginners.",
      difficulty: "advanced",
      aiSupport: "good",
    },
    "Google Cloud": {
      summary:
        "Google's cloud platform. Strong in AI and machine learning services, container orchestration, and big data processing. Similar in scope to AWS.",
      bestFor: "Projects using Google AI services, Firebase-adjacent apps, or teams already in the Google ecosystem.",
      difficulty: "advanced",
      aiSupport: "good",
    },
    Railway: {
      summary:
        "A modern hosting platform that makes deploying backend services feel effortless. Connects to your GitHub repo and auto-deploys on every push. Simple, predictable pricing.",
      bestFor: "Backend APIs, full-stack apps with databases, and projects that need more than just static hosting. Great middle ground between Vercel and AWS.",
      difficulty: "beginner",
      aiSupport: "good",
    },
    "Fly.io": {
      summary:
        "A platform that deploys your app to servers around the world, putting it close to your users for fast response times. Runs containers under the hood.",
      bestFor: "Apps that need low latency globally, WebSocket-heavy apps (like real-time collaboration tools), or Docker-based deployments.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    DigitalOcean: {
      summary:
        "A developer-friendly cloud provider known for simplicity and fair pricing. Offers managed databases, Kubernetes, and their App Platform for easy deployments.",
      bestFor: "Developers who want more control than Vercel or Netlify but less complexity than AWS. Good for backend-heavy projects.",
      difficulty: "intermediate",
      aiSupport: "good",
    },
    "Self-hosted": {
      summary:
        "Running the app on your own server or infrastructure. Maximum control but you are responsible for security, updates, backups, and keeping it online.",
      bestFor: "Projects with strict data privacy requirements, internal tools on company servers, or learning server administration.",
      difficulty: "advanced",
      aiSupport: "limited",
    },
    Undecided: {
      summary:
        "Have not picked a hosting provider yet. That is totally fine -- you can decide later without affecting your code much.",
      bestFor: "Early-stage projects where you want to focus on building first and figure out deployment later.",
      difficulty: "beginner",
      aiSupport: "excellent",
    },
    Other: {
      summary:
        "A hosting provider not listed here. You can specify it in your project details.",
      bestFor: "When you have a specific hosting requirement or provider in mind.",
      difficulty: "intermediate",
      aiSupport: "limited",
    },
  },
}

// ---------------------------------------------------------------------------
// 3. RECOMMENDED_STACKS -- pre-configured starter packs
// ---------------------------------------------------------------------------

export interface RecommendedStack {
  label: string
  description: string
  specs: Partial<ProjectSpecs>
}

export const RECOMMENDED_STACKS: RecommendedStack[] = [
  {
    label: "SaaS Web App",
    description:
      "The go-to stack for subscription-based web apps. Great AI support, fast to build, and scales well. Includes auth, database, and a modern UI framework out of the box.",
    specs: {
      framework: "Next.js 14 (App Router)",
      language: "TypeScript",
      styling: "Tailwind CSS",
      database: "Supabase",
      orm: "Prisma",
      auth: "Supabase Auth",
      hosting: "Vercel",
      architecture:
        "Monolith with Next.js API routes. Server components for data fetching, client components for interactive UI. Supabase handles the backend plumbing.",
    },
  },
  {
    label: "Landing Page",
    description:
      "Lightning-fast static site with no database needed. Perfect for product launches, portfolios, company websites, or any content-focused page that needs to load instantly.",
    specs: {
      framework: "Astro",
      language: "TypeScript",
      styling: "Tailwind CSS",
      database: "None",
      orm: "None",
      auth: "None",
      hosting: "Netlify",
      architecture:
        "Static site with zero JavaScript by default. Add interactive islands only where needed. Optimized images and minimal bundle size.",
    },
  },
  {
    label: "Internal Tool",
    description:
      "A data-rich dashboard for your team or business. Handles complex tables, charts, forms, and admin workflows with role-based access control.",
    specs: {
      framework: "Next.js 14 (App Router)",
      language: "TypeScript",
      styling: "Tailwind CSS",
      database: "PostgreSQL",
      orm: "Prisma",
      auth: "NextAuth / Auth.js",
      hosting: "Vercel",
      architecture:
        "Monolith with server-side data fetching. Role-based access control for different user types. Data tables, forms, and CRUD operations.",
    },
  },
  {
    label: "API Service",
    description:
      "A standalone backend that serves data to other apps or frontends. No UI -- just clean, well-structured API endpoints with authentication and validation.",
    specs: {
      framework: "Express.js",
      language: "TypeScript",
      styling: "None (API only)",
      database: "PostgreSQL",
      orm: "Prisma",
      auth: "Custom JWT",
      hosting: "Railway",
      architecture:
        "RESTful API with clear route separation. Modular service layer for business logic. Input validation and error handling on every endpoint.",
    },
  },
  {
    label: "E-commerce Store",
    description:
      "An online store with product listings, shopping cart, checkout, and Stripe payment processing. Includes an admin panel for managing products and orders.",
    specs: {
      framework: "Next.js 14 (App Router)",
      language: "TypeScript",
      styling: "Tailwind CSS",
      database: "Supabase",
      orm: "Prisma",
      auth: "Supabase Auth",
      hosting: "Vercel",
      features: [
        "Product catalog with categories and search",
        "Shopping cart with quantity management",
        "Stripe checkout and payment processing",
        "Order history and tracking",
        "Admin panel for managing products and orders",
      ],
      architecture:
        "Monolith with Next.js API routes. Stripe webhooks for payment processing. Server components for product pages (good for SEO).",
    },
  },
  {
    label: "Mobile-First PWA",
    description:
      "A web app designed primarily for phones and tablets. Fast, responsive, and can be installed on the home screen like a native app. Uses Supabase for the entire backend.",
    specs: {
      framework: "React + Vite",
      language: "TypeScript",
      styling: "Tailwind CSS",
      database: "Supabase",
      orm: "None",
      auth: "Supabase Auth",
      hosting: "Vercel",
      architecture:
        "Single-page app optimized for mobile viewports. Uses Supabase client SDK directly (no ORM needed). Progressive Web App support for home screen installation and offline basics.",
    },
  },
]

// ---------------------------------------------------------------------------
// 4. FEATURE_TEMPLATES -- one-click feature sets
// ---------------------------------------------------------------------------

export interface FeatureTemplate {
  label: string
  features: string[]
}

export const FEATURE_TEMPLATES: FeatureTemplate[] = [
  {
    label: "User Management",
    features: [
      "User registration with email and password",
      "Login and logout with session management",
      "Password reset via email",
      "User profile page with editable fields",
      "Avatar upload and display",
    ],
  },
  {
    label: "Blog / CMS",
    features: [
      "Create, edit, and delete posts with a rich text editor",
      "Draft and published states for content",
      "Categories and tags for organizing posts",
      "Public-facing blog page with pagination",
      "SEO metadata for each post (title, description, open graph image)",
    ],
  },
  {
    label: "Payments",
    features: [
      "Stripe integration for one-time and recurring payments",
      "Pricing page with multiple plan tiers",
      "Checkout flow with credit card and alternative payment methods",
      "Customer billing portal for managing subscriptions",
      "Webhook handling for payment events (success, failure, cancellation)",
    ],
  },
  {
    label: "Notifications",
    features: [
      "In-app notification center with read and unread status",
      "Email notifications for important events",
      "Notification preferences page (opt in or out by type)",
      "Real-time notification badge showing unread count",
    ],
  },
  {
    label: "Admin Panel",
    features: [
      "Admin-only area with role-based access control",
      "User management table with search, filter, and bulk actions",
      "Analytics overview with key metrics and charts",
      "Content moderation tools (approve, reject, flag)",
      "System settings and configuration panel",
    ],
  },
  {
    label: "File Uploads",
    features: [
      "File upload with drag-and-drop support",
      "Image preview and cropping before upload",
      "Progress bar during upload",
      "Cloud storage integration (S3 or Supabase Storage)",
      "File type and size validation",
    ],
  },
  {
    label: "Search",
    features: [
      "Full-text search across all content",
      "Search results page with highlighting and pagination",
      "Filter and sort options for refining results",
      "Search suggestions and autocomplete as you type",
    ],
  },
  {
    label: "Social",
    features: [
      "User-to-user following and follower lists",
      "Activity feed showing actions from followed users",
      "Like and comment on posts or items",
      "Share content via link or to social media",
      "User mentions and tagging with @username",
    ],
  },
]

// ---------------------------------------------------------------------------
// 5. COMPATIBILITY_HINTS -- context-aware warnings and suggestions
// ---------------------------------------------------------------------------

export interface CompatibilityHint {
  type: "warning" | "suggestion"
  message: string
}

export function getCompatibilityHints(
  specs: Partial<ProjectSpecs>
): CompatibilityHint[] {
  const hints: CompatibilityHint[] = []

  // --- MongoDB + Prisma: suggest Mongoose instead ---
  if (specs.database === "MongoDB" && specs.orm === "Prisma") {
    hints.push({
      type: "suggestion",
      message:
        "Prisma does support MongoDB, but Mongoose is the more natural and battle-tested choice for MongoDB projects. It has better MongoDB-specific features and more community examples to learn from.",
    })
  }

  // --- Django + TypeScript mismatch ---
  if (specs.framework === "Django" && specs.language === "TypeScript") {
    hints.push({
      type: "warning",
      message:
        "Django is a Python framework, so it uses Python -- not TypeScript. Switch the language to Python, or pick a TypeScript-compatible framework like Next.js or Express.js.",
    })
  }

  // --- Flask + TypeScript mismatch ---
  if (specs.framework === "Flask" && specs.language === "TypeScript") {
    hints.push({
      type: "warning",
      message:
        "Flask is a Python framework and needs Python as the language. If you want to use TypeScript, consider Express.js or Fastify instead.",
    })
  }

  // --- Rails + TypeScript mismatch ---
  if (specs.framework === "Rails" && specs.language === "TypeScript") {
    hints.push({
      type: "warning",
      message:
        "Ruby on Rails uses Ruby, not TypeScript. Switch the language to Ruby, or choose a TypeScript-friendly framework like Next.js.",
    })
  }

  // --- Laravel + TypeScript mismatch ---
  if (specs.framework === "Laravel" && specs.language === "TypeScript") {
    hints.push({
      type: "warning",
      message:
        "Laravel is a PHP framework. Change the language to PHP, or pick a TypeScript framework like Next.js or Express.js.",
    })
  }

  // --- Django + JavaScript mismatch ---
  if (specs.framework === "Django" && specs.language === "JavaScript") {
    hints.push({
      type: "warning",
      message:
        "Django is a Python framework and uses Python, not JavaScript. Switch the language to Python, or pick a JavaScript framework like Express.js or Next.js.",
    })
  }

  // --- Flask + JavaScript mismatch ---
  if (specs.framework === "Flask" && specs.language === "JavaScript") {
    hints.push({
      type: "warning",
      message:
        "Flask is a Python framework and uses Python, not JavaScript. If you want to use JavaScript, consider Express.js or Fastify instead.",
    })
  }

  // --- Rails + JavaScript mismatch ---
  if (specs.framework === "Rails" && specs.language === "JavaScript") {
    hints.push({
      type: "warning",
      message:
        "Ruby on Rails uses Ruby, not JavaScript. Switch the language to Ruby, or choose a JavaScript framework like Express.js or Next.js.",
    })
  }

  // --- Laravel + JavaScript mismatch ---
  if (specs.framework === "Laravel" && specs.language === "JavaScript") {
    hints.push({
      type: "warning",
      message:
        "Laravel is a PHP framework and uses PHP, not JavaScript. Change the language to PHP, or pick a JavaScript framework like Express.js or Next.js.",
    })
  }

  // --- Supabase DB -> suggest Supabase Auth ---
  if (
    specs.database === "Supabase" &&
    specs.auth &&
    specs.auth !== "Supabase Auth" &&
    specs.auth !== "None" &&
    specs.auth !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "Since you are using Supabase for your database, consider using Supabase Auth too. They integrate seamlessly -- row-level security policies can reference the logged-in user directly, so you get secure data access with minimal extra code.",
    })
  }

  // --- Firebase DB -> suggest Firebase Auth ---
  if (
    specs.database === "Firebase" &&
    specs.auth &&
    specs.auth !== "Firebase Auth" &&
    specs.auth !== "None" &&
    specs.auth !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "Since you are using Firebase for your database, Firebase Auth is a natural fit. They work together out of the box, and Firestore security rules can reference the authenticated user directly.",
    })
  }

  // --- Next.js -> suggest Vercel ---
  if (
    (specs.framework === "Next.js 14 (App Router)" ||
      specs.framework === "Next.js 14 (Pages Router)") &&
    specs.hosting &&
    specs.hosting !== "Vercel" &&
    specs.hosting !== "Undecided" &&
    specs.hosting !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "Vercel is built by the same team that makes Next.js, so it is the easiest and most optimized place to deploy a Next.js app. One-click deploys, automatic preview URLs, and zero configuration needed.",
    })
  }

  // --- Astro -> suggest Netlify or Vercel ---
  if (
    specs.framework === "Astro" &&
    specs.hosting &&
    specs.hosting !== "Netlify" &&
    specs.hosting !== "Vercel" &&
    specs.hosting !== "Undecided" &&
    specs.hosting !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "Astro works great on Netlify or Vercel. Both offer free hosting for static sites with automatic deploys from GitHub.",
    })
  }

  // --- No database but features suggest data storage ---
  if (
    specs.database === "None" &&
    specs.features &&
    specs.features.length > 0
  ) {
    const featureText = specs.features.join(" ").toLowerCase()
    const dataKeywords = [
      "user",
      "account",
      "login",
      "sign up",
      "register",
      "profile",
      "save",
      "store",
      "upload",
      "dashboard",
      "admin",
      "order",
      "cart",
      "payment",
      "subscription",
      "post",
      "comment",
      "message",
      "notification",
      "bookmark",
      "favorite",
      "history",
    ]
    const matchedKeywords = dataKeywords.filter((kw) =>
      featureText.includes(kw)
    )
    if (matchedKeywords.length > 0) {
      hints.push({
        type: "warning",
        message:
          "You selected \"None\" for the database, but some of your features (like " +
          matchedKeywords.slice(0, 3).join(", ") +
          ") typically require storing data. Consider adding a database -- Supabase is a great easy option with a free tier.",
      })
    }
  }

  // --- No auth but features suggest user accounts ---
  if (
    (specs.auth === "None" || specs.auth === "") &&
    specs.features &&
    specs.features.length > 0
  ) {
    const featureText = specs.features.join(" ").toLowerCase()
    const authKeywords = [
      "user",
      "account",
      "login",
      "sign up",
      "register",
      "profile",
      "admin",
      "role",
      "permission",
      "dashboard",
    ]
    const matchedKeywords = authKeywords.filter((kw) =>
      featureText.includes(kw)
    )
    if (matchedKeywords.length > 0) {
      hints.push({
        type: "warning",
        message:
          "Your features mention " +
          matchedKeywords.slice(0, 3).join(", ") +
          ", which usually require user authentication. Consider adding an auth solution so users can create accounts and log in.",
      })
    }
  }

  // --- Python framework + JS/TS ORM ---
  if (
    (specs.framework === "Django" || specs.framework === "Flask") &&
    specs.orm &&
    ["Prisma", "Drizzle", "TypeORM", "Sequelize", "Knex"].includes(specs.orm)
  ) {
    hints.push({
      type: "warning",
      message:
        "You picked a Python framework but a JavaScript/TypeScript ORM (" +
        specs.orm +
        "). For Python projects, use SQLAlchemy instead, or if you are using Django, its built-in ORM works great (just select \"None\" here).",
    })
  }

  // --- Rails + JS/TS ORM ---
  if (
    specs.framework === "Rails" &&
    specs.orm &&
    ["Prisma", "Drizzle", "TypeORM", "Sequelize", "Knex"].includes(specs.orm)
  ) {
    hints.push({
      type: "warning",
      message:
        "Rails has its own excellent built-in ORM called Active Record. You do not need a separate ORM -- just select \"None\" and Rails will handle database access for you.",
    })
  }

  // --- Laravel + JS/TS ORM ---
  if (
    specs.framework === "Laravel" &&
    specs.orm &&
    ["Prisma", "Drizzle", "TypeORM", "Sequelize", "Knex"].includes(specs.orm)
  ) {
    hints.push({
      type: "warning",
      message:
        "Laravel comes with Eloquent, a powerful built-in ORM. You do not need a separate ORM -- select \"None\" and let Laravel handle it.",
    })
  }

  // --- Mongoose without MongoDB ---
  if (
    specs.orm === "Mongoose" &&
    specs.database &&
    specs.database !== "MongoDB" &&
    specs.database !== ""
  ) {
    hints.push({
      type: "warning",
      message:
        "Mongoose is specifically designed for MongoDB. Since you picked " +
        specs.database +
        " as your database, consider using Prisma or Drizzle instead.",
    })
  }

  // --- SQLAlchemy without Python ---
  if (
    specs.orm === "SQLAlchemy" &&
    specs.language &&
    specs.language !== "Python" &&
    specs.language !== ""
  ) {
    hints.push({
      type: "warning",
      message:
        "SQLAlchemy is a Python library. Since you are using " +
        specs.language +
        ", consider Prisma or Drizzle for TypeScript/JavaScript, or the appropriate ORM for your chosen language.",
    })
  }

  // --- SvelteKit -> suggest Vercel or Netlify ---
  if (
    specs.framework === "SvelteKit" &&
    specs.hosting &&
    specs.hosting !== "Vercel" &&
    specs.hosting !== "Netlify" &&
    specs.hosting !== "Undecided" &&
    specs.hosting !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "SvelteKit has first-class adapters for both Vercel and Netlify. Either one makes deployment simple and free for small projects.",
    })
  }

  // --- Nuxt -> suggest Netlify or Vercel ---
  if (
    specs.framework === "Nuxt 3" &&
    specs.hosting &&
    specs.hosting !== "Vercel" &&
    specs.hosting !== "Netlify" &&
    specs.hosting !== "Undecided" &&
    specs.hosting !== ""
  ) {
    hints.push({
      type: "suggestion",
      message:
        "Nuxt 3 deploys easily to both Vercel and Netlify with built-in presets. Either one is a good choice for a hassle-free deployment.",
    })
  }

  // --- NextAuth with non-Next.js framework ---
  if (
    specs.auth === "NextAuth / Auth.js" &&
    specs.framework &&
    specs.framework !== "Next.js 14 (App Router)" &&
    specs.framework !== "Next.js 14 (Pages Router)" &&
    specs.framework !== ""
  ) {
    hints.push({
      type: "warning",
      message:
        "NextAuth (Auth.js) is designed specifically for Next.js. Since you are using " +
        specs.framework +
        ", consider a different auth solution like Clerk, Supabase Auth, or Passport.js.",
    })
  }

  // --- No styling with a frontend framework ---
  if (
    specs.styling === "None (API only)" &&
    specs.framework &&
    [
      "Next.js 14 (App Router)",
      "Next.js 14 (Pages Router)",
      "React + Vite",
      "Remix",
      "Astro",
      "SvelteKit",
      "Nuxt 3",
    ].includes(specs.framework)
  ) {
    hints.push({
      type: "suggestion",
      message:
        "You picked a frontend framework (" +
        specs.framework +
        ") but \"None (API only)\" for styling. If your project has a user interface, consider adding a styling option like Tailwind CSS. If it is truly API-only, Express.js or Fastify might be a better framework choice.",
    })
  }

  return hints
}

export type IconName =
  | "code"
  | "target"
  | "chat"
  | "video"
  | "palette"
  | "search"
  | "database"
  | "cart"
  | "cloud";

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  description: string;
  icon: IconName;
  items: string[];
  outcomes: string[];
};

export const company = {
  name: "Erstian Technologies",
  shortName: "Erstian",
  email: "hello@erstiantech.com",
  tagline: "Digital growth, engineered.",
  description:
    "Erstian Technologies is a digital services company that builds websites, performance campaigns, automation and business software for growing companies.",
  location: "Remote-first · Serving clients across India and beyond",
  hours: "Monday – Saturday · 10:00 – 19:00 IST",
};

export const navigation = [
  { label: "Services", href: "/services" },
  { label: "Work", href: "/portfolio" },
  { label: "Free audit", href: "/free-audit" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const stats = [
  { value: "09", label: "Service verticals", note: "One partner for build, growth and systems" },
  { value: "48h", label: "Audit reply window", note: "Reviewed by a real strategist, not a bot" },
  { value: "₹0", label: "Cost of the audit", note: "Free business audit, no obligation" },
  { value: "1:1", label: "Senior-led delivery", note: "Direct access to the people doing the work" },
];

export const services: Service[] = [
  {
    slug: "website-development",
    index: "01",
    title: "Websites & Web Development",
    short: "Fast, conversion-focused websites and custom web applications.",
    description:
      "Your website is the first sales conversation most customers will ever have with you. We design and engineer sites that load fast, look credible and turn visitors into enquiries, bookings and orders.",
    icon: "code",
    items: [
      "Business Website Development",
      "E-commerce Website Development",
      "Custom Website Design",
      "Landing Page Development",
      "Portfolio Website",
      "Real Estate Website",
      "Restaurant & Hotel Website",
      "Hospital & Clinic Website",
      "School & College Website",
      "Booking & Appointment Website",
      "Custom Web Application",
      "SaaS Platform Development",
      "Website Redesign",
      "Website Speed Optimization",
      "Website Maintenance & Security",
    ],
    outcomes: [
      "Mobile-first layouts built around one clear action",
      "Core Web Vitals tuned for speed on real Indian networks",
      "Editable content, analytics and lead tracking from day one",
    ],
  },
  {
    slug: "performance-marketing",
    index: "02",
    title: "Performance Marketing",
    short: "Paid campaigns that are judged on leads and revenue, not impressions.",
    description:
      "We run Google, Meta and YouTube campaigns with one obsession: profitable outcomes. Every campaign is wired to conversion tracking, so you always know the cost of a lead, a booking or a sale.",
    icon: "target",
    items: [
      "Google Search Ads",
      "Google Display Ads",
      "YouTube Advertising",
      "Facebook Ads",
      "Instagram Ads",
      "Meta Lead Generation Campaigns",
      "E-commerce Performance Ads",
      "Retargeting Campaigns",
      "Conversion Rate Optimization (CRO)",
      "Landing Page Optimization",
      "Campaign Management",
      "Marketing Analytics & Reporting",
      "Lead Generation Campaigns",
      "PPC Management",
    ],
    outcomes: [
      "Full-funnel tracking with offline conversion import",
      "Weekly optimisation sprints instead of monthly set-and-forget",
      "Plain-language reporting: spend, leads, cost per outcome",
    ],
  },
  {
    slug: "whatsapp-automation",
    index: "03",
    title: "WhatsApp & Business Automation",
    short: "Automated conversations, follow-ups and reminders on WhatsApp.",
    description:
      "Most businesses lose deals in the gap between an enquiry and a reply. We put your WhatsApp on autopilot with the official Business API — instant answers, lead follow-ups, booking confirmations, payment reminders and CRM sync.",
    icon: "chat",
    items: [
      "WhatsApp Business API Integration",
      "WhatsApp Chatbot Development",
      "Automated Customer Replies",
      "Automated Lead Follow-ups",
      "WhatsApp Bulk Messaging (opt-in compliant)",
      "Appointment Booking Automation",
      "Order Confirmation Automation",
      "Payment Reminder Automation",
      "Customer Support Automation",
      "CRM Integration",
      "WhatsApp Marketing Automation",
      "Customer Notification Systems",
      "Sales Pipeline Automation",
    ],
    outcomes: [
      "Official API setup with verified business profile",
      "Opt-in compliant messaging flows and templates",
      "Human handover the moment a conversation gets serious",
    ],
  },
  {
    slug: "video-creative",
    index: "04",
    title: "Video & Creative Production",
    short: "Ad films, reels and motion graphics built to stop the scroll.",
    description:
      "Creative is the biggest lever in paid media. We produce product ads, reels, explainers and brand films that are written for the platform they will run on — and cut in vertical-first format.",
    icon: "video",
    items: [
      "Product Advertisement Videos",
      "Corporate Videos",
      "Instagram Reels Creation",
      "YouTube Video Ads",
      "Facebook Video Ads",
      "Animated Explainer Videos",
      "2D & 3D Animation",
      "Motion Graphics",
      "AI Generated Promotional Videos",
      "Video Editing",
      "Product Photography",
      "Brand Storytelling Videos",
      "Customer Testimonial Videos",
    ],
    outcomes: [
      "Hook-first scripting with platform-native pacing",
      "Creative variants for testing, not one hero film",
      "Assets delivered in every aspect ratio you need",
    ],
  },
  {
    slug: "branding-design",
    index: "05",
    title: "Branding & Graphic Design",
    short: "Identity systems that make a small business look established.",
    description:
      "From a logo to a full brand system, we create a consistent visual language across print, packaging, social and web — so every touchpoint feels like the same confident company.",
    icon: "palette",
    items: [
      "Logo Design",
      "Brand Identity Development",
      "Business Card Design",
      "Brochure Design",
      "Flyer Design",
      "Social Media Post Design",
      "Social Media Creative Design",
      "Banner & Poster Design",
      "Packaging Design",
      "Presentation Design",
      "Brand Guidelines",
    ],
    outcomes: [
      "Logo suite, colour, type and usage rules in one guide",
      "Templates your team can actually keep using",
      "Print-ready and digital-ready export packs",
    ],
  },
  {
    slug: "seo-presence",
    index: "06",
    title: "SEO & Online Presence",
    short: "Be found by people already searching for what you sell.",
    description:
      "SEO is compounding distribution. We fix the technical foundation, build content around real search demand and make sure your Google Business Profile wins the local map pack.",
    icon: "search",
    items: [
      "Search Engine Optimization (SEO)",
      "Local SEO",
      "Technical SEO",
      "On-Page SEO",
      "Off-Page SEO",
      "Google Business Profile Optimization",
      "Google Maps Optimization",
      "Keyword Research",
      "Content Optimization",
      "Website Audit",
      "Online Reputation Management",
      "Review Management",
    ],
    outcomes: [
      "Crawl, speed and schema fixes shipped early",
      "Keyword map tied to service pages and intent",
      "Local visibility for every location you serve",
    ],
  },
  {
    slug: "crm-erp",
    index: "07",
    title: "CRM, ERP & Business Software",
    short: "Custom software that replaces spreadsheets and lost follow-ups.",
    description:
      "When off-the-shelf tools stop fitting, we build the system around your process: customers, inventory, billing, staff and reporting — connected, permissioned and accessible from anywhere.",
    icon: "database",
    items: [
      "Custom CRM Development",
      "ERP Software Development",
      "Inventory Management System",
      "Billing & Invoice Software",
      "Employee Management System",
      "HR Management System",
      "School Management Software",
      "Hospital Management System",
      "Customer Portal Development",
      "Vendor Management System",
      "Project Management Software",
      "Sales Management Dashboard",
      "Reporting & Analytics Dashboard",
    ],
    outcomes: [
      "Workflows mapped before a single line of code",
      "Role-based access for owners, managers and staff",
      "Dashboards that answer the questions you actually ask",
    ],
  },
  {
    slug: "ecommerce",
    index: "08",
    title: "E-commerce & Online Business",
    short: "Stores that are easy to buy from and easy to run.",
    description:
      "We build and optimise online stores on Shopify, WooCommerce and custom stacks — from catalogue and payments to shipping, subscriptions and marketplace sync, with the checkout friction removed.",
    icon: "cart",
    items: [
      "Online Store Development",
      "Shopify Store Setup",
      "WooCommerce Development",
      "Product Listing Management",
      "Payment Gateway Integration",
      "Shopping Cart Optimization",
      "Order Management System",
      "Shipping Integration",
      "Subscription-Based Store",
      "E-commerce Automation",
      "Marketplace Integration",
    ],
    outcomes: [
      "Checkout tested on low-bandwidth mobile",
      "Payment, shipping and GST-ready invoicing",
      "Automated order updates on WhatsApp and email",
    ],
  },
  {
    slug: "cloud-hosting",
    index: "09",
    title: "Cloud, Hosting & Technical",
    short: "The infrastructure, security and integrations behind the work.",
    description:
      "Reliable hosting, secure servers and clean integrations. We set up domains, SSL, backups and monitoring, then stay on call so your business keeps running when traffic spikes.",
    icon: "cloud",
    items: [
      "Domain Registration Assistance",
      "Web Hosting Setup",
      "Cloud Hosting",
      "VPS & Server Setup",
      "Database Setup (PostgreSQL, MySQL)",
      "Website Backup Solutions",
      "SSL Certificate Setup",
      "Website Migration",
      "Server Monitoring",
      "Website Security",
      "API Development & Integration",
      "Third-Party Software Integration",
    ],
    outcomes: [
      "Automated backups with tested restore steps",
      "Uptime and error monitoring with alerts",
      "Hardened servers, SSL and least-privilege access",
    ],
  },
];

export const industries = [
  "Healthcare & clinics",
  "Real estate",
  "Restaurants & hotels",
  "Schools & colleges",
  "D2C & retail",
  "Manufacturing",
  "Professional services",
  "SaaS & startups",
];

export const processSteps = [
  {
    step: "01",
    title: "Audit & discover",
    body: "We study your website, funnel and follow-up gaps, then agree on the one or two moves that will matter most.",
  },
  {
    step: "02",
    title: "Plan & scope",
    body: "You get a written scope with timelines, deliverables and success metrics — no vague retainers.",
  },
  {
    step: "03",
    title: "Build & launch",
    body: "Design, development, tracking and automations ship together, so the launch is measurable from day one.",
  },
  {
    step: "04",
    title: "Optimise & scale",
    body: "We review performance against real numbers every month and reinvest budget where it is working.",
  },
];

export const auditChecklist = [
  "Website clarity, speed and mobile experience",
  "Search visibility and Google Business presence",
  "Paid campaign and landing page readiness",
  "Lead capture, WhatsApp and follow-up flow",
  "Trust signals, reviews and conversion blockers",
  "Three prioritised growth ideas for the next 90 days",
];

export const faqs = [
  {
    q: "Is the business audit really free?",
    a: "Yes. The team reviews your live website and online presence, notes what is holding growth back, and sends prioritised improvement ideas. There is no charge and no obligation to buy anything.",
  },
  {
    q: "How long does a reply take?",
    a: "We aim to reply within 48 hours. Audits are reviewed manually by a strategist, so if your request lands on a weekend or holiday it may take a little longer — you will always get a response.",
  },
  {
    q: "What do I need to share?",
    a: "Your business name, the website or online profile link, the city you serve, and what you want more of — enquiries, bookings, orders or walk-ins. The more context you give, the sharper the audit.",
  },
  {
    q: "Do I need an existing website?",
    a: "No. If you are planning a launch, we will review whatever exists — an Instagram page, a Google listing or a competitor set — and tell you what to build first.",
  },
  {
    q: "Will I get a sales call?",
    a: "Only if you want one. The audit report is delivered by email. If you would like help implementing the recommendations, you can book a call from your dashboard.",
  },
];

export const fallbackTestimonials = [
  {
    id: "sample-1",
    authorName: "Priya Menon",
    role: "Founder",
    company: "D2C skincare brand",
    quote:
      "Erstian rebuilt our store and set up WhatsApp follow-ups. Enquiries stopped going cold, and we finally know which ads actually sell.",
    rating: 5,
  },
  {
    id: "sample-2",
    authorName: "Arjun Rao",
    role: "Director",
    company: "Multi-speciality clinic",
    quote:
      "The appointment booking flow and reminder messages cut no-shows dramatically. The team understood our front-desk process before writing any code.",
    rating: 5,
  },
  {
    id: "sample-3",
    authorName: "Sana Kapoor",
    role: "Marketing lead",
    company: "Real estate group",
    quote:
      "Clear reporting, honest recommendations and a website that finally loads fast on mobile. Working with them feels like having an in-house digital team.",
    rating: 5,
  },
];

export const fallbackProjects = [
  {
    id: "sample-project-1",
    title: "Clinic booking platform",
    slug: "clinic-booking-platform",
    category: "Website + Automation",
    summary:
      "A multi-branch clinic website with doctor availability, online appointment booking and WhatsApp reminders for every confirmed slot.",
    tags: "Next.js, Booking, WhatsApp API",
    accent: "violet",
    year: "2024",
    featured: true,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
  {
    id: "sample-project-2",
    title: "D2C storefront rebuild",
    slug: "d2c-storefront-rebuild",
    category: "E-commerce",
    summary:
      "A Shopify storefront rebuilt around a two-step checkout, bundle offers and abandoned-cart recovery on WhatsApp and email.",
    tags: "Shopify, CRO, Meta Ads",
    accent: "lime",
    year: "2024",
    featured: true,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
  {
    id: "sample-project-3",
    title: "Real estate lead engine",
    slug: "real-estate-lead-engine",
    category: "Performance Marketing",
    summary:
      "Project microsites with locality landing pages, Google and Meta lead campaigns, and an automated follow-up sequence for site visits.",
    tags: "Landing pages, Google Ads, CRM",
    accent: "sky",
    year: "2023",
    featured: false,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
  {
    id: "sample-project-4",
    title: "School ERP dashboard",
    slug: "school-erp-dashboard",
    category: "Custom Software",
    summary:
      "A role-based ERP for admissions, fees, attendance and parent communication, replacing eleven spreadsheets across four departments.",
    tags: "Custom ERP, PostgreSQL, Dashboards",
    accent: "amber",
    year: "2024",
    featured: false,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
  {
    id: "sample-project-5",
    title: "Restaurant discovery site",
    slug: "restaurant-discovery-site",
    category: "Brand + Website",
    summary:
      "A menu-first restaurant website with table reservations, Google Maps visibility and a reels-driven launch campaign.",
    tags: "Branding, Website, Local SEO",
    accent: "rose",
    year: "2023",
    featured: false,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
  {
    id: "sample-project-6",
    title: "SaaS marketing site",
    slug: "saas-marketing-site",
    category: "Website + Content",
    summary:
      "An explainer-led marketing site for a B2B SaaS product, with interactive product tours and a self-serve trial signup funnel.",
    tags: "SaaS, Product marketing, SEO",
    accent: "mint",
    year: "2025",
    featured: false,
    published: true,
    coverImage: null,
    description: null,
    url: null,
  },
];

const blogBody1 = `Most business owners do not have a traffic problem. They have a clarity problem.

A visitor lands on the site, sees a stock photo, a headline like "Welcome to our company", and five buttons competing for attention. Nothing tells them what you do, who it is for, or what happens if they get in touch. They leave in eight seconds.

## Say the one thing

Your homepage should answer three questions above the fold: what do you sell, who is it for, and what is the next step? Write it the way a customer would say it out loud. "Same-day physiotherapy in Indiranagar, book online in 30 seconds" beats any tagline.

## Remove one decision

Every extra link, form field and option is a place where a visitor can hesitate. A single primary call to action, repeated down the page, consistently outperforms a menu of choices. Keep "Book a visit" as the action, and move everything else into the footer.

## Make proof easy to find

One clear case study, a Google review score and a real photograph of your team will do more than a page of adjectives. Put proof close to the action, not buried on an About page.

## Measure the next step

If you cannot see how many people started a form and how many finished it, you are guessing. Install one analytics tool, define two events — enquiry intent and enquiry submitted — and review them weekly. That single habit will tell you more about your website than any redesign trend.

Start with these four fixes before you spend another rupee on ads. A page that converts is cheaper than traffic. `;

const blogBody2 = `A lead that waits six hours for a reply is usually a lead that has already messaged two competitors.

WhatsApp is where most Indian buyers actually want to talk. The good news: the official Business API lets you reply instantly, follow up automatically and keep a single record of every conversation.

## Start with the three messages that matter

You do not need a complicated chatbot on day one. Automate the highest-volume, lowest-judgement messages: enquiry acknowledgement, appointment confirmation, and payment or visit reminders. Each one removes a manual task from your team.

## Use opt-in properly

Only message people who have contacted you or clearly opted in. Keep templates approved, include an opt-out option, and never buy contact lists. Compliance protects your number from being blocked — and protects your brand.

## Build a clean handover

Automation should qualify, not interrogate. Collect the two or three details your team needs, log them in the CRM, then hand the conversation to a human when intent is high. Set a visible response-time expectation so the customer knows someone is reading.

## Close the loop

The real value is in the follow-up after the first conversation. A sequence that checks in on day two and day seven — with a useful message, not a "just following up" — is often the difference between a booked client and a lost enquiry.

Set it up once, review the flows monthly, and treat every automated message like a member of your front desk: brief, polite and genuinely helpful.`;

const blogBody3 = `SEO gets a bad reputation because most reports are full of impressions and rankings instead of customers.

The version of SEO that pays for itself is narrower and much more useful: it connects the pages you already rely on to the searches that are already happening, and it fixes what stops those visitors from converting.

## Fix the foundation first

No amount of content rescues a site Google cannot crawl. Before writing anything new, fix broken links, thin pages, duplicate titles, slow mobile templates and missing schema markup. These are unglamorous changes with a very reliable payoff.

## Build around intent, not keywords

A page for "best dental clinic near me" and a page for "root canal cost" are not the same job. Map one page to one decision: a local service page for people ready to act, and a guide for people still researching. Give both a clear next step.

## Win the map pack

For local businesses, the Google Business Profile is often the highest-intent surface you own. Keep categories accurate, hours current, photos fresh, and reviews answered within a day. Two new reviews a month beat a one-off burst of twenty.

## Let content compound

Publish fewer, better pages. One detailed page with genuine answers — pricing ranges, process, timelines, photos, FAQs — will outrank five shallow posts. Update it quarterly rather than starting from zero each time.

Track calls and form fills, not just rankings. If a page ranks but never produces an enquiry, its intent or its call to action is wrong. That is the audit worth doing first.`;

export const fallbackPosts = [
  {
    id: "sample-post-1",
    title: "The 4 changes that make a small business website convert",
    slug: "make-a-small-business-website-convert",
    excerpt:
      "Before you spend more on ads, fix the page they land on. Four practical changes that reliably increase enquiries.",
    category: "Website",
    author: "Erstian Team",
    readMinutes: 5,
    published: true,
    publishedAt: "2025-01-12",
    content: blogBody1,
    coverImage: null,
  },
  {
    id: "sample-post-2",
    title: "WhatsApp automation that actually earns money",
    slug: "whatsapp-automation-that-earns-money",
    excerpt:
      "Where automation helps, where it hurts, and the three flows most businesses should set up first.",
    category: "Automation",
    author: "Erstian Team",
    readMinutes: 6,
    published: true,
    publishedAt: "2025-02-03",
    content: blogBody2,
    coverImage: null,
  },
  {
    id: "sample-post-3",
    title: "Local SEO in 2025: what still works for real businesses",
    slug: "local-seo-what-still-works",
    excerpt:
      "A practical, no-jargon look at the SEO work that still moves the needle for clinics, stores and service businesses.",
    category: "SEO",
    author: "Erstian Team",
    readMinutes: 7,
    published: true,
    publishedAt: "2025-03-18",
    content: blogBody3,
    coverImage: null,
  },
];

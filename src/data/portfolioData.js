export const navLinks = [
  { id: "skills", title: "Skills" },
  { id: "experience", title: "Experience" },
  { id: "projects", title: "Projects" },
  { id: "contact", title: "Contact" },
];

export const heroChips = [
  { label: "React 19", accent: true },
  { label: "Next.js 15", accent: true },
  { label: "Web3", accent: true },
  { label: "TypeScript" },
  { label: "Tailwind CSS" },
  { label: "SSR / ISR" },
  { label: "PWA" },
  { label: "HLS.js" },
];

export const stats = [
  { value: "3+", label: "Years exp." },
  { value: "7+", label: "Projects shipped" },
  { value: "3+", label: "Domains covered" },
];

export const skillCategories = [
  {
    label: "Languages",
    items: ["TypeScript", "JavaScript ES2022+", "HTML5", "CSS3"],
  },
  {
    label: "Frameworks",
    items: ["React 19", "Next.js 15", "Vite", "React Router v7"],
  },
  {
    label: "UI Libraries",
    items: ["Tailwind CSS v4", "shadcn/ui", "Ant Design", "Framer Motion"],
  },
  {
    label: "State & Data",
    items: ["Zustand", "TanStack Query", "React Hook Form", "Zod", "Axios"],
  },
  {
    label: "Streaming & PWA",
    items: ["HLS.js", "Video.js", "AWS S3 SDK", "Workbox", "vite-plugin-pwa"],
  },
  {
    label: "i18n & Tools",
    items: ["i18next", "Socket.io-client", "WalletConnect", "Git", "ESLint"],
  },
];

export const techOrbit = [
  {
    name: "React",
    color: "#61dafb",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    color: "#ffffff",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    color: "#3178c6",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Three.js",
    color: "#c084fc",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg",
  },
  {
    name: "Tailwind",
    color: "#38bdf8",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Node.js",
    color: "#339933",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
];

export const web3Tags = [
  "WalletConnect v2",
  "Socket.io real-time",
  "Island Architecture",
  "PWA offline-first",
  "Zustand global state",
  "Component-based systems",
];

export const experienceItems = [
  {
    date: "2024 – Present",
    company: "Dotone Holding",
    type: "Full-time · Tehran",
    role: "Junior Frontend Developer",
    bullets: [
      "Building 3 simultaneous production projects within the Dotone ecosystem",
      "LahzehTV: Next.js 15 SSR/ISR with Turbopack, HLS.js + Video.js adaptive streaming, AWS S3 pre-signed URLs for secure video playback",
      "Implemented next-intl internationalisation, skeleton loaders, infinite scroll, OTP auth, and Nivo/Recharts dashboards",
      "Corporate site: TanStack Query, Framer Motion animations, reCAPTCHA, Jalali date picker",
      "Taxi PWA: Workbox offline caching, Zustand global state, i18next RTL support, Jalali & Hijri calendar",
    ],
  },
  {
    date: "2024",
    company: "MyDot Platform",
    type: "Contract · Remote",
    role: "Frontend Developer",
    bullets: [
      "Built a Twitter-like social platform with real-time feed via Socket.io-client and WalletConnect Web3 login",
      "Infinite scroll, emoji picker, @mention tagging, OTP login, react-virtuoso virtual list, PWA with Workbox offline caching",
    ],
  },
  {
    date: "2023 – 2024",
    company: "Beh.Land",
    type: "Internship · Tehran",
    role: "Frontend Developer (Intern)",
    bullets: [
      "Built the entire company website independently as first professional role",
      "React, TypeScript, shadcn/ui, Tailwind CSS, TanStack Query — demonstrated ownership under challenging conditions",
    ],
  },
  {
    date: "2021 – Present",
    company: "Riiha.ir",
    type: "Part-time · Remote",
    role: "Copywriter & Content Creator",
    bullets: [
      "3+ years producing creative, SEO-driven Persian content for a major online platform",
      "Honed storytelling, audience engagement, and digital communication skills — a key advantage for UI microcopy",
    ],
  },
];

export const projects = [
  {
    id: "01",
    category: "Streaming Platform",
    name: "LahzehTV",
    description:
      "Full-featured movie & series streaming site — adaptive HLS video, subscriptions, admin dashboards, multi-language support, and analytics.",
    stack: ["Next.js 15", "HLS.js", "Video.js", "TanStack Query", "AWS S3", "next-intl", "Recharts"],
    link: "https://lahzeh.tv",
    featured: true,
  },
  {
    id: "02",
    category: "Web3 Social",
    name: "MyDot Platform",
    description:
      "Twitter-like social platform with real-time messaging, infinite scroll, Web3 wallet login, emoji reactions, and PWA offline caching.",
    stack: ["React 19", "Socket.io", "WalletConnect", "Ant Design", "Zustand", "Workbox"],
    link: "https://www.mydot.one/auth",
    featured: true,
  },
  {
    id: "03",
    category: "Corporate",
    name: "Dotone Holding",
    description:
      "Enterprise corporate website with animated sections, multi-step forms, reCAPTCHA, and Jalali date support.",
    stack: ["React 19", "Framer Motion", "TanStack Query", "Zod"],
    link: "https://dotone.ir",
  },
  {
    id: "04",
    category: "PWA",
    name: "Taxi Passenger App",
    description:
      "Mobile-first taxi booking PWA — offline caching, RTL i18n, Jalali/Hijri dates, Zustand global state, and Swiper carousels.",
    stack: ["React 19", "Vite", "Workbox", "i18next", "Zustand"],
  },
  {
    id: "05",
    category: "Fintech",
    name: "Dotone Gold",
    description:
      "Gold buying/selling trading platform with data tables, multi-step forms, OTP auth, and Jalali date pickers.",
    stack: ["React 19", "TanStack Table", "React Hook Form", "Zod"],
  },
  {
    id: "06",
    category: "Personal Site",
    name: "Babak Zanjani",
    description:
      "High-profile personal website — Next.js SSR for SEO, Framer Motion animations, fully responsive polished design.",
    stack: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    link: "https://www.babakzanjani.com/",
  },
];

export const contacts = [
  { label: "Email", value: "sananafari2003@gmail.com", href: "mailto:sananafari2003@gmail.com" },
  { label: "GitHub", value: "github.com/sananafarii", href: "https://github.com/sananafarii" },
  { label: "LinkedIn", value: "sana-nafari", href: "https://linkedin.com/in/sana-nafari-b39436240" },
  { label: "Location", value: "Tehran, Iran · Open to Remote Worldwide", muted: true },
];
// src/data/homeData.ts

type IconKey = "academic-cap" | "briefcase" | "globe" | "code-bracket" | "device-mobile" | "book-open";

export const stats: {
  title: string;
  value: string;
  icon: IconKey;
}[] = [
  {
    title: "Active Scholarships",
    value: "1,200+",
    icon: "academic-cap",
  },
  {
    title: "Coding Courses",
    value: "300+",
    icon: "code-bracket",
  },
  {
    title: "Digital Skills Learners",
    value: "5,000+",
    icon: "device-mobile",
  },
  {
    title: "Learning Resources",
    value: "800+",
    icon: "book-open",
  },
  {
    title: "Job Opportunities",
    value: "3,500+",
    icon: "briefcase",
  },
];

export const featuredCategories: {
  title: string;
  description: string;
  icon: IconKey;
}[] = [
  {
    title: "Scholarships",
    description: "Find funding opportunities tailored to your academic goals.",
    icon: "academic-cap",
  },
  {
    title: "Coding Courses",
    description: "Master programming skills with curated tutorials.",
    icon: "code-bracket",
  },
  {
    title: "Digital Skills",
    description: "Learn tools and platforms for the digital economy.",
    icon: "DeviceTabletIcon",
  },
  {
    title: "Learning Resources",
    description: "Explore guides, platforms, and tools to support your growth.",
    icon: "book-open",
  },
  {
    title: "Job Opportunities",
    description: "Discover internships and career-building roles.",
    icon: "briefcase",
  },
];
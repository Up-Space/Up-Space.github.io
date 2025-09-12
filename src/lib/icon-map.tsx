// src/lib/icon-map.ts
import {
  AcademicCapIcon,
  BookOpenIcon,
  ComputerDesktopIcon,
  LightBulbIcon,
  SparklesIcon,
  CurrencyDollarIcon,
  BriefcaseIcon,
  UserGroupIcon,
  GlobeAltIcon,
  HeartIcon,
  RocketLaunchIcon,
  MegaphoneIcon,
  CodeBracketIcon,
  HandRaisedIcon
} from "@heroicons/react/24/outline";

export const iconMap: Record<string, React.ReactNode> = {
  "blog-posts": <BookOpenIcon className="w-8 h-8" />,
  "career-advancement": <BriefcaseIcon className="w-8 h-8" />,
  "coding-courses": <CodeBracketIcon className="w-8 h-8" />,
  "creative-skills": <SparklesIcon className="w-8 h-8" />,
  "digital-skills": <ComputerDesktopIcon className="w-8 h-8" />,
  "education": <AcademicCapIcon className="w-8 h-8" />,
  "entrepreneurship": <RocketLaunchIcon className="w-8 h-8" />,
  "financial-aid": <CurrencyDollarIcon className="w-8 h-8" />,
  "health-wellness": <HeartIcon className="w-8 h-8" />,
  "job-board": <BriefcaseIcon className="w-8 h-8" />,
  "learning-resources": <LightBulbIcon className="w-8 h-8" />,
  "lifestyle": <GlobeAltIcon className="w-8 h-8" />,
  "personal-development": <UserGroupIcon className="w-8 h-8" />,
  "scholarships": <AcademicCapIcon className="w-8 h-8" />,
};

// Fallback icon for any category that is not in the map
export const defaultIcon = <HandRaisedIcon className="w-8 h-8" />;

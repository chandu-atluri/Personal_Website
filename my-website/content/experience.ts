export type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  start: string;
  end: string;
  current?: boolean;
  logo?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: "Senior Cloud Security Architect",
    company: "CrossCountry Consulting",
    location: "New York, NY",
    start: "Sep 2024",
    end: "Present",
    current: true,
  },
  {
    role: "Cloud Security Engineer",
    company: "Avanade (Accenture & Microsoft Joint Venture)",
    location: "New York, NY",
    start: "Jun 2021",
    end: "Aug 2024",
    logo: "/logos/avanade.svg",
  },
  {
    role: "Business Systems Analyst",
    company: "Envestnet",
    location: "Secaucus, NJ",
    start: "Jul 2019",
    end: "Jun 2021",
    logo: "/logos/envestnet.svg",
  },
  {
    role: "Application Developer",
    company: "Compass Group",
    location: "Charlotte, NC",
    start: "Jun 2018",
    end: "Jul 2019",
  },
];

export const education = [
  {
    degree: "Master of Science, Cybersecurity",
    school: "New York University",
    logo: "/logos/nyu.svg",
  },
  {
    degree: "Bachelor of Arts, Information Systems",
    school: "Rutgers University",
    logo: "/logos/rutgers.svg",
  },
];

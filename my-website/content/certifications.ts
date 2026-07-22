export type Certification = {
  name: string;
  issuer: string;
};

export const activeCertifications: Certification[] = [
  { name: "Certified Information Systems Security Professional (CISSP)", issuer: "ISC2" },
  { name: "Certified in Cybersecurity (CC)", issuer: "ISC2" },
  { name: "Associate Cloud Engineer", issuer: "Google Cloud" },
  { name: "Generative AI Leader", issuer: "Google Cloud" },
  { name: "Digital Leader", issuer: "Google Cloud" },
  { name: "Azure Fundamentals (AZ-900)", issuer: "Microsoft" },
  { name: "Security, Compliance & Identity Fundamentals (SC-900)", issuer: "Microsoft" },
  { name: "Azure AI Fundamentals (AI-900)", issuer: "Microsoft" },
];

export const previousCertifications: Certification[] = [
  { name: "Azure Security Engineer Associate (AZ-500)", issuer: "Microsoft" },
  { name: "Identity and Access Administrator Associate (SC-300)", issuer: "Microsoft" },
  { name: "Information Protection Administrator Associate (SC-400)", issuer: "Microsoft" },
  { name: "Terraform Associate", issuer: "HashiCorp" },
  { name: "Security+", issuer: "CompTIA" },
  { name: "Certified Cloud Practitioner", issuer: "AWS" },
];

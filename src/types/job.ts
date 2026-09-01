export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  type: string;
  url: string;
  companyLogo?: string;
}

export interface JobFilters {
  search: string;
  role: string;
  location: string;
  type: string;
}
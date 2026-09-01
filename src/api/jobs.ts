import type { Job, JobFilters } from "../types/job";

interface AdzunaJob {
  id: string;
  title: string;
  description: string;
  redirect_url: string;

  company?: {
    display_name?: string;
  };

  location?: {
    display_name?: string;
  };

  contract_time?: string;
  contract_type?: string;
}

interface AdzunaResponse {
  results: AdzunaJob[];
}

function mapAdzunaJob(job: AdzunaJob): Job {
  return {
    id: job.id,
    title: job.title,
    company: job.company?.display_name ?? "Unknown company",
    location: job.location?.display_name ?? "Unknown location",
    description: job.description,
    type: job.contract_time ?? job.contract_type ?? "Unknown",
    url: job.redirect_url,
  };
}

export async function getJobs(
  filters: JobFilters,
): Promise<Job[]> {
  const params = new URLSearchParams();

  if (filters.search) {
    params.set("search", filters.search);
  }

  if (filters.role) {
    params.set("role", filters.role);
  }

  if (filters.location) {
    params.set("location", filters.location);
  }

  if (filters.type) {
    params.set("type", filters.type);
  }

  const response = await fetch(
    `/api/jobs?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch jobs: ${response.status}`,
    );
  }

  const data: AdzunaResponse =
    await response.json();

  return data.results.map(mapAdzunaJob);
}

export async function getJob(
  id: string,
): Promise<Job> {
  const response = await fetch(`/api/jobs/${id}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch job: ${response.status}`,
    );
  }

  const data = await response.json();

  return mapAdzunaJob(data);
}
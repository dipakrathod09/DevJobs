import { useQuery } from "@tanstack/react-query";
import { getJobs } from "../api/jobs";
import type { JobFilters } from "../types/job";

export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: [
      "jobs",
      filters.search,
      filters.role,
      filters.location,
      filters.type,
    ],
    queryFn: () => getJobs(filters),
  });
}
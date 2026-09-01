import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getJob } from "../api/jobs";
import type { Job } from "../types/job";

export function useJob(id: string | undefined) {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["job", id],

    queryFn: () => {
      if (!id) {
        throw new Error("Job ID is required.");
      }

      // Look through all cached job-list queries.
      const cachedJob = queryClient
        .getQueriesData<Job[]>({
          queryKey: ["jobs"],
        })
        .flatMap(([, data]) => data ?? [])
        .find((job) => String(job.id) === id);

      // If the job was already loaded in the listing,
      // don't make another Adzuna request.
      if (cachedJob) {
        return cachedJob;
      }

      // Fallback for direct URL navigation / page refresh.
      return getJob(id);
    },

    enabled: Boolean(id),
  });
}
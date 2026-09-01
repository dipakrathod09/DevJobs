import { useQuery } from "@tanstack/react-query";
import { getJob } from "../api/jobs";

export function useJob(id: string | undefined) {
  return useQuery({
    queryKey: ["job", id],
    queryFn: () => getJob(id!),
    enabled: Boolean(id),
  });
}
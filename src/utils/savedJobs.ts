import type { Job } from "../types/job";

const STORAGE_KEY = "devjobs-saved-jobs";

export function getSavedJobs(): Job[] {
  const savedJobs = localStorage.getItem(STORAGE_KEY);

  if (!savedJobs) {
    return [];
  }

  try {
    return JSON.parse(savedJobs) as Job[];
  } catch {
    return [];
  }
}

export function saveJob(job: Job): void {
  const savedJobs = getSavedJobs();

  const alreadySaved = savedJobs.some(
    (savedJob) => savedJob.id === job.id,
  );

  if (alreadySaved) {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...savedJobs, job]),
  );
}

export function removeSavedJob(jobId: string): void {
  const savedJobs = getSavedJobs();

  const updatedJobs = savedJobs.filter(
    (job) => job.id !== jobId,
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedJobs),
  );
}

export function isJobSaved(jobId: string): boolean {
  const savedJobs = getSavedJobs();

  return savedJobs.some(
    (job) => job.id === jobId,
  );
}
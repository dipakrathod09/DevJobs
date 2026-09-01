import { useState } from "react";

import type { Job } from "../types/job";
import {
  getSavedJobs,
  removeSavedJob,
} from "../utils/savedJobs";

function SavedJobsPage() {
  const [savedJobs, setSavedJobs] = useState<Job[]>(
    () => getSavedJobs(),
  );

  function handleRemove(jobId: string) {
    removeSavedJob(jobId);

    setSavedJobs((currentJobs) =>
      currentJobs.filter(
        (job) => job.id !== jobId,
      ),
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Saved Jobs
        </h1>

        <p className="mt-2 text-sm text-slate-600 sm:text-base">
          Keep track of opportunities you want to explore.
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mb-4 text-5xl">♡</div>

          <h2 className="text-xl font-semibold text-slate-900">
            No saved jobs yet
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
            Save jobs you're interested in and come back to them later.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {savedJobs.map((job) => (
              <article
                key={job.id}
                className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
              <h2 className="line-clamp-2 text-lg font-semibold text-slate-900">
                {job.title}
              </h2>

              <p className="mt-2 text-sm font-medium text-slate-700">
                {job.company}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                📍 {job.location}
              </p>
              <button
                type="button"
                onClick={() =>
                  handleRemove(job.id)
                }
                className="mt-auto w-full rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
              >
                Unsave
              </button>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedJobsPage;
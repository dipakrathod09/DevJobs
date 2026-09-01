import { Link, useParams } from "react-router-dom";
import JobDetailsSkeleton from "../components/JobDetailsSkeleton";
import SaveButton from "../components/SaveButton";
import { useJob } from "../hooks/useJob";

function JobDetailsPage() {
  const { id } = useParams();

  const {
    data: job,
    isLoading,
    isError,
    error,
  } = useJob(id);

  if (isLoading) {
    return <JobDetailsSkeleton />;
  }

  if (isError) {
    return (
      <div>
        <h1 className="text-xl font-bold text-red-600">
          Something went wrong
        </h1>

        <p className="mt-2 text-slate-600">
          {error instanceof Error
            ? error.message
            : "Failed to load job."}
        </p>

        <Link
          to="/"
          className="mt-4 inline-block underline"
        >
          ← Back to jobs
        </Link>
      </div>
    );
  }

  if (!job) {
    return (
      <div>
        <h1 className="text-xl font-bold">
          Job not found
        </h1>

        <Link
          to="/"
          className="mt-4 inline-block underline"
        >
          ← Back to jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-10">
      {/* Main content */}
      <main>
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          ← Back to jobs
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {job.title}
          </h1>

          <div className="mt-4 space-y-2 text-sm text-slate-600 sm:text-base">
            <p>
              <span className="font-medium text-slate-900">
                Company:
              </span>{" "}
              {job.company}
            </p>

            <p>
              <span className="font-medium text-slate-900">
                Location:
              </span>{" "}
              {job.location}
            </p>

            <p>
              <span className="font-medium text-slate-900">
                Type:
              </span>{" "}
              {job.type || "Not specified"}
            </p>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-xl font-semibold">
            Job Description
          </h2>

          <div className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700 sm:text-base">
            {job.description}
          </div>
        </section>
      </main>

      {/* Sidebar */}
      <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-6">
        <h2 className="text-lg font-semibold">
          Interested in this job?
        </h2>

        <div className="mt-5 space-y-3">
          <SaveButton job={job} />

          <a
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg bg-slate-900 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Apply for this job
          </a>
        </div>
      </aside>
    </div>
  );
}

export default JobDetailsPage;
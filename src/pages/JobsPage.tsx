import { Link } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import SaveButton from "../components/SaveButton";
import EmptyState from "../components/EmptyState";
import { useSearchParams } from "react-router-dom";
import JobCardSkeleton from "../components/JobCardSkeleton";


function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") ?? "";
  const role = searchParams.get("role") ?? "";
  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";


  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useJobs({
    search,
    role,
    location,
    type,
  });

  return (
    <div>
      <SearchBar />

      <Filters />

      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>
      )}

      {isError && (
        <div>
          <h1 className="text-xl font-bold text-red-600">
            Something went wrong
          </h1>

          <p className="mt-2 text-slate-600">
            {error instanceof Error
              ? error.message
              : "Failed to load jobs."}
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Find your next opportunity
            </h1>

            <p className="mt-2 text-sm text-slate-600 sm:text-base">
              Search developer jobs and find the right opportunity for you.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs && jobs.length === 0 ? (
              <EmptyState
                onClear={() => {
                  setSearchParams({});
                }}
              />
            ) : (
              jobs?.map((job) => (
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

                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <Link
                      to={`/jobs/${job.id}`}
                      className="rounded-lg border px-3 py-2 text-sm font-medium hover:bg-slate-100"
                    >
                      View Details
                    </Link>

                    <SaveButton job={job} />
                  </div>
                </article>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default JobsPage;
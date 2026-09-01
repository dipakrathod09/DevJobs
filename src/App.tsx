import { Link, Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import JobsPage from "./pages/JobsPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import SavedJobsPage from "./pages/SavedJobsPage";

function App() {
  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <header className="border-b bg-white">
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
            <Link
              to="/"
              className="text-xl font-bold text-slate-900"
            >
              DevJobs
            </Link>

            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                Jobs
              </Link>

              <Link
                to="/saved"
                className="text-sm font-medium text-slate-600 hover:text-slate-900"
              >
                <span className="sm:hidden">Saved</span>
                <span className="hidden sm:inline">Saved Jobs</span>
              </Link>
            </div>
          </nav>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <Routes>
            <Route path="/" element={<JobsPage />} />

            <Route
              path="/saved"
              element={<SavedJobsPage />}
            />

            <Route
              path="/jobs/:id"
              element={<JobDetailsPage />}
            />
          </Routes>
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
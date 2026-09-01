interface EmptyStateProps {
  onClear: () => void;
}

function EmptyState({ onClear }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 text-5xl">🔍</div>

      <h2 className="text-2xl font-bold text-slate-900">
        No jobs found
      </h2>

      <p className="mt-2 max-w-md text-slate-600">
        Try adjusting your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-lg bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
      >
        Clear Filters
      </button>
    </div>
  );
}

export default EmptyState;
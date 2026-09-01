function JobCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border bg-white p-5">
      <div className="h-5 w-3/4 rounded bg-slate-200" />

      <div className="mt-4 h-4 w-1/2 rounded bg-slate-200" />

      <div className="mt-2 h-4 w-2/3 rounded bg-slate-200" />

      <div className="mt-6 h-9 w-24 rounded bg-slate-200" />
    </div>
  );
}

export default JobCardSkeleton;
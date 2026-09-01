function JobDetailsSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-4 w-24 rounded bg-slate-200" />

      <div className="mt-6 h-9 w-3/4 rounded bg-slate-200" />

      <div className="mt-4 h-4 w-1/3 rounded bg-slate-200" />

      <div className="mt-10 space-y-3">
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
        <div className="h-4 w-4/6 rounded bg-slate-200" />
      </div>
    </div>
  );
}

export default JobDetailsSkeleton;
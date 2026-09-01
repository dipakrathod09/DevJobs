import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SearchBar() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const urlSearch =
    searchParams.get("search") ?? "";

  const [search, setSearch] =
    useState(urlSearch);

  useEffect(() => {
    setSearch(urlSearch);
  }, [urlSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(
        searchParams,
      );

      if (search.trim()) {
        params.set("search", search.trim());
      } else {
        params.delete("search");
      }

      setSearchParams(params);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  return (
    <div className="mb-8">
      <label
        htmlFor="job-search"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Search jobs
      </label>

      <input
        id="job-search"
        type="search"
        value={search}
        onChange={(event) =>
          setSearch(event.target.value)
        }
        placeholder="Search by job title, skill, or keyword..."
        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:px-4 sm:text-base"
      />
    </div>
  );
}

export default SearchBar;
import { useSearchParams } from "react-router-dom";

function Filters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const role = searchParams.get("role") ?? "";
  const location = searchParams.get("location") ?? "";
  const type = searchParams.get("type") ?? "";

  function updateFilter(
    key: string,
    value: string,
  ) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    setSearchParams(params);
  }

  return (
    <aside className="mb-8 grid gap-4 md:grid-cols-3">
      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Role
        </label>

        <select
          id="role"
          value={role}
          onChange={(event) =>
            updateFilter("role", event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:text-base"
        >
          <option value="">All roles</option>
          <option value="frontend">Frontend Developer</option>
          <option value="backend">Backend Developer</option>
          <option value="fullstack">Full Stack Developer</option>
          <option value="software">Software Engineer</option>
          <option value="devops">DevOps Engineer</option>
        </select>
      </div>

      {/* Location */}
      <div>
        <label
          htmlFor="location"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Location
        </label>

        <select
          id="location"
          value={location}
          onChange={(event) =>
            updateFilter(
              "location",
              event.target.value,
            )
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:text-base"
        >
          <option value="">All locations</option>
          <option value="india">India</option>
          <option value="mumbai">Mumbai</option>
          <option value="bangalore">Bangalore</option>
          <option value="delhi">Delhi</option>
          <option value="hyderabad">Hyderabad</option>
          <option value="pune">Pune</option>
        </select>
      </div>

      {/* Job Type */}
      <div>
        <label
          htmlFor="type"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Job Type
        </label>

        <select
          id="type"
          value={type}
          onChange={(event) =>
            updateFilter("type", event.target.value)
          }
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200 sm:text-base"
        >
          <option value="">All types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="contract">Contract</option>
        </select>
      </div>
    </aside>
  );
}

export default Filters;
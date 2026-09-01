import { useState } from "react";

import type { Job } from "../types/job";
import {
  isJobSaved,
  removeSavedJob,
  saveJob,
} from "../utils/savedJobs";

interface SaveButtonProps {
  job: Job;
}

function SaveButton({ job }: SaveButtonProps) {
  const [saved, setSaved] = useState(
    () => isJobSaved(job.id),
  );

  function handleSave() {
    if (saved) {
      removeSavedJob(job.id);
      setSaved(false);
    } else {
      saveJob(job);
      setSaved(true);
    }
  }

  return (
    <button
      type="button"
      onClick={handleSave}
      className="rounded-lg border px-3 py-2 text-sm font-medium transition hover:bg-slate-100"
    >
      {saved ? "♥ Saved" : "♡ Save"}
    </button>
  );
}

export default SaveButton;
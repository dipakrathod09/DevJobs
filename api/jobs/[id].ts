import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  try {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;

    if (!appId || !appKey) {
      return res.status(500).json({
        error: "Adzuna credentials are not configured.",
      });
    }

    const { id } = req.query;

    if (typeof id !== "string") {
      return res.status(400).json({
        error: "Job ID is required.",
      });
    }

    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      results_per_page: "20",
      "content-type": "application/json",
    });

    const response = await fetch(
      `https://api.adzuna.com/v1/api/jobs/in/search/1?${params.toString()}`,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const details = await response.text();

      return res.status(response.status).json({
        error: "Adzuna job request failed.",
        details,
      });
    }

    const data = await response.json();

    const job = data.results?.find(
      (item: { id: string }) => String(item.id) === id,
    );

    if (!job) {
      return res.status(404).json({
        error: "Job not found.",
      });
    }

    return res.status(200).json(job);
  } catch (error) {
    console.error("Job detail API error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}
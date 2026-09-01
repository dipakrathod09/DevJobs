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

    // -----------------------------
    // Read query parameters
    // -----------------------------

    const search =
      typeof req.query.search === "string"
        ? req.query.search
        : "";

    const role =
      typeof req.query.role === "string"
        ? req.query.role
        : "";

    const location =
      typeof req.query.location === "string"
        ? req.query.location
        : "";

    const type =
      typeof req.query.type === "string"
        ? req.query.type
        : "";

    // -----------------------------
    // Role mapping
    // -----------------------------

    const roleSearchTerms: Record<string, string> = {
      frontend: "frontend developer",
      backend: "backend developer",
      fullstack: "full stack developer",
      software: "software engineer",
      devops: "devops engineer",
    };

    const roleTerm = roleSearchTerms[role] ?? "";

    // -----------------------------
    // Combine search + role
    // -----------------------------

    const searchTerms = [search, roleTerm]
      .filter(Boolean)
      .join(" ");

    // -----------------------------
    // Build Adzuna parameters
    // -----------------------------

    const params = new URLSearchParams({
      app_id: appId,
      app_key: appKey,
      results_per_page: "20",
      "content-type": "application/json",
    });

    // Keyword search
    if (searchTerms) {
      params.set("what", searchTerms);
    }

    // Location
    if (location) {
      params.set("where", location);
    }

    // -----------------------------
    // Job type
    // -----------------------------

    if (type === "full-time") {
      params.set("full_time", "1");
    }

    if (type === "part-time") {
      params.set("part_time", "1");
    }

    if (type === "contract") {
      params.set("contract", "1");
    }

    // -----------------------------
    // Request Adzuna
    // -----------------------------

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
        error: "Adzuna API request failed.",
        details,
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch (error) {
    console.error("Jobs API error:", error);

    return res.status(500).json({
      error: "Internal server error.",
    });
  }
}
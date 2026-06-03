import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "20246-03-06",
  useCdn: true,
  token: process.env.SANITY_API_READ_TOKEN,
});

export const isConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

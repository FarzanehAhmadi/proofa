// lib/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: "p19y4e82", // find in sanity.json or dashboard
  dataset: "production",
  apiVersion: "2026-03-12", // use today’s date
  useCdn: true, // `false` if you want fresh data always
});

const builder = imageUrlBuilder(sanityClient);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source);

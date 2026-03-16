"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config"; // Adjust this path if your config is in the root

export default function StudioPage() {
  return (
    // We wrap it in a div to ensure the Studio takes up the full screen
    <main style={{ height: "100vh", width: "100%" }}>
      <NextStudio config={config} />
    </main>
  );
}

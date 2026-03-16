import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./app/schemaTypes";
import { latexInput } from "sanity-plugin-latex-input";

export default defineConfig({
  name: "default",
  title: "proofa-sanity-blog",

  projectId: "p19y4e82",
  dataset: "production",

  basePath: "/admin",

  plugins: [structureTool(), visionTool(), latexInput()],

  schema: {
    types: schemaTypes,
  },
});

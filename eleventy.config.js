import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import EleventyAsciidoc from "eleventy-plugin-asciidoc";
import less from "less";
import { existsSync, rmSync } from "node:fs";

// Clean the _site directory before building
if (existsSync("_site")) await rmSync("_site", { recursive: true });
console.info("Deleting _site folder");

export default function (config) {
  config.addTemplateFormats("less");
  config.setInputDirectory("_src");
  config.setLayoutsDirectory("_layouts");
  config.addPassthroughCopy("_src/CNAME");
  config.addPassthroughCopy("_src/**/*.css");
  config.setLiquidOptions({
    outputEscape: "escape",
    strictVariables: true,
    strictFilters: true,
    lenientIf: true,
    jsTruthy: true,
  });
  config.addPlugin(EleventyHtmlBasePlugin);
  config.addPlugin(EleventyAsciidoc, {
    attributes: {
      showtitle: true, // Makes level 1 headings -> <h1> + <title>, instead of just <title>
    },
    safe: "unsafe",
  });

  // Transform less.js
  // Adapted from https://www.11ty.dev/docs/languages/custom/#example-add-sass-support-to-eleventy
  config.addExtension("less", {
    outputFileExtension: "css",
    useLayouts: false,
    compile: async (inputContent) => {
      // Hints from https://stackoverflow.com/a/55515382
      const result = await less.render(inputContent, {
        strict: "parens-division",
      });

      // This is the render function, `data` is the full data cascade
      return async (data) => {
        return result.css;
      };
    },
  });
}

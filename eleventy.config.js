import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import less from "less";

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

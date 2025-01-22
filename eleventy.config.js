import { EleventyHtmlBasePlugin } from "@11ty/eleventy";

export default function (config) {
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
}

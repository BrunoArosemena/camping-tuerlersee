const Image = require("@11ty/eleventy-img");

async function imageShortcode(src, alt, sizes = "100vw", widths = [480, 800, 1200, 1920]) {
  if (!src) return "";
  let metadata = await Image(src, {
    widths,
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/images/optimized/",
    urlPath: "/images/optimized/",
  });
  return Image.generateHTML(metadata, {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  });
}

async function imageUrlShortcode(src, width = 1920) {
  if (!src) return "";
  let metadata = await Image(src, {
    widths: [width],
    formats: ["jpeg"],
    outputDir: "./_site/images/optimized/",
    urlPath: "/images/optimized/",
  });
  return metadata.jpeg[0].url;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images/favicon.svg");
  eleventyConfig.addPassthroughCopy("src/images/uploads");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addNunjucksAsyncShortcode("imageUrl", imageUrlShortcode);

  eleventyConfig.addCollection("activities", function (collectionApi) {
    return collectionApi
      .getFilteredByTag("activities")
      .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  });

  eleventyConfig.addFilter("dateDeLong", (value) => {
    const d = new Date(value);
    return d.toLocaleDateString("de-CH", {
      weekday: "short",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("dateShort", (value) => {
    const d = new Date(value);
    return d.toLocaleDateString("de-CH", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("isFuture", (value) => {
    return new Date(value) >= new Date(new Date().toDateString());
  });

  eleventyConfig.addFilter("toSourcePath", (value) => {
    if (!value) return value;
    return value.startsWith("/") ? "src" + value : value;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};

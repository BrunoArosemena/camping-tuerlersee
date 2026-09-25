module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/js");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

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

/** @type {import('next').NextConfig} */

// To Allow SVG render
const { svgr } = require("./config/svgr");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api.realworld.io"],
  },
  webpack(config, option) {
    svgr(config, option);
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        // The default `babel-loader` used by Next:
        option.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            /* jsxImportSource: …, otherOptions… */
          },
        },
      ],
    });
    return config;
  },
};

module.exports = nextConfig;

/**
 * @see https://github.com/vercel/next.js/issues/26130
 */
exports.svgr = function svgr(config) {
  config.module.rules.push({
    loader: "@svgr/webpack",
    test: /\.svg$/,
    issuer: {
      and: [/\.(js|ts)x?$/],
    },
    options: {
      svgo: true,
      svgoConfig: {
        plugins: [{ name: "removeViewBox", active: false }],
      },
      titleProp: true,
    },
  });
};

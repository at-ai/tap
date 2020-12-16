require("dotenv").config();
const { fuse } = require("../../node_modules/@uxland/project-tools/fuse");
fuse(
  "demo/index.ts",
  "../styles/styles.scss",
  "demo/index.html",
  false,
  undefined
  // {
  //   ATC_API: process.env.ATC_API,
  //   NODE_ENV: "production",
  // }
).runProd({
  uglify: true,
  target: "browser",
  bundles: {
    app: "./app.$hash.js",
    mapping: [
      { matching: "webcomponents*", target: "./vendor.webcomponents.$hash.js" },
      { matching: "@uxland*", target: "./vendor.uxland.$hash.js" },
      { matching: "lit-element", target: "./vendor.lit-element.$hash.js" },
      { matching: "lit-html", target: "./vendor.lit-html.$hash.js" },
      //   { matching: "polymer*", target: "./vendor.polymer.$hash.js" },
    ],
    vendor: "./vendor.$hash.js",
  },
});

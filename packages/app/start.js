require("dotenv").config();
const { fuse } = require("../../node_modules/@uxland/project-tools/fuse");
fuse(
  "demo/index.ts",
  "../styles/styles.scss",
  "demo/index.html",
  true,
  undefined
  // {
  //   ATC_API: process.env.ATC_API,
  //   NODE_ENV: "development",
  // }
).runDev();

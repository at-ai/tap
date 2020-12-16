const config = require("../../node_modules/@uxland/project-tools/test/jest.config");
const pack = require("./package");

module.exports = {
  ...config,
  name: pack.name,
  displayName: pack.name,
  setupFilesAfterEnv: [
    "../../node_modules/@uxland/project-tools/test/setup.ts",
  ],
};

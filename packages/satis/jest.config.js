/** @type {import("ts-jest").JestConfigWithTsJest} */
export default {
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "jsdom",
};

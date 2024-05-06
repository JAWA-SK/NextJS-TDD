import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
 
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["./jest.setup.ts", "jest-canvas-mock"],

};


export default createJestConfig(config);

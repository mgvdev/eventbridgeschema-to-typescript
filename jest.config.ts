import type { JestConfigWithTsJest } from "ts-jest/dist/types";

const config: JestConfigWithTsJest = {
  moduleDirectories: ["node_modules", "<rootDir>"],
  modulePaths: ["node_modules", "./"],
  preset: "ts-jest",
  transform: {
    "^.+\\.ts?$": [
      "ts-jest",
      {
        diagnostics: false,
        tsconfig: `${__dirname}/tsconfig.json`,
      },
    ],
  },
  verbose: true,
  testEnvironment: "node",
  reporters: ["default"],
  coverageReporters: ["text", "html", "text-summary"],
  detectLeaks: true,
  logHeapUsage: true,
  detectOpenHandles: false,
  restoreMocks: true,
  resetMocks: true,
};
export default config;

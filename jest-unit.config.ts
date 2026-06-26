import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.\\.?\\/.+)\\.js$': '$1',
  },
  testMatch: [
    "**/__tests__/unit/**/*.spec.ts",
    "**/__tests__/unit/**/*.test.ts",
    "**/*.spec.ts",
    "**/*.test.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "\\.e2e\\.ts$"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

export default config;

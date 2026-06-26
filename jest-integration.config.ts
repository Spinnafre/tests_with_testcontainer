import type {Config} from 'jest';

const config: Config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  globalSetup: '<rootDir>/src/__tests__/helpers/globalSetup.ts',
  globalTeardown: '<rootDir>/src/__tests__/helpers/globalTeardown.ts',
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
    "**/__tests__/integration/**/*.e2e.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  verbose:true
};

export default config;

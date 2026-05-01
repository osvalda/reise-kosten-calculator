/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
  // Automatically clear mock calls, instances, contexts and results before every test
  transform: {
    ...tsJestTransformCfg,
  },
  clearMocks: true,

  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/**/page.tsx',
    '!app/**/layout.tsx',
    'lib/**/*.{ts,tsx}',
    '!lib/**/*.d.ts',
    'components/**/*.{ts,tsx}',
    '!components/**/*.d.ts',
  ],

  // The directory where Jest should output its coverage files
  coverageDirectory: "coverage",
  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['json-summary', "clover", "json", "lcov", "text"],

  // Use this configuration option to add custom reporters to Jest
  reporters: [['github-actions', { silent: false }], 'summary', 'jest-junit', 'default'],

  // The test environment that will be used for testing
  testEnvironment: "jsdom",

  // Indicates whether each individual test should be reported during the run
  verbose: true,
};

export default config;


module.exports = {
  testEnvironment: 'jest-environment-jsdom-sixteen',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  globals: { __DEV__: true },
};

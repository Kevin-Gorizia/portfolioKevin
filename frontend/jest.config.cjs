/* eslint-env node */
// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^next/image$": "<rootDir>/src/__mocks__/nextImageMock.js",
  },
  setupFiles: ["<rootDir>/jest.setup.js"],
};

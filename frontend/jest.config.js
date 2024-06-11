module.exports = {
    transform: {
      "^.+\\.jsx?$": "babel-jest",
      "^.+\\.tsx?$": "ts-jest"
    },
    testEnvironment: "jsdom",
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
      "^axios$": "<rootDir>/src/__mocks__/axios.js"
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    testTimeout: 30000 
  };
  
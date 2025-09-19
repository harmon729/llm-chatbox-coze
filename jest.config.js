module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: false, // 暂时关闭覆盖率收集以避免转换问题
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/app/**",
    "!**/node_modules/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^react-markdown$": "<rootDir>/src/__mocks__/react-markdown.js",
    "^remark-gfm$": "<rootDir>/src/__mocks__/remark-gfm.js",
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      {
        presets: [
          ["@babel/preset-env", { targets: { node: "current" } }],
          ["@babel/preset-react", { runtime: "automatic" }],
          "@babel/preset-typescript",
        ],
      },
    ],
  },
  transformIgnorePatterns: ["/node_modules/(?!(react-markdown|remark-gfm)/)"],
};

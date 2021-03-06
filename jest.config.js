module.exports = {
  roots: ['<rootDir>/src'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    "/node_modules/"
  ],
  verbose: true,
  moduleNameMapper: {
    "./Tile.js":"./Tile.ts",
    "./DisplayStyle.js":"./DisplayStyle.ts",
  }
};
module.exports = {
  testEnvironment: 'node',
  verbose: true,
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    '../mockApi.js',
    '../server.js'
  ],
  coverageDirectory: './coverage',
  testTimeout: 10000
};

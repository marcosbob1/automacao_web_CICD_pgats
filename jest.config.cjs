module.exports = {
    testEnvironment: 'node',
    testMatch: [
      '**/?(*.)+(spec|test).[tj]s?(x)',  // Garante que o Jest encontre arquivos .test.js e .spec.js
    ],
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  };
  
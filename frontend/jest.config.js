module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    moduleNameMapper: {
        // Handle module aliases, adjust according to your webpack or tsconfig paths
        "^@/(.*)$": "<rootDir>/$1",
        '^@/store/UserStore$': '<rootDir>/mocks/store/userStoreMock',
        // Add other mappings as needed
    },
    transform: {
        // Use ts-jest for ts and tsx files
        "^.+\\.(ts|tsx)$": "ts-jest",
        // Use babel-jest for js and jsx files
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'  // Make sure this points to your tsconfig file
        }
    }
};

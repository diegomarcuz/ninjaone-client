export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/.vite/', '/deps/', "/public/"],
    testMatch: ['<rootDir>/src/**/__tests__/**/*'],
};
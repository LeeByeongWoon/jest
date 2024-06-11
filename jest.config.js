/** @type {import('ts-jest').JestConfigWithTsJest} */
// eslint-disable-next-line no-undef
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
};

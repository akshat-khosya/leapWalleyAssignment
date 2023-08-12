module.exports = {

    rootDir: '.',


    testMatch: [
        '**/test/**/*.test.(ts|tsx|js)'
    ],


    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],


    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },



    testEnvironment: 'node',


    collectCoverage: false,


};

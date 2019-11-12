module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	clearMocks: true,
	testPathIgnorePatterns: ["\\\\node_modules\\\\"],
	verbose: false,
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFiles: ["<rootDir>/src/setupTests.js"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	collectCoverage: true,
	coverageDirectory: "coverage",
	testEnvironment: "node",
};

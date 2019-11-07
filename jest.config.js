module.exports = {
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	clearMocks: true,
	preset: "ts-jest",
	testPathIgnorePatterns: ["\\\\node_modules\\\\"],
	verbose: false,
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFiles: ["<rootDir>/src/setupTests.js"],
	setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
	collectCoverage: true,
	coverageDirectory: "coverage",
};

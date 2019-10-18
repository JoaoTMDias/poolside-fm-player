module.exports = {
	clearMocks: true,

	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	preset: "ts-jest",
	roots: ["<rootDir>/src"],
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
	testPathIgnorePatterns: ["\\\\node_modules\\\\"],
	verbose: false,
	testEnvironment: "node",

	// Setup Enzyme
	snapshotSerializers: ["enzyme-to-json/serializer"],
	setupFiles: "<rootDir>/src/setupEnzyme.ts",
	setupTestFrameworkScriptFile: "<rootDir>/src/setupEnzyme.ts",

	// Code Coverage
	collectCoverage: true,
	coverageDirectory: "coverage",
};

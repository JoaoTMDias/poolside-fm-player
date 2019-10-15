/**
 * Typescript rules
 *
 * @author João Dias (joao.dias@wit-software.com)
 * @since 1.0.0
 */
module.exports = {
	parser: "@typescript-eslint/parser",
	parserOptions: {
		jsx: true,
		useJSXTextNode: true,
	},
	extends: ["plugin:@typescript-eslint/recommended"],
	plugins: ["@typescript-eslint"],
	rules: {
		"@typescript-eslint/interface-name-prefix": [2, "always"],
		"@typescript-eslint/class-name-casing": 2,
		"@typescript-eslint/explicit-member-accessibility": 0,
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-explicit-any": 0,
		"@typescript-eslint/explicit-function-return-type": 0,
		"@typescript-eslint/no-var-requires": 0,
	},
	settings: {
		"import/parsers": {
			"@typescript-eslint/parser": [".ts", ".tsx"],
		},
		"import/resolver": {
			typescript: {
				directory: "./",
			},
		},
	},
};

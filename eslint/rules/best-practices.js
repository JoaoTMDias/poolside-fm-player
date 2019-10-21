/**
 * Better Javascript
 *
 * @author João Dias (joao.dias@wit-software.com)
 * @since 1.0.0
 */
module.exports = {
	// Import the recommended ESLint rules
	// https://eslint.org/docs/rules/
	extends: "eslint:recommended",

	rules: {
		// Enforces return statements in callbacks of array’s methods
		"array-callback-return": "error",

		// Specify the maximum cyclomatic complexity allowed in a program
		complexity: ["error", 10],

		// /!\ Require return statements to either always or never specify values
		"consistent-return": "warn",

		// Specify curly brace conventions for all control statements
		curly: ["error", "all"],

		// Require === and !==
		eqeqeq: "error",

		// Make sure for-in loops have an if statement
		"guard-for-in": "error",

		// /!\ Disallow return before else
		"no-else-return": "warn",

		// Disallow Case Statement Fallthrough
		"no-fallthrough": "error",

		// Disallow multiple spaces
		"no-multi-spaces": "error",

		// Disallow Multiline Strings
		"no-multi-str": "error",

		// Disallow unnecessary concatenation of strings
		"no-useless-concat": "error",

		// /!\ Disallow unnecessary escape usage
		"no-useless-escape": "warn",

		// Disallow redundant return statements
		"no-useless-return": "error",

		// /!\ Disallow providing the 10 radix
		radix: ["warn", "as-needed"],

		// Enforce valid JSDoc comments
		"valid-jsdoc": [
			"error",
			{
				prefer: { return: "returns" }, // Enforce the word returns instead of return
				requireReturn: false, // Does not require return for every method
				requireParamDescription: false, // Does not require return description
				requireReturnDescription: false, // Does not require param description
			},
		],

		// Disallow Yoda Conditions
		yoda: "error",
	},
};

/**
 * General Javascript rules
 *
 * @author João Dias (joao.dias@wit-software.com)
 * @since 1.0.0
 */
module.exports = {
	rules: {
		"jsx-a11y/href-no-hash": "off",
		"jsx-a11y/anchor-is-valid": [
			"warn",
			{
				aspects: ["invalidHref"],
			},
		],
		"jsx-a11y/label-has-for": 0,
	},
};

module.exports = {
	plugins: ["import"],

	env: {
		es6: true,
		jest: true,
		browser: true,
	},

	globals: {
		window: true,
		document: true,
		localStorage: true,
		FormData: true,
		FileReader: true,
		Blob: true,
		navigator: true,
	},

	rules: {
		"import/no-unresolved": "error",
		"import/no-extraneous-dependencies": [
			"error",
			{
				devDependencies: [
					"**/*.test.js",
					"**/*.spec.js",
					"**/*.stories.tsx",
					"**/*.stories.jsx",
				],
			},
		],
		"comma-dangle": [1, "always-multiline"],

		"no-param-reassign": [
			"error",
			{ ignorePropertyModificationsFor: ["draftState", "draft"] },
		],
		"class-methods-use-this": "off",
		"require-jsdoc": 2,
		"lines-around-comment": [
			"error",
			{
				beforeBlockComment: true,
				afterBlockComment: false,
				beforeLineComment: true,
				afterLineComment: false,
				allowBlockStart: true,
				allowBlockEnd: true,
				allowObjectStart: true,
				allowObjectEnd: true,
				allowArrayStart: true,
				allowArrayEnd: true,
			},
		],
		quotes: ["warn", "double"],
		indent: "off", // Disallow modifying variables that are declared using const
		"no-const-assign": "error",

		// /!\ If a variable is never reassigned, using the const declaration is better.
		"prefer-const": "warn",

		// Require space before/after arrow function’s arrow
		"arrow-spacing": [
			"error",
			{
				before: true,
				after: true,
			},
		],

		// Verify calls of super() in constructors
		"constructor-super": "error",

		// Disallow arrow functions where they could be confused with comparisons
		"no-confusing-arrow": [
			"error",
			{
				allowParens: true,
			},
		],

		// Disallow duplicate name in class members
		"no-dupe-class-members": "error",

		// Disallow use of this/super before calling super() in constructors.
		"no-this-before-super": "error",

		// Disallow unnecessary constructor
		"no-useless-constructor": "error",

		// Disallow renaming import, export, and destructured assignments to the same name
		"no-useless-rename": [
			"error",
			{
				ignoreDestructuring: false,
				ignoreImport: false,
				ignoreExport: false,
			},
		],

		// Suggest using template literals instead of string concatenation.
		"prefer-template": "error",

		// Enforce Usage of Spacing in Template Strings
		"template-curly-spacing": "error",

		// /!\ Disallow template literal placeholder syntax in regular strings
		"no-template-curly-in-string": "warn",

		// disallow importing from the same path more than once
		// https://eslint.org/docs/rules/no-duplicate-imports
		// replaced by https://github.com/benmosher/eslint-plugin-import/blob/master/docs/rules/no-duplicates.md
		"no-duplicate-imports": "off",
	},
};

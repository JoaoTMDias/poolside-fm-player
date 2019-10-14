/**
 * index
 *
 * @author João Dias (joao.dias@wit-software.com)
 * @since 1.0.0
 */

module.exports = {
	extends: [
		'./eslint/rules/react',
		'./eslint/rules/a11y',
		'./eslint/rules/typescript',
		'./eslint/rules/prettier',
		'./eslint/rules/general',
	].map(require.resolve),
	globals: {
		window: true,
		document: true,
		localStorage: true,
		FormData: true,
		FileReader: true,
		Blob: true,
		navigator: true,
	},
};

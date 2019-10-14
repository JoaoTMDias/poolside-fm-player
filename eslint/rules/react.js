/**
 * React specific rules
 *
 * @author João Dias (joao.dias@wit-software.com)
 * @since 1.0.0
 */
module.exports = {
	extends: ['react-app', 'airbnb'],
	plugins: ['react', 'react-hooks'],
	rules: {
		'react/jsx-wrap-multilines': 0,
		'react/jsx-closing-bracket-location': 0,
		'react/jsx-curly-spacing': 0,
		'react/jsx-equals-spacing': 0,
		'react/jsx-first-prop-new-line': 0,
		'react/jsx-indent': 0,
		'react/jsx-indent-props': 0,
		'react/jsx-max-props-per-line': 0,
		'react/jsx-tag-spacing': 0,
		'react/jsx-closing-tag-location': 0,
		'react/jsx-filename-extension': [
			'error',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		],
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react/prop-types': 'off',
		'react/require-default-props': 'off',

		'jsx-a11y/href-no-hash': 'off',
		'jsx-a11y/anchor-is-valid': [
			'warn',
			{
				aspects: ['invalidHref'],
			},
		],
	},
};

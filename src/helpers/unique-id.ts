/**
 *
 *
 * @param {string} prefix
 * @returns
 */
function generateRandomIndex(prefix: string) {
	return (
		prefix +
		(Number(String(Math.random()).slice(2)) + Date.now() + Math.round(performance.now())).toString(
			36
		)
	);
}

/**
 * Generates a unique ID. If prefix is given, the ID is appended to it.
 *
 * @export
 * @param {string} [prefix="_"]
 * @returns
 */
export function uniqueId(prefix = "_") {
	return generateRandomIndex(prefix);
}

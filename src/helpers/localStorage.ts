/**
 * Adds the key to the storage, or update that key's value if it already exists.

 *
 * @export
 * @template T
 * @param {string} key
 * @param {(string | T)} value
 */
export function set<T>(key: string, value: string | T): void {
	localStorage.setItem(key, JSON.stringify(value));
}

/**
 * When passed a key name, will return that key's value.
 *
 * @param {string} key
 * @returns {string|T|null}
 */
export function get(key: string): string | null {
	return localStorage.getItem(key);
}

/**
 * When passed a key name, will remove that key from the storage.
 *
 * @param {string} key
 * @returns {void}
 */
export function remove(key: string): void {
	localStorage.removeItem(key);
}

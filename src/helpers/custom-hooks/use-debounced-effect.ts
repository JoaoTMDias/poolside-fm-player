import { useEffect, useRef } from 'react';

/**
 * Custom hook that will wait to perform a useEffect until the state hasn't
 * updated for the duration of the delay.
 *
 * @export
 * @param {*} callback
 * @param {number} delay
 * @param {*} [deps=[]]
 */
export function useDebouncedEffect<T>(callback: any, delay: number, deps: T[] = []) {
	const firstUpdate = useRef(true);
	const dependencyArray = [
		...deps
	];

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			return;
		}
		const handler = setTimeout(() => {
			callback();
		}, delay);

		return () => {
			clearTimeout(handler);
		};
	},
		[callback, delay, dependencyArray],
	);
}

export default useDebouncedEffect;

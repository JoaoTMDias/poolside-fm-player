import { useEffect } from "react";

/**
 * This replaces the need for using window.addEventListener() when using react hooks.
 * You use it in exactly the same way as window.addEventListener().
 *
 * @example
 * useEvent(event, listener, useCapture)
 *
 * @export
 * @template T
 * @param {EventHandler<T>} event
 * @param {*} listener
 * @param {boolean} [passive=false]
 */
export function useEvent<T extends keyof WindowEventMap>(
	event: T,
	listener: (this: Window, ev: WindowEventMap[T]) => any,
	passive = false
) {
	useEffect(() => {
		// initiate the event handler
		window.addEventListener(event, listener, passive);

		// this will clean up the event every time the component is re-rendered
		return function cleanup() {
			window.removeEventListener(event, listener);
		};
	});
}

export default useEvent;

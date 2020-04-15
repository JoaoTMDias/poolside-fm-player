import { useEffect, EffectCallback, useRef, DependencyList } from "react";
import { Logger } from "../logger.helper";

/**
 * Returns true if component is just mounted (on first render) and false otherwise.
 *
 * @export
 * @returns {boolean}
 */
export function useFirstMountState(): boolean {
	const isFirst = useRef(true);

	if (isFirst.current) {
		isFirst.current = false;

		return true;
	}

	return isFirst.current;
}

/**
 * React effect hook that ignores the first invocation (e.g. on mount).
 *
 * @export
 * @returns {void}
 */
export const useDidUpdate: typeof useEffect = (effect: EffectCallback, deps?: DependencyList) => {
	const isFirstMount = useFirstMountState();

	useEffect(() => {
		if (!isFirstMount) {
			return effect();
		}
	}, deps);
};

/**
 * React lifecycle hook that runs an effect only once.
 *
 * @export
 * @param {EffectCallback} effect
 */
export function useEffectOnce(effect: EffectCallback) {
	useEffect(effect, []);
}

/**
 * React lifecycle hook that calls a function after the component is mounted.
 * Use useEffectOnce if you need both a mount and unmount function.
 *
 * @param {mixed} initial
 */
export function useOnMount(callback: () => any): void {
	useEffectOnce(() => {
		if (typeof callback === "function") {
			callback();
		}
	});
}

/**
 * React lifecycle hook that call mount and unmount callbacks, when component is mounted and un-mounted, respectively.
 *
 * @param {mixed} initial
 */
export const useLifecycleHooks = (mount: () => void, unmount?: () => void) => {
	useEffect(() => {
		if (mount) {
			mount();
		}
		return () => {
			if (unmount) {
				unmount();
			}
		};
	});
};

/**
 * React lifecycle hook that console logs parameters as component transitions through lifecycles.
 *
 * @export
 * @param {string} componentName
 * @param {*} props
 */
export function useLogComponentLifecycles(componentName: string, props: any) {
	useEffectOnce(() => {
		Logger({
			type: "info",
			message: `${componentName} mounted: ${props}`,
		});

		return () => {
			Logger({
				type: "info",
				message: `${componentName} unmounted`,
			});
		};
	});

	useDidUpdate(() => {
		Logger({
			type: "info",
			message: `${componentName} updated ${props}`,
		});
	});
}

export default useOnMount;

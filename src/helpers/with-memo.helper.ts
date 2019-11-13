import { memo } from "react";

/**
 * @description A nice hoc that will update your component only if a certain prop(s) of your choice changes
 * * withMemo(MemberRow, ['member']);
 * @author João Dias
 * @date 2019-04-29
 * @param {*} Component
 * @param {*} ComponentProps
 * @returns
 */
export function withMemo<Type>(Component: React.FunctionComponent<Type>, ComponentProps: string[]) {
	/**
	 * Check if props are equal
	 *
	 * @param {*} prevProps
	 * @param {*} nextProps
	 * @returns {boolean}
	 */
	function areEqual(prevProps: Type | any, nextProps: Type | any) {
		let isEqual = true;
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < ComponentProps.length; i++) {
			const checkedProp = ComponentProps[i];
			if (JSON.stringify(prevProps[checkedProp]) !== JSON.stringify(nextProps[checkedProp])) {
				isEqual = false;
				break;
			}
		}
		return isEqual;
	}

	return memo(Component, areEqual);
}

export default withMemo;

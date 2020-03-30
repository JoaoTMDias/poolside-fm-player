/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShallowWrapper, ReactWrapper, HTMLAttributes } from "enzyme";

type EnzymeComponentType =
	| ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>
	| ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>;

/**
 * Find a component by its test attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {EnzymeComponentType}
 */
export function findByTestAttr(
	wrapper: ShallowWrapper | ReactWrapper,
	value: string
): EnzymeComponentType {
	return wrapper.find(`[data-testid='${value}']`);
}

/**
 * Find a component by its id attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {EnzymeComponentType}
 */
export function findById(
	wrapper: ShallowWrapper | ReactWrapper,
	value: string
): EnzymeComponentType {
	return wrapper.find(`#${value}`);
}

/**
 * Find a component by its class attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {EnzymeComponentType}
 */
export function findByClass(
	wrapper: ShallowWrapper | ReactWrapper,
	value: string
): EnzymeComponentType {
	const hasDotAtBeginning = !!(value.indexOf(".") === 0);
	const string = hasDotAtBeginning ? `${value}` : `.${value}`;
	return wrapper.find(string);
}

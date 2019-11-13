import { ShallowWrapper, ReactWrapper } from "enzyme";

/**
 * Find a component by its test attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>> | ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>}
 */
export function findByTestAttr(wrapper: ShallowWrapper | ReactWrapper, value: string) {
	return wrapper.find(`[data-testid='${value}']`);
}

/**
 * Find a component by its id attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>> | ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>}
 */
export function findById(wrapper: ShallowWrapper | ReactWrapper, value: string) {
	return wrapper.find(`#${value}`);
}

/**
 * Find a component by its class attribute
 *
 * @export
 * @param {(ShallowWrapper | ReactWrapper)} wrapper
 * @param {string} value
 * @returns {ShallowWrapper<HTMLAttributes, any, React.Component<{}, {}, any>> | ReactWrapper<HTMLAttributes, any, React.Component<{}, {}, any>>}
 */
export function findByClass(wrapper: ShallowWrapper | ReactWrapper, value: string) {
	const hasDotAtBeginning = !!(value.indexOf(".") === 0);
	const string = hasDotAtBeginning ? `${value}` : `.${value}`;
	return wrapper.find(string);
}

/**
 * Returns the first node found with a given attribute.
 *
 * It uses the HTML DOM *document.querySelector()* method under the hood,
 * so you need to pass the hash or the period notation
 *
 * @example <caption>Example of finding an id</caption>
 * findById(wrapper, "#fdz-js-skiplink-wrapper");
 * @example <caption>Example of finding a class</caption>
 * findByClassname(wrapper, ".fdz-js-skiplink-wrapper");
 *
 * @param {HTMLElement} component
 * @param {string} selector
 * @returns {HTMLElement | null}
 */
const findByAttribute = (component: HTMLElement, selector: string): HTMLElement | null  => {
	return component.querySelector(selector);
};

/**
* Returns all nodes found with a given attribute.
*
* It uses the HTML DOM *document.querySelectorAll()* method under the hood,
* so you need to pass the hash or the period notation
*
* @example <caption>Example of finding all by an id</caption>
* getAllById(wrapper, "#fdz-js-skiplink-wrapper");
* @example <caption>Example of finding all by a class</caption>
* getAllByClassname(wrapper, ".fdz-js-skiplink-wrapper");
*
* @export
* @param {HTMLElement} component
* @param {string} selector
* @returns {HTMLElement[] | null}
*/
const getAllByAttribute = (component: HTMLElement, selector: string): HTMLElement[] | null  => {
	return Array.from(component.querySelectorAll(selector));
};

export {
	findByAttribute as findById,
	findByAttribute as findByClassname,
	getAllByAttribute as getAllById,
	getAllByAttribute as getAllByClassname
};

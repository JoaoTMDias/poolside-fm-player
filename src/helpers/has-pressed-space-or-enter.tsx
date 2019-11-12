import { KEY_CODES } from "./key-codes";

/**
 * Checks if the user has pressed space or enter
 *
 * @param {number} keyCode
 * @returns {boolean}
 */
function hasPressedSpaceOrEnter(keyCode: number) {
	if (keyCode === KEY_CODES.ENTER || keyCode === KEY_CODES.SPACE) {
		return true;
	}

	return false;
}

export default hasPressedSpaceOrEnter;

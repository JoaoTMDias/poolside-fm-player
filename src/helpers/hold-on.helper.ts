/**
 * @description Returns a promise that resolves after how many milliseconds you pass it.
 * @author João Dias
 * @date 2019-06-29
 * @param {number} [amount=0]
 * @returns
 */
export const holdOn = (amount = 0) => {
	return new Promise(resolve => setTimeout(resolve, amount));
};

export default holdOn;

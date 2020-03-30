/**
 * Returns a promise that resolves after how many milliseconds you pass it.
 *
 * @author João Dias
 * @param {number} [amount=0]
 * @returns
 */
export function holdOn(amount = 0): Promise<NodeJS.Timeout> {
	return new Promise((resolve) => setTimeout(resolve, amount));
}

export default holdOn;

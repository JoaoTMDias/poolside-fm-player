interface ILoggerOptions {
	type:
		| 'log'
		| 'error'
		| 'warning'
		| 'info'
		| 'time'
		| 'timeLog'
		| 'timeEnd'
		| undefined;
	message?: string | object | undefined;
	showOnProduction?: boolean;
}

export const Logger = (options: ILoggerOptions) => {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
		if (options.showOnProduction === false) {
			return null;
		}

		const { type, message } = options;
		let style = `
                color: #ffffff;
                background-color: #346aea;
                font-weight: bold;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-family: 'Dank Mono', 'Fira Code', 'Lucida Console', monospace
            `;

		switch (type) {
			case 'error':
				style = `
                color: white;
                background-color: #e60000;
                font-weight: bold;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-family: 'Dank Mono', 'Fira Code', 'Lucida Console', monospace
            `;
				console.error('%c 🚨 Error ', style, message);
				break;

			case 'warning':
				style = `
                color: #111111;
                background-color: #eb9800;
                font-weight: bold;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-family: 'Dank Mono', 'Fira Code', 'Lucida Console', monospace
            `;
				console.log('%c ⚠ Warning ', style, message);
				break;

			case 'info':
				style = `
                color: #ffffff;
                background-color: #34ea58;
                font-weight: bold;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 3px;
                font-family: 'Dank Mono', 'Fira Code', 'Lucida Console', monospace
            `;
				console.info('%c ℹ Info ', style, message);
				break;

			case 'time':
				console.time(`⏱ Timer`);
				break;

			case 'timeLog':
				console.timeLog(`⏱ Timer`);
				break;

			case 'timeEnd':
				console.timeEnd(`⏱ Timer`);
				break;

			case 'log':
			default:
				console.log('%c 📄 Log ', style, message);
				break;
		}
	}

	return null;
};

Logger.defaultProps = {
	showOnProduction: false,
};

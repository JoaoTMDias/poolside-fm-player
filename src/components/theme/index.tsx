// Libraries
import React, { useEffect, useState, FunctionComponent, useContext } from "react";
import ThemeContext, { ETHEME, IThemeContext, POOLSIDE_THEMES, defaultThemeContext } from "contexts/theme-context";
import { get, set } from "helpers";

export const useTheme = () => useContext(ThemeContext);

/**
 * Theme Manager
 *
 * @author João Dias
 * @date 2019-02-16
 * @returns {FunctionComponent<IThemeProps>}
 */
const ThemeManager: FunctionComponent = ({ children }) => {
	const [currentIndex, updateCurrentIndex] = useState(defaultThemeContext.currentIndex);
	const [theme, updateThemeState] = useState(ETHEME.poolside);

	useEffect(() => {
		const currentTheme = get("theme");

		if (currentTheme) {
			updateThemeState(theme);
		} else {
			set("theme", theme);
		}

		document.documentElement.setAttribute("data-theme", theme);
	}, [theme]);

	/**
	 * When the user selects a new theme:
	 * - Saves that preference to the local storage
	 * - Updates the data-theme attribute on the HTML tag.
	 *
	 * @param {number} index
	 */
	function handleChangeTheme(index: number) {
		updateCurrentIndex(index);
		updateThemeState(POOLSIDE_THEMES[index]);
	}

	const context: IThemeContext = {
		currentIndex,
		theme,
		onChangeOption: (index) => handleChangeTheme(index),
	};

	return <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>;
};

export default ThemeManager;

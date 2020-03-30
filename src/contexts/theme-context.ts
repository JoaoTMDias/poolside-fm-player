import React from "react";

export enum ETHEME {
	poolside = "poolside",
	paloAlto = "palo-alto",
	redmond = "redmond",
	terminal = "terminal",
}

export const POOLSIDE_THEMES = Object.entries(ETHEME).map((item) => item[1]);

export interface IThemeContext {
	currentIndex: number;
	theme: ETHEME;
	onChangeOption(index: number): void;
}

export const defaultThemeContext: IThemeContext = {
	currentIndex: 0,
	theme: ETHEME.poolside,
	onChangeOption: () => {},
};

/**
 * @description Context for Themes
 * @author João Dias
 * @param {IThemeContext}
 * @returns
 */
const ThemeContext = React.createContext<IThemeContext>(defaultThemeContext);

export default ThemeContext;

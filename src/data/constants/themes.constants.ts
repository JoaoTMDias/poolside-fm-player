import { ETHEME } from "contexts/theme-context";

export interface IPoolsideThemes {
	id: ETHEME;
	value: ETHEME;
	label: string;
	isNew?: boolean;
}

export const Themes: IPoolsideThemes[] = [
	{
		id: ETHEME.poolside,
		value: ETHEME.poolside,
		label: "Poolside.Fm (Default)",
	},
	{
		id: ETHEME.paloAlto,
		value: ETHEME.paloAlto,
		label: "Palo Alto",
		isNew: true,
	},
	{
		id: ETHEME.redmond,
		value: ETHEME.redmond,
		label: "Redmond",
	},
	{
		id: ETHEME.terminal,
		value: ETHEME.terminal,
		label: "Terminal",
	},
];

export default Themes;

import React from "react";

export interface ITabsContext {
	activeTab: string | undefined;
	onActive: (id: string) => void;
}

export const defaultTabsContext: ITabsContext = {
	activeTab: "",
	onActive: () => {},
};

/**
 * @description Context for Tabs
 * @author João Dias
 * @param {IThemeContext}
 * @returns
 */
const TabsContext = React.createContext<ITabsContext>(defaultTabsContext);

export default TabsContext;

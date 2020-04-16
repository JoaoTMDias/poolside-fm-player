// Libraries
import React, { useRef, useContext } from "react";
import * as S from "./styles";
import { ITabPanelProps } from "./types.d";
import TabsContext from "./TabsContext";

/**
 * @description Tab Item component
 * @author João Dias
 * @returns {React.FC<ITabPanelProps>}
 */
export const TabPanel: React.FC<ITabPanelProps> = ({
	id,
	children,
}) => {
	const refId = useRef<string>(`${id}-panel`);
	const { activeTab } = useContext(TabsContext);

	const active = activeTab === id;
	const tabIndex = active ? 0 : -1;
	return (
		<S.Panel
			id={refId.current}
			data-testid="component-tabs-panel"
			className="tabs__panel custom-scrollbar"
			aria-labelledby={id}
			role="tabpanel"
			hidden={!active}
			tabIndex={tabIndex}
		>
			{children}
		</S.Panel>
	);
};

export default TabPanel;

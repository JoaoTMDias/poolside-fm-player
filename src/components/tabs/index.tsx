import React, { useState } from "react";
import * as S from "./styles";
import { RovingTabIndexProvider } from "helpers/custom-hooks/roving-index";
import { EKeyDirection } from "helpers/custom-hooks/roving-index/types.d";
import { ITabs } from "./types.d";
import { useDidMount } from "helpers";
import TabsContext, { ITabsContext } from "./TabsContext";

export const Tabs: React.FunctionComponent<ITabs> = ({ children, initialTab }) => {
	const [activePanel, setActivePanel] = useState(initialTab);

	useDidMount(() => {
		if (initialTab) {
			const element = document.getElementById(initialTab);

			if (element) {
				element.focus();
			}

			setActivePanel(initialTab);
		}
	});

	function _setActivePanel(id: string) {
		if (id) {
			setActivePanel(id);
		}
	}

	const value: ITabsContext = {
		activeTab: activePanel,
		onActive: (id) => _setActivePanel(id),
	};

	return (
		<S.Wrapper id="tabs" data-testid="component-tabs" className="tabs">
			<RovingTabIndexProvider direction={EKeyDirection.HORIZONTAL}>
				<TabsContext.Provider value={value}>{children}</TabsContext.Provider>
			</RovingTabIndexProvider>
		</S.Wrapper>
	);
};

export default Tabs;

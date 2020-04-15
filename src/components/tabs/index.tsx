import React from "react";
import * as S from "./styles";
import { RovingTabIndexProvider } from "helpers/custom-hooks/roving-index";
import { EKeyDirection } from "helpers/custom-hooks/roving-index/types.d";

export const Tabs: React.FunctionComponent = () => {
	return (
		<RovingTabIndexProvider direction={EKeyDirection.HORIZONTAL}>
			<S.Wrapper id="tabs" data-testid="component-tabs" className="tabs">
				<S.List id="tablist" data-testid="component-tabs-list" role="tablist" aria-label="Tabs" className="tabs__list">
					<S.Item
						id="theme"
						data-testid="component-tabs-list-button"
						tabIndex={0}
						aria-selected="true"
						role="tab"
						className="tabs__list__button"
						aria-controls="preview-8-1-4"
					>
						Theme
				</S.Item>
					<S.Item
						id="preview-8-2-1"
						data-testid="component-tabs-list-button"
						tabIndex={0}
						aria-selected="false"
						role="tab"
						className="tabs__list__button"
						aria-controls="preview-8-12-4"
					>
						Preferences
				</S.Item>
				</S.List>
				<S.Panel id="preview-8-1-4" role="tabpanel" tabIndex={0} className="tabs__panel custom-scrollbar" aria-labelledby="theme">Tab 1</S.Panel>
				<div id="preview-8-1-5" hidden role="tabpanel" tabIndex={-1} className="tabs__panel" aria-labelledby="preview-8-1-2">Tab 2</div>
			</S.Wrapper>
		</RovingTabIndexProvider>
	);
}

export default Tabs;

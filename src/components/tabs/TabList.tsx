// Libraries
import * as React from "react";
import * as S from "./styles";
import { ITabListProps } from "./types";

/**
 * @description Component Description
 * @author João Dias
 * @returns {React.FunctionComponent<ITabListProps>}
 */
const TabList: React.FunctionComponent<ITabListProps> = ({ children, ariaLabel }) => {
	return (
		<S.List
			id="tablist"
			data-testid="component-tabs-list"
			role="tablist"
			aria-label={ariaLabel}
			className="tabs__list"
		>
			{children}
		</S.List>
	);
};

TabList.defaultProps = {
	ariaLabel: "Tab List",
};

export default React.memo(TabList);

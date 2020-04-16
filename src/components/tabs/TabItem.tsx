// Libraries
import React, { useRef, useEffect, useContext } from "react";
import * as S from "./styles";
import { useFocusOnElement, useRovingTabIndex } from "helpers/custom-hooks/roving-index";
import { ITabItemProps } from "./types";
import { useDidMount } from "helpers";
import TabsContext from "./TabsContext";

/**
 * @description Tab Item component
 * @author João Dias
 * @returns {React.FC<ITabItemProps>}
 */
export const TabItem: React.FC<ITabItemProps> = ({
	id,
	text,
	ariaLabel,
	disabled = false,
}) => {
	const { current: refId } = useRef<string>(id);
	const ariaControls = `${id}-panel`;
	const ref = useRef<HTMLButtonElement>(null);
	const [tabIndex, focused, handleOnKeyPress, handleClick] = useRovingTabIndex<HTMLButtonElement>(ref, disabled);
	const { onActive } = useContext(TabsContext);


	useFocusOnElement<HTMLButtonElement>(focused, ref);

	useEffect(() => {
		if (onActive && focused) {
			onActive(refId);
		}
	}, [focused])

	return (
		<S.Item
			ref={ref}
			id={refId}
			data-testid="component-tabs-list-button"
			aria-selected={focused}
			role="tab"
			className="tabs__list__button"
			aria-controls={ariaControls}
			aria-label={ariaLabel}
			tabIndex={tabIndex}
			onKeyUp={handleOnKeyPress}
			onClick={handleClick}
		>
			{text}
		</S.Item>
	);
};

TabItem.defaultProps = {
	disabled: false
}


export default TabItem;

import * as React from "react";
import { KEY_CODES, useEvent } from "helpers";
import * as S from "./click-trap-portal.styled";
import Portal from "../portal/index";

interface IClickTrapPortalProps {
	title: string;
	onClickToClose: () => void;
}

/**
 *
 * @extends {React.PureComponent<IClickTrapPortalProps>}
 */
const ClickTrapPortal: React.FunctionComponent<IClickTrapPortalProps> = ({
	title,
	onClickToClose,
	children,
}) => {
	/**
	 * @description Handles the key up press event
	 * @author João Dias
	 * @param {KeyboardEvent} event
	 * @returns {boolean}
	 * @memberof SidebarPortal
	 */
	function handleOnKeyPress(event: KeyboardEvent): boolean {
		if (event.keyCode === KEY_CODES.ESC) {
			onClickToClose();

			return true;
		}

		return false;
	}

	useEvent("keyup", (event) => {
		if (event.keyCode === KEY_CODES.ESC || event.keyCode === KEY_CODES.BACKSPACE) {
			handleOnKeyPress(event);
		}
	});

	return (
		<Portal className="aside-portal opened" isFixed>
			{children}
			<S.Trap
				id="portal-close-button"
				data-testid="component-portal-click-trap"
				type="button"
				onClick={() => onClickToClose()}
				aria-label={title}
			/>
		</Portal>
	);
};

ClickTrapPortal.defaultProps = {
	title: "default title",
};

export default ClickTrapPortal;

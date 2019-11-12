import * as React from "react";
import { holdOn, KEY_CODES } from "helpers";
import * as S from "./click-trap-portal.styled";
import Portal from "../portal/index";

interface IClickTrapPortalProps {
	title: string;
	onClickToClose: () => void;
}

class ClickTrapPortal extends React.PureComponent<IClickTrapPortalProps> {
	static defaultProps = {
		title: "default title",
	};

	async componentDidMount() {
		window.addEventListener("keyup", event => this.handleOnKeyPress(event));

		await holdOn(200);

		const PortalBackButton: HTMLElement | null = document.getElementById("portal-close-button");

		if (PortalBackButton) {
			PortalBackButton.focus();
		}
	}

	componentWillUnmount() {
		window.removeEventListener("keyup", event => this.handleOnKeyPress(event));
	}

	/**
	 * @description Handles the key up press event
	 * @author João Dias
	 * @date 2019-07-11
	 * @param {KeyboardEvent} event
	 * @returns {boolean}
	 * @memberof SidebarPortal
	 */
	handleOnKeyPress(event: KeyboardEvent): boolean {
		const { onClickToClose } = this.props;
		if (event.keyCode === KEY_CODES.ESC) {
			onClickToClose();

			return true;
		}

		return false;
	}

	render() {
		const { title, onClickToClose, children } = this.props;

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
	}
}

export default ClickTrapPortal;

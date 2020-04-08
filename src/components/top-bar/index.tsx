// Libraries
import * as React from "react";
import * as S from "./index.styles";

interface ITopBarProps {
	title?: string;
	onClick?: () => void;
}

/**
 * @description Window Top Bar
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<ITopBarProps>}
 */
const TopBar: React.FunctionComponent<ITopBarProps> = ({ title, onClick }) => {
	/**
	 * When the user clicks on this button:
	 * - it closes the window and returns to the homepage
	 * - or it closes the whole app.
	 *
	 * @returns {void}
	 */
	function onClickOnButton() {
		if (onClick) {
			onClick();
		} else {
			window.close();
		}
	}

	return (
		<S.Wrapper id="top-bar" className="row">
			<button
				type="button"
				data-testid="component-top-bar-button"
				className="top-bar__button button"
				onClick={onClickOnButton}
			>
				<span className="sr-only">Close this window</span>
			</button>
			<div role="presentation" className="top-bar__handle">
				<span className="top-bar__handle__item" />
				<span className="top-bar__handle__item" />
				<span className="top-bar__handle__item" />
				<span className="top-bar__handle__item" />
				<span className="top-bar__handle__item" />
				<span className="top-bar__handle__item" />
			</div>
			<h2 className="top-bar__title">{title}</h2>
		</S.Wrapper>
	);
};

TopBar.defaultProps = {
	title: "Poolside FM",
};

export default React.memo(TopBar);

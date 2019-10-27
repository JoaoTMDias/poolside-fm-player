// Libraries
import * as React from "react";
import * as S from "./top-bar.styled";

interface ITopBarProps {
	title?: string;
}

/**
 * @description Window Top Bar
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<ITopBarProps>}
 */
const TopBar: React.FunctionComponent<ITopBarProps> = ({ title }) => {
	/**
	 * When the user clicks on this button, it closes the whole app.
	 *
	 */
	function onClick() {
		window.close();
	}

	return (
		<S.Wrapper id="top-bar" className="row">
			<button className="top-bar__button button" type="button" onClick={onClick}>
				<span className="sr-only">Close this window</span>
			</button>
			<div role="presentation" className="top-bar__handle" tabIndex={-1}>
				<span className="top-bar__handle__item" tabIndex={-1} />
				<span className="top-bar__handle__item" tabIndex={-1} />
				<span className="top-bar__handle__item" tabIndex={-1} />
				<span className="top-bar__handle__item" tabIndex={-1} />
				<span className="top-bar__handle__item" tabIndex={-1} />
				<span className="top-bar__handle__item" tabIndex={-1} />
			</div>
			<h2 className="top-bar__title">{title}</h2>
		</S.Wrapper>
	);
};

TopBar.defaultProps = {
	title: "Poolside FM",
};

export default React.memo(TopBar);

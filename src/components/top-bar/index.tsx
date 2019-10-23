// Libraries
import * as React from "react";
import * as S from "./top-bar.styled";

/**
 * @description Window Top Bar
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const TopBar: React.FunctionComponent = () => {
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
			<h2 className="top-bar__title">Poolside FM</h2>
		</S.Wrapper>
	);
};

export default React.memo(TopBar);

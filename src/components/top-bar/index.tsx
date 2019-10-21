// Libraries
import * as React from "react";
import * as S from "./top-bar.styled";

// Interface
interface ITopBarProps {
	theme?: any;
}

/**
 * @description Window Top Bar
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<ITopBarProps>}
 */
const TopBar: React.FunctionComponent<ITopBarProps> = props => {
	return (
		<S.Wrapper id="top-bar" className="row">
			<button className="top-bar__button" type="button">
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

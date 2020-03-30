// Libraries
import * as React from "react";
import { RouteProps, Route } from "react-router-dom";

// Interface
interface IWindowProps extends RouteProps {
	id?: string;
}

/**
 * @description Window Component Wrapper
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IWindowProps>}
 */
const Window: React.FunctionComponent<IWindowProps> = ({
	id,
	children,
	exact,
	component,
	path,
}) => {
	return (
		<div id={id} className="window">
			<Route exact={exact} path={path} component={component} />
		</div>
	);
};

Window.defaultProps = {
	id: "window",
};

export default React.memo(Window);

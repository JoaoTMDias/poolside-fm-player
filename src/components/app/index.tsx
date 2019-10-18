// Libraries
import * as React from "react";
import { TopBar, PlayerVisualizer } from "../index.components";

/**
 * @description AppComponent
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const App: React.FunctionComponent = () => {
	return (
		<div id="app" className="root__inner">
			<div id="window" className="window">
				<TopBar />
				<main id="main-content" className="window__main">
					<PlayerVisualizer />
				</main>
			</div>
		</div>
	);
};

export default React.memo(App);

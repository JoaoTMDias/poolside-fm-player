// Libraries
import * as React from "react";
import TopBar from "components/top-bar";

/**
 * @description Settings page
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Settings: React.FunctionComponent = () => {
	return (
		<>
			<TopBar title="Settings" />
			<main id="main-content" className="window__main row">
				<p>Settings Page here</p>
			</main>
		</>
	);
};

export default React.memo(Settings);

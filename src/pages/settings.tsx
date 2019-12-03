// Libraries
import * as React from "react";
import TopBar from "components/top-bar";
import { withRouter, useHistory } from "react-router";
import { ROUTE_HOME } from "data/constants/routes";
import { useEvent, KEY_CODES } from "helpers";
import { Themes } from "data/constants/themes.constants";
import Select from "components/select/select";
import ThemeContext from "contexts/theme-context";

/**
 * Settings page
 *
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Settings: React.FunctionComponent = () => {
	const history = useHistory();
	const { currentIndex, onChangeOption } = React.useContext(ThemeContext);

	useEvent("keyup", event => {
		if (event.keyCode === KEY_CODES.ESC || event.keyCode === KEY_CODES.BACKSPACE) {
			redirectToHome();
		}
	});

	/**
	 * Handles the click on the top bar close button
	 */
	function redirectToHome() {
		history.push(ROUTE_HOME);
	}

	return (
		<>
			<TopBar onClick={redirectToHome} title="Settings" />
			<main id="main-content" className="window__main row">
				<p>Settings Page here</p>
				<Select
					id="theme"
					label="Theme:"
					type="theme"
					placeholder="Choose a Theme"
					options={Themes}
					currentIndex={currentIndex}
					onChange={index => onChangeOption(index)}
				/>
			</main>
		</>
	);
};

export default withRouter(Settings);

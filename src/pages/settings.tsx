// Libraries
import * as React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { ROUTE_HOME } from "../data/constants/routes";
import { useEvent, KEY_CODES } from "../helpers/index";
import { Themes } from "../data/constants";
import Select from "../components/select/select";
import ThemeContext from "../contexts/theme-context";
import TopBar from "../components/top-bar/index";
import Tabs from "components/tabs";

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

	/**
	 * Handles the click on the top bar close button
	 */
	function redirectToHome() {
		history.push(ROUTE_HOME);
	}

	useEvent("keyup", (event) => {
		if (event.keyCode === KEY_CODES.ESC || event.keyCode === KEY_CODES.BACKSPACE) {
			redirectToHome();
		}
	});

	return (
		<>
			<TopBar onClick={redirectToHome} title="Settings" />
			<main id="main-content" className="window__main row">
				<Tabs />
				<Select
					id="theme"
					label="Theme:"
					placeholder="Choose a Theme"
					options={Themes}
					currentIndex={currentIndex}
					onChange={(index) => onChangeOption(index)}
				/>
			</main>
		</>
	);
};

export default withRouter(Settings);

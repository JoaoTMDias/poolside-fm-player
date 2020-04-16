// Libraries
import React, { useRef, useContext, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import { ROUTE_HOME } from "../data/constants/routes";
import { useEvent, KEY_CODES } from "../helpers/index";
import { Themes } from "../data/constants";
import Select from "../components/select/select";
import ThemeContext from "../contexts/theme-context";
import TopBar from "../components/top-bar/index";
import Tabs from "components/tabs";
import { ITabItemProps } from "components/tabs/types";
import { uniqueId } from "helpers/unique-id";
import TabPanel from "components/tabs/TabPanel";
import TabItem from "components/tabs/TabItem";
import TabList from "components/tabs/TabList";

/**
 * Settings page
 *
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Settings: React.FunctionComponent = () => {
	const { current: tabs } = useRef<ITabItemProps[]>([
		{
			id: uniqueId("theme-"),
			text: "Theme",
			ariaLabel: "Setup the player's theme",
		},
		{
			id: uniqueId("preferences-"),
			text: "Preferences",
			ariaLabel: "Customize the preferences for the player",
		}
	]);
	const { push } = useHistory();
	const { currentIndex, onChangeOption } = useContext(ThemeContext);

	/**
	 * Handles the click on the top bar close button
	 */
	function redirectToHome() {
		push(ROUTE_HOME);
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
				<Tabs initialTab={tabs[0].id}>
					<TabList>
						<TabItem
							id={tabs[0].id}
							text={tabs[0].text}
							ariaLabel={tabs[0].ariaLabel}
						/>
						<TabItem
							id={tabs[1].id}
							text={tabs[1].text}
							ariaLabel={tabs[1].ariaLabel}
						/>
					</TabList>
					<TabPanel
						id={tabs[0].id}
					>
						<Select
							id="theme"
							label="Theme:"
							placeholder="Choose a Theme"
							options={Themes}
							currentIndex={currentIndex}
							onChange={(index) => onChangeOption(index)}
						/>
					</TabPanel>
					<TabPanel
						id={tabs[1].id}
					>
						<p>Preferences</p>
					</TabPanel>
				</Tabs>
			</main>
		</>
	);
};

export default withRouter(Settings);

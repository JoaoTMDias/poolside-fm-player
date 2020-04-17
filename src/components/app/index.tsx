// Libraries
import * as React from "react";
import { HashRouter as Router, Switch } from "react-router-dom";
import { ROUTE_HOME, ROUTE_SETTINGS } from "data/constants/routes";
import Homepage from "pages/homepage";
import Settings from "pages/settings";
import Theme from "components/theme";
import Window from "../window/index";
import AnnouncerContext from "contexts/announcer-context";
import AnnouncerContextProvider from "components/announcer/provider";
import { Announcer } from "components/announcer";

/**
 * @description AppComponent
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const App: React.FunctionComponent = () => {
	return (
		<Theme>
			<AnnouncerContextProvider>
				<AnnouncerContext.Consumer>
					{({ text, politeness }) => {
						return <Announcer text={text} politeness={politeness} />
					}}
				</AnnouncerContext.Consumer>
				<Router basename={ROUTE_HOME}>
					<Switch>
						<Window exact path={ROUTE_HOME} component={Homepage} />
						<Window exact path={ROUTE_SETTINGS} component={Settings} />
					</Switch>
				</Router>
			</AnnouncerContextProvider>
		</Theme>
	);
};

export default React.memo(App);

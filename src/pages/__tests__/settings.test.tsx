import React from "react";
import { render, cleanup } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";

import Settings from "pages/settings";

afterEach(cleanup);

describe("<Settings />", () => {
	it("should render the settings page", () => {
		const component = render(
			<Router>
				<Settings />
			</Router>
		);

		expect(component).toMatchSnapshot();
	});
});

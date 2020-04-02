import React from "react";
import { render, cleanup } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";

import Homepage from "pages/homepage";

afterEach(cleanup);

describe("<Homepage />", () => {
	it("should render the homepage", () => {
		const component = render(
			<Router>
				<Homepage />
			</Router>
		);

		expect(component).toMatchSnapshot();
	});
});

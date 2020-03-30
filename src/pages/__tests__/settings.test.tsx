import React from "react";
import { render, cleanup } from "@testing-library/react"

import Settings from "pages/settings";

afterEach(cleanup);

describe("<Settings />", () => {
	it("should render the settings page", () => {
		const component = render(<Settings />);

		expect(component).toMatchSnapshot();
	});
});

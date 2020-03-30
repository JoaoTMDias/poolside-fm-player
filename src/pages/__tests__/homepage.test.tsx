import React from "react";
import { render, cleanup } from "@testing-library/react"

import Homepage from "pages/homepage";

afterEach(cleanup);

describe("<Homepage />", () => {
	it("should render the homepage", () => {
		const component = render(<Homepage />);

		expect(component).toMatchSnapshot();
	});
});

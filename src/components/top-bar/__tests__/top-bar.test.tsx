import React from "react";
import { render, cleanup } from "@testing-library/react"

import TopBar from "components/top-bar/index";

afterEach(cleanup);

describe("<TopBar />", () => {
	it("should render a top-bar", () => {
		const component = render(<TopBar />);

		expect(component).toMatchSnapshot();
	});
});

import React from "react";
import { render, cleanup } from "@testing-library/react";

import App from "../index";

afterEach(cleanup);

describe("<App />", () => {
	it("should render a visualizer", () => {
		const component = render(<App />);

		expect(component).toMatchSnapshot();
	});
});

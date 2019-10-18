import React from "react";
import { shallow } from "enzyme";

import { TopBar } from "../../index.components";

describe("<TopBar />", () => {
	it("should render a top-bar", () => {
		const component = shallow(<TopBar />);

		expect(component).toMatchSnapshot();
	});
});

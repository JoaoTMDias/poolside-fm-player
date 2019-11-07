import React from "react";
import { shallow } from "enzyme";

import Homepage from "pages/homepage";

describe("<Homepage />", () => {
	it("should render the homepage", () => {
		const component = shallow(<Homepage />);

		expect(component).toMatchSnapshot();
	});
});

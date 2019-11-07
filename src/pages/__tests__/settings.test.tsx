import React from "react";
import { shallow } from "enzyme";

import Settings from "pages/settings";

describe("<Settings />", () => {
	it("should render the settings page", () => {
		const component = shallow(<Settings />);

		expect(component).toMatchSnapshot();
	});
});

import React from "react";
import { shallow } from "enzyme";

import PlayerVisualizer from "components/player-visualizer/index";

describe("<PlayerVisualizer />", () => {
	it("should render a visualizer", () => {
		const component = shallow(<PlayerVisualizer />);

		expect(component).toMatchSnapshot();
	});

	it("should add a is-playing class when there is media playing", () => {
		const component = shallow(<PlayerVisualizer isPlaying />);
		expect(component.hasClass("player-visualizer--is-playing")).toBe(true);
	});
});

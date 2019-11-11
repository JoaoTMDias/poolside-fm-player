import React from "react";
import { shallow, mount } from "enzyme";

import PlayerVisualizer from "components/player/visualizer/index";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

describe("<PlayerVisualizer />", () => {
	describe("render", () => {
		it("should render a visualizer", () => {
			const component = shallow(<PlayerVisualizer status={EPlayingStatus.paused} />);

			expect(component).toMatchSnapshot();
		});
	});

	describe("Playing state", () => {
		it("should not render the playing classname by default", () => {
			const component = shallow(<PlayerVisualizer />);

			expect(component.hasClass("player-visualizer--is-playing")).toBe(false);
		});

		it("should render the playing classname if is playing audio", () => {
			const component = <PlayerVisualizer status={EPlayingStatus.playing} />;
			const wrapper = mount(component);

			const visualizer = wrapper.find("[data-testid='player-visualizer-wrapper']");

			expect(visualizer.first().hasClass("player-visualizer--is-playing")).toBe(true);
		});
	});
});

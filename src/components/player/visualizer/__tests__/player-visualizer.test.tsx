import React from "react";
import { shallow, mount } from "enzyme";

import PlayerVisualizer from "components/player/visualizer/index";
import { PlayerControllerContext, defaultPlayerControllerState } from "contexts/player-controller-context";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

describe("<PlayerVisualizer />", () => {
	describe("render", () => {
		it("should render a visualizer", () => {
			const component = shallow(<PlayerVisualizer />);

			expect(component).toMatchSnapshot();
		});
	});

	describe("Playing state", () => {
		it("should not render the playing classname by default", () => {
			const component = shallow(<PlayerVisualizer />);

			expect(component.hasClass("player-visualizer--is-playing")).toBe(false);
		});

		it("should not render the playing classname by default", () => {
			const component = (
				<PlayerControllerContext.Provider
					value={{
						...defaultPlayerControllerState,
						status: EPlayingStatus.playing,
					}}
				>
					<PlayerVisualizer />
				</PlayerControllerContext.Provider>
			);
			const wrapper = mount(component);

			const visualizer = wrapper.find("[data-testid='player-visualizer-wrapper']");

			expect(visualizer.first().hasClass("player-visualizer--is-playing")).toBe(true);
		});
	});
});

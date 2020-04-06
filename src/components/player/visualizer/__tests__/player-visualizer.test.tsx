import React from "react";
import { render, cleanup } from "@testing-library/react";
import PlayerVisualizer from "components/player/visualizer/index";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

afterEach(cleanup);

describe("<PlayerVisualizer />", () => {
	describe("render", () => {
		it("should render a visualizer", () => {
			const component = render(<PlayerVisualizer status={EPlayingStatus.paused} />);

			expect(component).toMatchSnapshot();
		});
	});

	describe("Playing state", () => {
		it("should not render the playing classname by default", async () => {
			const { getByTestId } = render(<PlayerVisualizer />);
			const result = await getByTestId("player-visualizer-wrapper");

			expect(result?.classList.contains("is-playing")).toBe(false);
		});

		it("should render the playing classname if is playing audio", async () => {
			const { getByTestId } = render(<PlayerVisualizer status={EPlayingStatus.playing} />);
			const visualizer = await getByTestId("player-visualizer-wrapper");

			expect(visualizer.classList.contains("is-playing")).toBe(true);
		});
	});
});

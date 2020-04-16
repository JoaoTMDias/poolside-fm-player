import React from "react";
import Audio from "mock-audio-element";
import { render, cleanup } from "@testing-library/react";
import { mount, ReactWrapper } from "enzyme";
import PlayerVisualizer, {
	CAPTIONS,
	IPlayerVisualizerProps,
	IPlayerVisualizerState,
} from "components/player/visualizer/index";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";
import { createCanvas } from "canvas";

afterEach(cleanup);

const getMockedAudioElement = (src?: string) => {
	const mock: HTMLAudioElement = new Audio();

	mock.crossOrigin = "anonymous";

	mock.src = src || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

	return mock;
};

type VisualizerType = ReactWrapper<IPlayerVisualizerProps, IPlayerVisualizerState>;

describe("<PlayerVisualizer />", () => {
	describe("render", () => {
		it("should render a visualizer", () => {
			const component = render(<PlayerVisualizer status={EPlayingStatus.paused} />);

			expect(component).toMatchSnapshot();
		});
	});

	describe("captions", () => {
		function setup(status: EPlayingStatus) {
			const { getByTestId } = render(<PlayerVisualizer status={status} />);

			return {
				visualizer: getByTestId("player-visualizer-wrapper"),
				label: getByTestId("component-player-visualizer-label"),
			};
		}

		it("should render the metadata when the status is idle", () => {
			const { visualizer, label } = setup(EPlayingStatus.idle);

			expect(label.textContent).toBe(CAPTIONS.idle);
			expect(label.classList.contains("player-visualizer__label")).toBe(true);
			expect(label.classList.contains("sr-only")).toBe(false);
			expect(visualizer.classList.contains("is-playing")).toBe(false);
		});

		it("should render the metadata when the status is paused", () => {
			const { visualizer, label } = setup(EPlayingStatus.paused);

			expect(label.textContent).toBe(CAPTIONS.paused);
			expect(label.classList.contains("player-visualizer__label")).toBe(true);
			expect(label.classList.contains("sr-only")).toBe(false);
			expect(visualizer.classList.contains("is-playing")).toBe(false);
		});

		it("should render the metadata when the status has an error", () => {
			const { visualizer, label } = setup(EPlayingStatus.error);

			expect(label.textContent).toBe(CAPTIONS.error);
			expect(label.classList.contains("player-visualizer__label")).toBe(true);
			expect(label.classList.contains("sr-only")).toBe(false);
			expect(visualizer.classList.contains("is-playing")).toBe(false);
		});

		it("should render the metadata when the status is loading", () => {
			const { visualizer, label } = setup(EPlayingStatus.loading);

			expect(label.textContent).toBe(CAPTIONS.loading);
			expect(label.classList.contains("player-visualizer__label")).toBe(true);
			expect(label.classList.contains("sr-only")).toBe(false);
			expect(visualizer.classList.contains("is-playing")).toBe(false);
		});

		it("should render the metadata when the status is ready", () => {
			const { visualizer, label } = setup(EPlayingStatus.ready);

			expect(label.textContent).toBe(CAPTIONS.ready);
			expect(label.classList.contains("player-visualizer__label")).toBe(true);
			expect(label.classList.contains("sr-only")).toBe(false);
			expect(visualizer.classList.contains("is-playing")).toBe(false);
		});

		it("should render the metadata when the status is playing", () => {
			const { visualizer, label } = setup(EPlayingStatus.playing);

			expect(label.textContent).toBe(CAPTIONS.playing);
			expect(label.classList.contains("player-visualizer__label")).toBe(false);
			expect(label.classList.contains("sr-only")).toBe(true);
			expect(visualizer.classList.contains("is-playing")).toBe(true);
		});
	});

	describe("updates", () => {
		it("should update when status changes", () => {
			const { getByTestId, rerender } = render(<PlayerVisualizer status={EPlayingStatus.paused} />);

			const status = getByTestId("player-visualizer-meta").getAttribute("data-status");

			expect(status).toBe("paused");

			rerender(<PlayerVisualizer status={EPlayingStatus.loading} />);

			const newStatus = getByTestId("player-visualizer-meta").getAttribute("data-status");

			expect(newStatus).toBe("loading");
			expect(newStatus !== status).toBe(true);
		});
	});
});

import React from "react";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { HashRouter as Router } from "react-router-dom";
import PlayerController, { getRandomTrackIndex } from "components/player/controller/index";
import PlayerVisualizer, { CAPTIONS } from "components/player/visualizer";
import MediaPlayer from "components/player/media-player";
import PlayerControllerContext from "contexts/player-controller-context";
import { PoolsidePlaylists } from "data/constants";
import Select from "components/select/select";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";
import { holdOn } from "helpers";

// Audio Prototype hacks
window.HTMLMediaElement.prototype.pause = () => {
	/* do nothing */
};

afterEach(cleanup);

describe("<PlayerController />", () => {
	describe("render", () => {
		it("should render the controller", () => {
			const component = render(
				<PlayerController>
					<p>Children</p>
				</PlayerController>
			);

			expect(component).toMatchSnapshot();
		});

		it("should be idle if player exists", async () => {
			const { getByTestId } = await render(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const caption = await getByTestId("component-player-visualizer-label");

			expect(caption?.textContent).toBe(CAPTIONS.idle);
		});
	});

	describe("getRandomTrackIndex", () => {
		it("should return a random number", () => {
			const randomNumber = getRandomTrackIndex(200);
			expect(typeof randomNumber).toBe("number");
		});
	});

	describe("onPrevious", () => {
		it("should change the current track number", async () => {
			const onPreviousMock = jest.fn();

			const { getByTestId } = render(
				<Router>
					<PlayerController onPrevious={onPreviousMock}>
						<MediaPlayer />
					</PlayerController>
				</Router>
			);

			const previousButton = await getByTestId("component-controls-media-button-previous");

			fireEvent.click(previousButton);

			expect(onPreviousMock).toHaveBeenCalledWith(true);
		});
	});

	describe("onNext", () => {
		it("should change the current track number", async () => {
			const onNextMock = jest.fn();

			const { getByTestId } = render(
				<Router>
					<PlayerController onNext={onNextMock}>
						<MediaPlayer />
					</PlayerController>
				</Router>
			);

			const nextButton = await getByTestId("component-controls-media-button-next");

			fireEvent.click(nextButton);

			expect(onNextMock).toHaveBeenCalledWith(true);
		});
	});

	describe("onPlay", () => {
		it("should call the on play prop when click on play button", async () => {
			const onPlayMock = jest.fn();

			const { getByTestId } = render(
				<Router>
					<PlayerController onPlay={onPlayMock}>
						<MediaPlayer />
					</PlayerController>
				</Router>
			);

			const playButton = await getByTestId("component-controls-media-button-play");

			await fireEvent.click(playButton);

			expect(onPlayMock).toHaveBeenCalled()
		});

		it("should not call the on play prop", async () => {
			const onPlayMock = jest.fn();

			const { getByTestId } = render(
				<Router>
					<PlayerController>
						<MediaPlayer />
					</PlayerController>
				</Router>
			);

			const playButton = await getByTestId("component-controls-media-button-play");

			await fireEvent.click(playButton);

			expect(onPlayMock).not.toHaveBeenCalled()
		});
	});

	describe("onChangeOption", () => {
		it("should change the playlist", async () => {
			const { getByTestId } = render(
				<PlayerController>
					<PlayerControllerContext.Consumer>
						{({ currentIndex, onChangeOption }) => {
							return (
								<>
									<Select
										id="channel"
										label="Channel:"
										placeholder="Choose a radio channel"
										options={PoolsidePlaylists}
										currentIndex={currentIndex}
										onChange={(index) => onChangeOption(index)}
									/>
								</>
							);
						}}
					</PlayerControllerContext.Consumer>
				</PlayerController>
			);

			await fireEvent.click(getByTestId("component-select-button"));

			const selectList = getByTestId("component-select-list");
			const options = await Array.from(selectList.querySelectorAll(".select-input__option:not([aria-selected='true'])"));
			const firstOptionButton = await options[0].querySelector(".select-input__option__label");

			if (firstOptionButton) {
				fireEvent.click(firstOptionButton);
			}

			await fireEvent.click(getByTestId("component-select-button"));

			const activeOption = await getByTestId("component-select-list").getAttribute("aria-activedescendant");

			expect(activeOption).toBe(PoolsidePlaylists[1].id);
		});
	});
});

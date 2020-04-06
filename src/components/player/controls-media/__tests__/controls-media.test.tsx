import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import ControlsMedia from "components/player/controls-media";
import {
	EPlayingStatus,
	IControlsMediaProps,
} from "components/player/media-player/player.interfaces";
import { KEY_CODES, hasPressedSpaceOrEnter, getAllById } from "helpers";
import { HashRouter as Router } from "react-router-dom";

afterEach(cleanup);

const ControlsMediaWithRouter: React.FunctionComponent<IControlsMediaProps> = ({
	onClickOnPrevious,
	onTogglePlay,
	onClickOnNext,
	onChangeVolume,
	status,
}) => {
	return (
		<Router>
			<ControlsMedia
				onClickOnPrevious={onClickOnPrevious}
				onTogglePlay={onTogglePlay}
				onClickOnNext={onClickOnNext}
				onChangeVolume={onChangeVolume}
				status={status}
			/>
		</Router>
	);
};

describe("<ControlsMedia />", () => {
	it("should render the component without errors", () => {
		const component = render(<ControlsMediaWithRouter status={EPlayingStatus.paused} />);

		expect(component).toMatchSnapshot();
	});

	describe("Play button", () => {
		it("should be paused by default", async () => {
			const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.paused} />);
			const playButton = await getByTestId("component-controls-media-button-play");

			const iconPlay = await getAllById(playButton, "#icon-play");
			const iconPause = await getAllById(playButton, "#icon-pause");

			expect(iconPlay?.length).toBe(0);
			expect(iconPause?.length).toBe(1);
		});

		it("should be play when a song is playing", async () => {
			const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
			const playButton = await getByTestId("component-controls-media-button-play");
			const iconPlay = getAllById(playButton, "#icon-play");
			const iconPause = getAllById(playButton, "#icon-pause");

			expect(iconPlay?.length).toBe(1);
			expect(iconPause?.length).toBe(0);
		});
	});

	describe("onTogglePlay", () => {
		it("should call on click", async () => {
			const onTogglePlayMock = jest.fn();
			const { getByTestId } = render(
				<ControlsMediaWithRouter onTogglePlay={onTogglePlayMock} status={EPlayingStatus.playing} />
			);
			const playButton = await getByTestId("component-controls-media-button-play");

			fireEvent.click(playButton);

			expect(onTogglePlayMock).toHaveBeenCalled();
		});

		it("should not call on click", async () => {
			const onTogglePlayMock = jest.fn();
			const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
			const playButton = await getByTestId("component-controls-media-button-play");

			fireEvent.click(playButton);

			expect(onTogglePlayMock).not.toHaveBeenCalled();
		});

		describe("should call on press", () => {
			it("on SPACE key", async () => {
				const onTogglePlayMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter
						onTogglePlay={onTogglePlayMock}
						status={EPlayingStatus.playing}
					/>
				);
				const playButton = await getAllByTestId("component-controls-media-button-play")[0];

				fireEvent.keyUp(playButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onTogglePlayMock).toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onTogglePlayMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter
						onTogglePlay={onTogglePlayMock}
						status={EPlayingStatus.playing}
					/>
				);
				const playButton = await getAllByTestId("component-controls-media-button-play")[0];

				fireEvent.keyUp(playButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onTogglePlayMock).toHaveBeenCalled();
			});
		});

		describe("should not call on press", () => {
			it("on SPACE key", async () => {
				const onTogglePlayMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter status={EPlayingStatus.playing} />
				);
				const playButton = await getAllByTestId("component-controls-media-button-play")[0];

				fireEvent.keyUp(playButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onTogglePlayMock).not.toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onTogglePlayMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter status={EPlayingStatus.playing} />
				);
				const playButton = await getAllByTestId("component-controls-media-button-play")[0];

				fireEvent.keyUp(playButton, {
					keyCode: KEY_CODES.ENTER,
				});

				expect(onTogglePlayMock).not.toHaveBeenCalled();
			});
		});
	});

	describe("hasPressedSpaceOrEnter", () => {
		it("should return false if keycode is not SPACE or ENTER", () => {
			expect(hasPressedSpaceOrEnter(KEY_CODES.ARROW_RIGHT)).toBe(false);
			expect(hasPressedSpaceOrEnter(KEY_CODES.ARROW_LEFT)).toBe(false);
			expect(hasPressedSpaceOrEnter(KEY_CODES.TAB)).toBe(false);
			expect(hasPressedSpaceOrEnter(KEY_CODES.ESC)).toBe(false);
		});

		it("should return true if keycode is SPACE or ENTER", () => {
			expect(hasPressedSpaceOrEnter(KEY_CODES.SPACE)).toBe(true);
			expect(hasPressedSpaceOrEnter(KEY_CODES.ENTER)).toBe(true);
		});
	});

	describe("onClickOnPrevious", () => {
		it("should call on click", async () => {
			const onClickOnPreviousMock = jest.fn();
			const { getAllByTestId } = render(
				<ControlsMediaWithRouter
					onClickOnPrevious={onClickOnPreviousMock}
					status={EPlayingStatus.playing}
				/>
			);
			const previousButton = await getAllByTestId("component-controls-media-button-previous")[0];

			fireEvent.click(previousButton);

			expect(onClickOnPreviousMock).toHaveBeenCalled();
		});

		it("should not call on click if no props are passed", async () => {
			const onClickOnPreviousMock = jest.fn();
			const { getAllByTestId } = render(
				<ControlsMediaWithRouter status={EPlayingStatus.playing} />
			);
			const previousButton = await getAllByTestId("component-controls-media-button-previous")[0];

			fireEvent.click(previousButton);

			expect(onClickOnPreviousMock).not.toHaveBeenCalled();
		});

		describe("should call on press", () => {
			it("on SPACE key", async () => {
				const onClickOnPreviousMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter
						onClickOnPrevious={onClickOnPreviousMock}
						status={EPlayingStatus.playing}
					/>
				);
				const previousButton = await getAllByTestId("component-controls-media-button-previous")[0];

				fireEvent.keyUp(previousButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onClickOnPreviousMock).toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onClickOnPreviousMock = jest.fn();
				const { getAllByTestId } = render(
					<ControlsMediaWithRouter
						onClickOnPrevious={onClickOnPreviousMock}
						status={EPlayingStatus.playing}
					/>
				);
				const previousButton = await getAllByTestId("component-controls-media-button-previous")[0];

				fireEvent.keyUp(previousButton, {
					keyCode: KEY_CODES.ENTER,
				});

				expect(onClickOnPreviousMock).toHaveBeenCalled();
			});
		});

		describe("should not call on press", () => {
			it("on SPACE key", async () => {
				const onClickOnPreviousMock = jest.fn();
				const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
				const previousButton = await getByTestId("component-controls-media-button-previous");

				fireEvent.keyUp(previousButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onClickOnPreviousMock).not.toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onClickOnPreviousMock = jest.fn();
				const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
				const previousButton = await getByTestId("component-controls-media-button-previous");

				fireEvent.keyUp(previousButton, {
					keyCode: KEY_CODES.ENTER,
				});

				expect(onClickOnPreviousMock).not.toHaveBeenCalled();
			});
		});
	});

	describe("onClickOnNext", () => {
		it("should call on click", async () => {
			const onClickOnNextMock = jest.fn();
			const { getByTestId } = render(
				<ControlsMediaWithRouter
					onClickOnNext={onClickOnNextMock}
					status={EPlayingStatus.playing}
				/>
			);
			const nextButton = await getByTestId("component-controls-media-button-next");

			fireEvent.click(nextButton);

			expect(onClickOnNextMock).toHaveBeenCalled();
		});

		it("should not call on click", async () => {
			const onClickOnNextMock = jest.fn();
			const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
			const nextButton = await getByTestId("component-controls-media-button-next");

			fireEvent.click(nextButton);

			expect(onClickOnNextMock).not.toHaveBeenCalled();
		});

		describe("should call on press", () => {
			it("on SPACE key", async () => {
				const onClickOnNextMock = jest.fn();
				const { getByTestId } = render(
					<ControlsMediaWithRouter
						onClickOnNext={onClickOnNextMock}
						status={EPlayingStatus.playing}
					/>
				);
				const nextButton = await getByTestId("component-controls-media-button-next");

				fireEvent.keyUp(nextButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onClickOnNextMock).toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onClickOnNextMock = jest.fn();
				const { getByTestId } = render(
					<ControlsMediaWithRouter
						onClickOnNext={onClickOnNextMock}
						status={EPlayingStatus.playing}
					/>
				);
				const nextButton = await getByTestId("component-controls-media-button-next");

				fireEvent.keyUp(nextButton, {
					keyCode: KEY_CODES.ENTER,
				});

				expect(onClickOnNextMock).toHaveBeenCalled();
			});
		});

		describe("should not call on press", () => {
			it("on SPACE key", async () => {
				const onClickOnNextMock = jest.fn();
				const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
				const nextButton = await getByTestId("component-controls-media-button-next");

				fireEvent.keyUp(nextButton, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onClickOnNextMock).not.toHaveBeenCalled();
			});

			it("on ENTER key", async () => {
				const onClickOnNextMock = jest.fn();
				const { getByTestId } = render(<ControlsMediaWithRouter status={EPlayingStatus.playing} />);
				const nextButton = await getByTestId("component-controls-media-button-next");

				fireEvent.keyUp(nextButton, {
					keyCode: KEY_CODES.ENTER,
				});

				expect(onClickOnNextMock).not.toHaveBeenCalled();
			});
		});
	});
});

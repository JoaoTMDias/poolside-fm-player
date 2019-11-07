import React from "react";
import { shallow } from "enzyme";
import ControlsMedia, { hasPressedSpaceOrEnter } from "components/player/controls-media";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";
import { KEY_CODES } from "helpers";

describe("<ControlsMedia />", () => {
	it("should render the component without errors", () => {
		const component = shallow(<ControlsMedia status={EPlayingStatus.paused} />);

		expect(component).toMatchSnapshot();
	});

	describe("Play button", () => {
		it("should be paused by default", () => {
			const component = shallow(<ControlsMedia status={EPlayingStatus.paused} />);
			const playButton = component.find("[data-testid='component-controls-media-button-play']").first();
			const iconPlay = playButton.find("#icon-play");
			const iconPause = playButton.find("#icon-pause");

			expect(iconPlay.length).toBe(0);
			expect(iconPause.length).toBe(1);
		});

		it("should be play when a song is playing", () => {
			const component = shallow(<ControlsMedia status={EPlayingStatus.playing} />);
			const playButton = component.find("[data-testid='component-controls-media-button-play']").first();
			const iconPlay = playButton.find("#icon-play");
			const iconPause = playButton.find("#icon-pause");

			expect(iconPlay.length).toBe(1);
			expect(iconPause.length).toBe(0);
		});

		describe("onTogglePlay", () => {
			it("should call on click", () => {
				const onTogglePlayMock = jest.fn();
				const component = shallow(<ControlsMedia onTogglePlay={onTogglePlayMock} status={EPlayingStatus.playing} />);
				const playButton = component.find("[data-testid='component-controls-media-button-play']").first();

				playButton.simulate("click");

				expect(onTogglePlayMock).toHaveBeenCalled();
			});

			describe("should call on press", () => {
				it("on SPACE key", () => {
					const onTogglePlayMock = jest.fn();
					const component = shallow(<ControlsMedia onTogglePlay={onTogglePlayMock} status={EPlayingStatus.playing} />);
					const playButton = component.find("[data-testid='component-controls-media-button-play']").first();

					playButton.simulate("keyup", {
						keyCode: KEY_CODES.SPACE,
					});

					expect(onTogglePlayMock).toHaveBeenCalled();
				});

				it("on ENTER key", () => {
					const onTogglePlayMock = jest.fn();
					const component = shallow(<ControlsMedia onTogglePlay={onTogglePlayMock} status={EPlayingStatus.playing} />);
					const playButton = component.find("[data-testid='component-controls-media-button-play']").first();

					playButton.simulate("keyup", {
						keyCode: KEY_CODES.ENTER,
					});

					expect(onTogglePlayMock).toHaveBeenCalled();
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
			it("should call on click", () => {
				const onClickOnPreviousMock = jest.fn();
				const component = shallow(
					<ControlsMedia onClickOnPrevious={onClickOnPreviousMock} status={EPlayingStatus.playing} />,
				);
				const previousButton = component.find("[data-testid='component-controls-media-button-previous']").first();

				previousButton.simulate("click");

				expect(onClickOnPreviousMock).toHaveBeenCalled();
			});

			describe("should call on press", () => {
				it("on SPACE key", () => {
					const onClickOnPreviousMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnPrevious={onClickOnPreviousMock} status={EPlayingStatus.playing} />,
					);

					const previousButton = component.find("[data-testid='component-controls-media-button-previous']").first();

					previousButton.simulate("keyup", {
						keyCode: KEY_CODES.SPACE,
					});

					expect(onClickOnPreviousMock).toHaveBeenCalled();
				});

				it("on ENTER key", () => {
					const onClickOnPreviousMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnPrevious={onClickOnPreviousMock} status={EPlayingStatus.playing} />,
					);

					const previousButton = component.find("[data-testid='component-controls-media-button-previous']").first();

					previousButton.simulate("keyup", {
						keyCode: KEY_CODES.ENTER,
					});

					expect(onClickOnPreviousMock).toHaveBeenCalled();
				});
			});
		});

		describe("onClickOnNext", () => {
			it("should call on click", () => {
				const onClickOnNextMock = jest.fn();
				const component = shallow(<ControlsMedia onClickOnNext={onClickOnNextMock} status={EPlayingStatus.playing} />);
				const nextButton = component.find("[data-testid='component-controls-media-button-next']").first();

				nextButton.simulate("click");

				expect(onClickOnNextMock).toHaveBeenCalled();
			});

			describe("should call on press", () => {
				it("on SPACE key", () => {
					const onClickOnNextMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnNext={onClickOnNextMock} status={EPlayingStatus.playing} />,
					);

					const nextButton = component.find("[data-testid='component-controls-media-button-next']").first();

					nextButton.simulate("keyup", {
						keyCode: KEY_CODES.SPACE,
					});

					expect(onClickOnNextMock).toHaveBeenCalled();
				});

				it("on ENTER key", () => {
					const onClickOnNextMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnNext={onClickOnNextMock} status={EPlayingStatus.playing} />,
					);

					const nextButton = component.find("[data-testid='component-controls-media-button-next']").first();

					nextButton.simulate("keyup", {
						keyCode: KEY_CODES.ENTER,
					});

					expect(onClickOnNextMock).toHaveBeenCalled();
				});
			});
		});

		describe("onClickOnVolume", () => {
			it("should call on click", () => {
				const onClickOnVolumeMock = jest.fn();
				const component = shallow(
					<ControlsMedia onClickOnVolume={onClickOnVolumeMock} status={EPlayingStatus.playing} />,
				);
				const volumeButton = component.find("[data-testid='component-controls-media-button-volume']").first();

				volumeButton.simulate("click");

				expect(onClickOnVolumeMock).toHaveBeenCalled();
			});

			describe("should call on press", () => {
				it("on SPACE key", () => {
					const onClickOnVolumeMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnVolume={onClickOnVolumeMock} status={EPlayingStatus.playing} />,
					);

					const volumeButton = component.find("[data-testid='component-controls-media-button-volume']").first();

					volumeButton.simulate("keyup", {
						keyCode: KEY_CODES.SPACE,
					});

					expect(onClickOnVolumeMock).toHaveBeenCalled();
				});

				it("on ENTER key", () => {
					const onClickOnVolumeMock = jest.fn();
					const component = shallow(
						<ControlsMedia onClickOnVolume={onClickOnVolumeMock} status={EPlayingStatus.playing} />,
					);

					const volumeButton = component.find("[data-testid='component-controls-media-button-volume']").first();

					volumeButton.simulate("keyup", {
						keyCode: KEY_CODES.ENTER,
					});

					expect(onClickOnVolumeMock).toHaveBeenCalled();
				});
			});
		});
	});
});

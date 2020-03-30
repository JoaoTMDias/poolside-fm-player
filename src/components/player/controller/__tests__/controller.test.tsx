import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import PlayerController, { getRandomTrackIndex } from "components/player/controller/index";
import PlayerVisualizer from "components/player/visualizer";
import { IPlayerControllerState } from "contexts/player-controller-context";
import {
	EPlayingStatus,
	IMediaPlayerTrackMetadata,
} from "components/player/media-player/player.interfaces";
import { playlist } from "../__mocks__/playlist";

// Audio Prototype hacks
window.HTMLMediaElement.prototype.pause = () => {
	/* do nothing */
};

describe("<PlayerController />", () => {
	describe("render", () => {
		it("should render the controller", () => {
			const component = shallow(<PlayerController />);

			expect(component).toMatchSnapshot();
		});
	});

	describe("getRandomTrackIndex", () => {
		it("should return a random number", () => {
			const randomNumber = getRandomTrackIndex(200);
			expect(typeof randomNumber).toBe("number");
		});
	});

	describe("onPrevious", () => {
		it("should return false if no player exists", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;

			expect(instance.onPrevious(null)).toBeFalsy();
		});

		it("should change the current track number", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;
			const track = {
				current: 2,
				last: 200,
			};

			wrapper.setState({
				track,
			});

			instance.onPrevious(track);

			expect(wrapper.state().track.current).toBe(1);
		});

		it("should change the current track number to the last one", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;

			const track = {
				current: 0,
				last: 100,
			};

			wrapper.setState({
				track,
			});

			instance.onPrevious(track);

			expect(wrapper.state().track.current).toBe(100);
		});
	});

	describe("onNext", () => {
		it("should change the current track number", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;
			const track = {
				current: 2,
				last: 50,
			};

			wrapper.setState({
				track,
			});

			instance.onNext(track);

			expect(wrapper.state().track.current).toEqual(3);
		});

		it("should change the current track number to the first item in the array index", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;
			const track = {
				current: 200,
				last: 200,
			};

			wrapper.setState({
				track,
			});

			instance.onNext(track);

			expect(wrapper.state().track.current).toEqual(0);
		});
	});

	describe("onPlay", () => {
		it("should do nothing by default if no state is passed", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();

			const instance = wrapper.instance() as PlayerController;
			instance.handlePlayingStatus = mock;

			instance.onPlay();

			expect(mock).toHaveReturnedTimes(0);
		});

		it("should switch to play if paused", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();

			const instance = wrapper.instance() as PlayerController;
			instance.handlePlayingStatus = mock;

			instance.onPlay(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.playing);
		});

		it("should switch to paused if playing", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();

			const instance = wrapper.instance() as PlayerController;
			instance.handlePlayingStatus = mock;

			instance.onPlay(EPlayingStatus.playing);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.paused);
		});
	});

	describe("onChangeOption", () => {
		it("should stop playing when called", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;

			instance.onChangeOption(1);

			expect(wrapper.state().currentIndex).toBe(1);
			expect(instance.player.playing).toBe(false);
		});
	});

	describe("updateStatus", () => {
		it("should update the state with the new playing status", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;

			instance.updateStatus(EPlayingStatus.playing);

			expect(wrapper.state().status).toBe(EPlayingStatus.playing);
		});
	});

	describe("updateMetadata", () => {
		it("should update the state with the new trackmetadata", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;

			const state: IMediaPlayerTrackMetadata = {
				title: "FMI",
				artist: "JMBranco",
			};

			instance.updateMetadata(state);

			expect(wrapper.state().title).toBe(state.title);
			expect(wrapper.state().artist).toBe(state.artist);
		});
	});

	describe("handlePlayingStatus", () => {
		it("should call updateStatus", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();
			const instance = wrapper.instance() as PlayerController;

			instance.updateStatus = mock;

			instance.handlePlayingStatus(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.paused);
		});

		it("should not call play or pause", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mockPlay = jest.fn();
			const mockPause = jest.fn();
			const instance = wrapper.instance() as PlayerController;

			instance.player.play = mockPlay;
			instance.player.pause = mockPause;

			instance.handlePlayingStatus(null);

			expect(mockPlay).not.toHaveBeenCalled();
			expect(mockPause).not.toHaveBeenCalled();
		});

		it("should play a song", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();
			const instance = wrapper.instance() as PlayerController;

			instance.player.play = mock;

			instance.handlePlayingStatus(EPlayingStatus.playing);

			expect(mock).toHaveBeenCalled();
		});

		it("should paused a song", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);
			const mock = jest.fn();
			const instance = wrapper.instance() as PlayerController;

			instance.player.pause = mock;

			instance.handlePlayingStatus(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalled();
		});
	});

	describe("initPlaylist", () => {
		it("should change the track state", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>
			);

			const instance = wrapper.instance() as PlayerController;
			const track = {
				current: 2,
				last: 50,
			};

			wrapper.setState({
				track,
			});

			instance.initPlaylist(playlist);

			expect(typeof wrapper.state().track.current).toBe("number");
		});
	});
});

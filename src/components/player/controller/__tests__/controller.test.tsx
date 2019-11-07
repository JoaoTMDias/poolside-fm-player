import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import PlayerController, { getRandomTrackIndex } from "components/player/controller/index";
import PlayerVisualizer from "components/player/visualizer";
import { IPlayerControllerState } from "contexts/player-controller-context";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";

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

	describe("onClickOnPrevious", () => {
		it("should change the current track number", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const PlayerControllerInstance = wrapper.instance();
			const track = {
				current: 2,
				last: 200,
			};

			wrapper.setState({
				track,
			});

			PlayerControllerInstance.onClickOnPrevious(track);

			expect(wrapper.state().track.current).toBe(1);
		});

		it("should change the current track number to the last one", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const PlayerControllerInstance = wrapper.instance();

			const track = {
				current: 0,
				last: 200,
			};

			wrapper.setState({
				track,
			});

			PlayerControllerInstance.onClickOnPrevious(track);

			expect(wrapper.state().track.current).toBe(200);
		});
	});

	describe("onClickOnNext", () => {
		it("should change the current track number", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const PlayerControllerInstance = wrapper.instance();
			const track = {
				current: 2,
				last: 50,
			};

			wrapper.setState({
				track,
			});

			PlayerControllerInstance.onClickOnNext(track);

			expect(wrapper.state().track.current).toEqual(3);
		});

		it("should change the current track number to the first item in the array index", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const instance = wrapper.instance();
			const track = {
				current: 200,
				last: 200,
			};

			wrapper.setState({
				track,
			});

			instance.onClickOnNext(track);

			expect(wrapper.state().track.current).toEqual(0);
		});
	});

	describe("onTogglePlay", () => {
		it("should switch to play by default", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();

			const instance = wrapper.instance();
			instance.handleMediaPlayer = mock;

			instance.onTogglePlay();

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.playing);
		});

		it("should switch to play if paused", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();

			const instance = wrapper.instance();
			instance.handleMediaPlayer = mock;

			instance.onTogglePlay(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.playing);
		});

		it("should switch to paused if playing", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();

			const instance = wrapper.instance();
			instance.handleMediaPlayer = mock;

			instance.onTogglePlay(EPlayingStatus.playing);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.paused);
		});
	});

	describe("onChangePlaylist", () => {
		it("should stop playing when called", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const instance = wrapper.instance();

			instance.onChangePlaylist(1);

			expect(wrapper.state().currentPlaylistIndex).toBe(1);
			expect(wrapper.instance().player.playing).toBe(false);
		});
	});

	describe("updatePlayingStatus", () => {
		it("should update the state with the new playing status", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);

			const instance = wrapper.instance();

			instance.updatePlayingStatus(EPlayingStatus.playing);

			expect(wrapper.state().status).toBe(EPlayingStatus.playing);
		});
	});

	describe("handleMediaPlayer", () => {
		it("should call updatePlayingStatus", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();
			const instance = wrapper.instance();

			instance.updatePlayingStatus = mock;

			instance.handleMediaPlayer(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalledWith(EPlayingStatus.paused);
		});

		it("should not call play or pause", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mockPlay = jest.fn();
			const mockPause = jest.fn();
			const instance = wrapper.instance();

			instance.player.play = mockPlay;
			instance.player.pause = mockPause;

			instance.handleMediaPlayer();

			expect(mockPlay).not.toHaveBeenCalled();
			expect(mockPause).not.toHaveBeenCalled();
		});

		it("should play a song", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();
			const instance = wrapper.instance();

			instance.player.play = mock;

			instance.handleMediaPlayer(EPlayingStatus.playing);

			expect(mock).toHaveBeenCalled();
		});

		it("should paused a song", () => {
			const wrapper: ReactWrapper<{}, IPlayerControllerState> = mount<PlayerController>(
				<PlayerController>
					<PlayerVisualizer />
				</PlayerController>,
			);
			const mock = jest.fn();
			const instance = wrapper.instance();

			instance.player.pause = mock;

			instance.handleMediaPlayer(EPlayingStatus.paused);

			expect(mock).toHaveBeenCalled();
		});
	});
});

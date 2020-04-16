import React, { useRef, useState, useReducer } from "react";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants";
import {
	PlayerControllerContext,
	defaultPlayerControllerState,
	IPlayerControllerContext,
} from "contexts/player-controller-context";
import { useDidMount } from "helpers/custom-hooks/use-lifecycle-hooks";
import {
	ISoundcloudPlayer,
	EPlayingStatus,
	ISoundcloudPlaylist,
	ESoundCloudPlayerEvents,
	IMediaPlayerTrackMetadata,
} from "../media-player/player.interfaces";
import { updateTrackReducer } from "./update-tracker-reducer";
import { updateStatusReducer } from "./update-status-reducer";
import { isNil } from "helpers";

/**
 * Get a random number between a range
 *
 * @param {number} allTracks
 * @returns
 */
export function getRandomTrackIndex(allTracks: number) {
	const min = Math.ceil(0);
	const max = Math.floor(allTracks);
	return Math.floor(Math.random() * (max - min)) + min;
}

export interface IPlayerControllerProps {
	onPrevious?: (hasChanged: boolean) => void;
	onNext?: (hasChanged: boolean) => void;
	onPlay?: (status: EPlayingStatus) => void;
	onChangeVolume?: (volume: number) => void;
	children: React.ReactNode;
}

/**
 * PlayerController
 *
 * Controls the player instance.
 * Plays, pauses, changes tracks and then updates the state and sends it through the Context API.
 *
 */
const PlayerController: React.FunctionComponent<IPlayerControllerProps> = ({
	onPrevious,
	onNext,
	onPlay,
	onChangeVolume,
	children,
}) => {
	const { current: player } = useRef<ISoundcloudPlayer>(
		new SoundCloudAudio(process.env.REACT_APP_API_KEY)
	);
	const [artist, setArtist] = useState(defaultPlayerControllerState.artist);
	const [title, setTitle] = useState(defaultPlayerControllerState.title);
	const [duration] = useState(defaultPlayerControllerState.duration);
	const [currentTime] = useState(defaultPlayerControllerState.currentTime);
	const [currentIndex, setCurrentIndex] = useState(defaultPlayerControllerState.currentIndex);
	const [track, updateTrack] = useReducer(updateTrackReducer, defaultPlayerControllerState.track);
	const [status, updateStatus] = useReducer(
		updateStatusReducer,
		defaultPlayerControllerState.status
	);

	/**
	 * Handles the click on the previous button
	 *
	 * @returns {boolean}
	 */
	function _onPrevious(): boolean {
		let hasChanged = false;

		if (player && track) {
			const { current, last } = track;
			const previousIndex = current <= 0 ? last : current - 1;

			updateTrack({
				type: "CURRENT",
				payload: previousIndex,
			});

			if (player?.playing && player?.previous) {
				player.previous();
			}

			hasChanged = true;
		}

		if (onPrevious) {
			onPrevious(hasChanged);
		}

		return hasChanged;
	}

	/**
	 * Handles the click on the next button
	 *
	 * @returns {boolean}
	 */
	function _onNext(): boolean {
		let hasChanged = false;

		if (player && track) {
			const { current, last } = track;

			const nextIndex = current === last ? 0 : current + 1;

			updateTrack({
				type: "CURRENT",
				payload: nextIndex,
			});

			if (player?.next && player?.playing) {
				player.next();
			}

			hasChanged = true;
		}

		if (onNext) {
			onNext(hasChanged);
		}

		return hasChanged;
	}

	/**
	 * Handles the new status.
	 *
	 * @returns {void}
	 */
	function handleNewStatus(): void {
		if (player && player.play && player.pause) {
			switch (status) {
				case EPlayingStatus.playing:
					player.pause();
					break;

				case EPlayingStatus.ready:
				case EPlayingStatus.paused:
					player.play({
						playlistIndex: track.current,
					});
					break;

				default:
					break;
			}
		}
	}

	/**
	 * Callback for handling the clicking on the play button
	 *
	 * @returns {EPlayingStatus | null}
	 */
	function _onPlay(): void {
		switch (status) {
			case EPlayingStatus.ready:
			case EPlayingStatus.paused:
				updateStatus({
					type: "PLAY",
				});
				break;

			case EPlayingStatus.playing:
				updateStatus({
					type: "PAUSE",
				});
				break;

			default:
			case EPlayingStatus.idle:
			case EPlayingStatus.loading:
			case EPlayingStatus.error:
				break;
		}

		handleNewStatus();

		if (onPlay) {
			onPlay(status);
		}
	}

	/**
	 * Changes the volume of the current playing audio
	 *
	 * @param {number} volume
	 */
	function _onChangeVolume(volume: number) {
		const { audio } = player;
		if (player && audio && volume) {
			audio.volume = volume;

			if (onChangeVolume) {
				onChangeVolume(volume);
			}
		}
	}

	/**
	 * Returns the current tracks title and artist
	 *
	 * @param {number} index
	 * @returns {(IMediaPlayerTrackMetadata | null)}
	 */
	function getCurrentTrackAndArtist(index: number): IMediaPlayerTrackMetadata | null {
		if (index && player?._playlist) {
			// eslint-disable no-underscore-dangle
			const { title: currentTitle } = player._playlist.tracks[index];
			const { user } = player._playlist.tracks[index];
			// eslint-enable no-underscore-dangle

			const currentArtist = user && user.username;

			if (title && artist) {
				return {
					title: currentTitle,
					artist: currentArtist,
				};
			}
		}

		return null;
	}

	/**
	 * Loads a new playlist
	 *
	 * @param {ISoundcloudPlaylist} playlist
	 */
	async function loadPlaylist(playlist: ISoundcloudPlaylist) {
		const current = getRandomTrackIndex(playlist.track_count);
		const last = playlist.track_count - 1;

		updateStatus({
			type: "LOAD",
		});

		if (player && player.on && player) {
			// once playlist is loaded it can be played
			updateTrack({
				type: "TRACK",
				payload: {
					current,
					last,
				},
			});

			updateStatus({
				type: "READY",
			});

			player.on(ESoundCloudPlayerEvents.canplay, () => {
				const { _playlistIndex } = player;
				const metadata = _playlistIndex ? getCurrentTrackAndArtist(_playlistIndex) : null;

				if (metadata) {
					setTitle(metadata.title);
					setArtist(metadata.artist);
				}
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				_onNext();
			});
		}
	}

	/**
	 * get the current playlist and starts a new playlist instance
	 *
	 * @returns {void}
	 */
	function startPlaylist(): void {
		const currentPlaylist = PoolsidePlaylists[currentIndex].url;

		if (player?.resolve && currentPlaylist) {
			player.resolve(currentPlaylist, (playlist: ISoundcloudPlaylist) => {
				loadPlaylist(playlist);
			});
		}
	}

	/**
	 * When the user selects a new playlist, updates the current playlist index state
	 *
	 * @param {number} index
	 * @returns {void}
	 */
	function _onChangeOption(index: number): void {
		if (!isNil(index) && player && player.stop) {
			player.stop();

			setCurrentIndex(index);
			startPlaylist();
		}
	}

	useDidMount(() => {
		if (player) {
			startPlaylist();
		}
	});

	const contextValue: IPlayerControllerContext = {
		status,
		artist,
		title,
		duration,
		currentTime,
		currentIndex,
		track,
		audio: player.audio,
		previous: () => _onPrevious(),
		next: () => _onNext(),
		togglePlay: () => _onPlay(),
		changeVolume: (volume) => _onChangeVolume(volume),
		onChangeOption: (index) => _onChangeOption(index),
	};

	return (
		<PlayerControllerContext.Provider value={contextValue}>
			{children}
		</PlayerControllerContext.Provider>
	);
};

export default PlayerController;

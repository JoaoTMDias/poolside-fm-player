import React, { useRef, useState, useReducer } from "react";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants";
import {
	PlayerControllerContext,
	defaultPlayerControllerState,
	IPlayerControllerTrack,
	IPlayerControllerContext,
} from "contexts/player-controller-context";
import { useOnMount } from "helpers/use-lifecycle-hooks";
import {
	ISoundcloudPlayer,
	EPlayingStatus,
	ISoundcloudPlaylist,
	ESoundCloudPlayerEvents,
	IMediaPlayerTrackMetadata,
} from "../media-player/player.interfaces";

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

type UPDATE_TRACK_ACTION_TYPE = "CURRENT" | "LAST" | "TRACK";
interface IUpdateTrackAction {
	type: UPDATE_TRACK_ACTION_TYPE;
	payload: number | IPlayerControllerTrack;
}

/**
 *
 *
 * @param {IPlayerControllerTrack} state
 * @param {IUpdateTrackAction} action
 * @returns
 */
function updateTrackReducer(state: IPlayerControllerTrack, action: IUpdateTrackAction): IPlayerControllerTrack {
	switch (action.type) {
		case "CURRENT":
			return {
				...state,
				current: action.payload as number
			}

		case "LAST":
			return {
				...state,
				last: action.payload as number
			}

		case "TRACK":
			return {
				...state,
				...action.payload as IPlayerControllerTrack
			}

		default:
			return state;
	}
}

/**
 * PlayerController
 *
 * Controls the player instance.
 * Plays, pauses, changes tracks and then updates the state and sends it through the Context API.
 *
 */
const PlayerController: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
	const { current: player } = useRef<ISoundcloudPlayer>(new SoundCloudAudio("1df3275a3b94dfba2d1d4fac65562601"));
	const [status, setStatus] = useState<EPlayingStatus>(defaultPlayerControllerState.status);
	const [artist, setArtist] = useState(defaultPlayerControllerState.artist);
	const [title, setTitle] = useState(defaultPlayerControllerState.title);
	const [duration] = useState(defaultPlayerControllerState.duration);
	const [currentTime] = useState(defaultPlayerControllerState.currentTime);
	const [currentIndex, setCurrentIndex] = useState(defaultPlayerControllerState.currentIndex);
	const [track, updateTrack] = useReducer(updateTrackReducer, defaultPlayerControllerState.track);

	/**
	 * Handles the click on the previous button
	 *
	 * @returns {boolean}
	 */
	function onPrevious(): boolean {
		let hasChanged = false;

		if (player && track) {
			const { current, last } = track;
			const previousIndex = current <= 0 ? last : current - 1;

			updateTrack({
				type: "CURRENT",
				payload: previousIndex
			});

			if (player?.playing && player?.previous) {
				player.previous();
			}

			hasChanged = true;
		}

		return hasChanged;
	}

	/**
	 * Handles the click on the next button
	 *
	 * @returns {void}
	 */
	function onNext() {
		if (player && track) {
			const { current, last } = track;

			const nextIndex = current === last ? 0 : current + 1;

			updateTrack({
				type: "CURRENT",
				payload: nextIndex
			});

			if (player?.next && player?.playing) {
				player.next();
			}
		}
	}

	/**
	 * Handles the playing status.
	 * If playing, it becomes paused and reverse.
	 *
	 * @param {EPlayingStatus} newStatus
	 * @returns {void}
	 */
	function handlePlayingStatus(newStatus: EPlayingStatus | null): void {
		if (player?.play && player?.pause && track && newStatus) {
			switch (newStatus) {
				case EPlayingStatus.playing:
					player.play({
						playlistIndex: track.current,
					});
					break;

				case EPlayingStatus.paused:
					player.pause();
					break;

				default:
					break;
			}

			setStatus(status);
		}
	}

	/**
	 * Callback for handling the clicking on the play button
	 *
	 * @returns {EPlayingStatus | null}
	 */
	function onPlay(): EPlayingStatus | null {
		if (status) {
			let next = EPlayingStatus.paused;

			if (status === EPlayingStatus.paused) {
				next = EPlayingStatus.playing;
			} else if (status === EPlayingStatus.playing) {
				next = EPlayingStatus.paused;
			}

			handlePlayingStatus(next);

			return next;
		}

		return null;
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
	 * Initiates a new playlist
	 *
	 * @param {ISoundcloudPlaylist} playlist
	 */
	function initPlaylist(playlist: ISoundcloudPlaylist) {
		const current = getRandomTrackIndex(playlist.track_count);
		const last = playlist.track_count - 1;

		if (player && player.on) {
			// once playlist is loaded it can be played
			updateTrack({
				type: "TRACK",
				payload: {
					current,
					last
				}
			});

			player.on(ESoundCloudPlayerEvents.canplay, () => {
				const { _playlistIndex } = player;
				const metadata = _playlistIndex ? getCurrentTrackAndArtist(_playlistIndex) : null;

				if (metadata) {
					setTitle(title);
					setArtist(artist);
				}
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				onNext();
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
				initPlaylist(playlist);
			});
		}
	}

	/**
	 * When the user selects a new playlist, updates the current playlist index state
	 *
	 * @param {number} index
	 * @returns {void}
	 */
	function onChangeOption(index: number): void {
		if (index && player && player.stop) {
			player.stop();

			setCurrentIndex(index);
			setStatus(EPlayingStatus.paused);
			startPlaylist()
		}
	}

	useOnMount(() => {
		if (player) {
			startPlaylist()
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
		previous: () => onPrevious(),
		next: () => onNext(),
		togglePlay: () => onPlay(),
		changeVolume: () => { },
		onChangeOption: (index: number) => onChangeOption(index),
	};

	return (
		<PlayerControllerContext.Provider value={contextValue}>
			{children}
		</PlayerControllerContext.Provider>
	);
}

export default PlayerController;

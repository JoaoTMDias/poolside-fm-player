import * as React from "react";
import produce from "immer";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants/playlists.constants";

import {
	PlayerControllerContext,
	IPlayerControllerState,
	defaultPlayerControllerState,
} from "contexts/player-controller-context";
import { ISoundcloudPlayer, EPlayingStatus, ISoundcloudPlaylist, ESoundCloudPlayerEvents } from "../player.interfaces";

class PlayerController extends React.Component<{}, IPlayerControllerState> {
	private player: ISoundcloudPlayer;

	constructor(props: {}) {
		super(props);

		this.state = defaultPlayerControllerState;

		// Binds
		this.onClickOnPrevious = this.onClickOnPrevious.bind(this);
		this.onTogglePlay = this.onTogglePlay.bind(this);
		this.onClickOnNext = this.onClickOnNext.bind(this);

		// Refs
		this.player = new SoundCloudAudio("417cbb93a08aacd6fe709f7ae764d91a");
	}

	componentDidMount() {
		const { currentPlaylistIndex } = this.state;
		const currentPlaylist = PoolsidePlaylists[currentPlaylistIndex].url;

		this.initSoundcloudPlayer(currentPlaylist);
	}

	/**
	 * Handles the click on the previous button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnPrevious() {
		const { track } = this.state;

		if (this.player) {
			const previousIndex = track.current <= 0 ? track.last : track.current - 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = previousIndex;
				}),
				() => {
					this.player.previous();
				},
			);
		}
	}

	/**
	 * Handles the click on the next button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnNext() {
		const { track } = this.state;
		if (this.player) {
			const nextIndex = track.current === track.last ? 0 : track.current + 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = nextIndex;
				}),
				() => {
					this.player.next();
				},
			);
		}
	}

	/**
	 *
	 *
	 * @memberof MediaPlayer
	 */
	onTogglePlay() {
		const { status } = this.state;

		let nextStatus;

		switch (status) {
			default:
			case EPlayingStatus.paused:
				nextStatus = EPlayingStatus.playing;
				break;

			case EPlayingStatus.playing:
				nextStatus = EPlayingStatus.paused;
		}

		this.handleMediaPlayer(nextStatus);
	}

	/**
	 * When the user selects a new playlist, updates the current playlist index state
	 *
	 * @param {number} index
	 * @memberof PlayerController
	 */
	onChangePlaylist(index: number) {
		this.setState({
			currentPlaylistIndex: index,
		});
	}

	/**
	 * Get a random number between a range
	 *
	 * @param {number} allTracks
	 * @returns
	 * @memberof PlayerController
	 */
	getRandomTrackIndex(allTracks: number) {
		const min = Math.ceil(0);
		const max = Math.floor(allTracks);
		return Math.floor(Math.random() * (max - min)) + min;
	}

	/**
	 * Initiates a new playlist
	 *
	 * @param {string} currentPlaylist
	 * @memberof PlayerController
	 */
	initSoundcloudPlayer(currentPlaylist: string) {
		this.player.resolve(currentPlaylist, (playlist: ISoundcloudPlaylist) => {
			const { player } = this;

			const randomTrack = this.getRandomTrackIndex(playlist.track_count);

			// once playlist is loaded it can be played
			player.on(ESoundCloudPlayerEvents.canplay, () => {
				this.setState({
					track: {
						current: randomTrack,
						last: playlist.track_count - 1,
					},
				});
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				this.onClickOnNext();
			});
		});
	}

	/**
	 *
	 *
	 * @param {EPlayingStatus} status
	 * @memberof MediaPlayer
	 */
	handleMediaPlayer(status: EPlayingStatus) {
		const { player } = this;
		const { track } = this.state;

		if (player) {
			switch (status) {
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

			this.updatePlayingStatus(status);
		}
	}

	/**
	 *
	 *
	 * @param {EPlayingStatus} status
	 * @memberof MediaPlayer
	 */
	updatePlayingStatus(status: EPlayingStatus) {
		this.setState({
			status,
		});
	}

	public render() {
		const { children } = this.props;

		const contextValue = {
			...this.state,
			previous: () => this.onClickOnPrevious(),
			next: () => this.onClickOnNext(),
			togglePlay: () => this.onTogglePlay(),
			changeVolume: () => {},
			changePlaylist: (index: number) => this.onChangePlaylist(index),
		};
		return <PlayerControllerContext.Provider value={contextValue}>{children}</PlayerControllerContext.Provider>;
	}
}

export default PlayerController;

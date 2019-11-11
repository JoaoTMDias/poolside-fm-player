/* eslint-disable no-underscore-dangle */
import * as React from "react";
import produce from "immer";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants/playlists.constants";
import {
	PlayerControllerContext,
	IPlayerControllerState,
	defaultPlayerControllerState,
	IPlayerControllerTrack,
} from "contexts/player-controller-context";
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
 * @memberof PlayerController
 */
export function getRandomTrackIndex(allTracks: number) {
	const min = Math.ceil(0);
	const max = Math.floor(allTracks);
	return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Controls the player
 *
 * @class PlayerController
 * @extends {React.Component<{}, IPlayerControllerState>}
 */
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
		this.player = new SoundCloudAudio("xkpqYPmDf6KG7aL1xM4qfWaJQrHBLSOh");
	}

	componentDidMount() {
		this.initPlaylist();
	}

	/**
	 * Handles the click on the previous button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnPrevious(track: IPlayerControllerTrack) {
		if (this.player) {
			const { current, last } = track;
			const previousIndex = current <= 0 ? last : current - 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = previousIndex;
				}),
				() => {
					if (this.player.playing) {
						this.player.previous();
					}
				},
			);
		}
	}

	/**
	 * Handles the click on the next button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnNext(track: IPlayerControllerTrack) {
		if (this.player) {
			const { current, last } = track;

			const nextIndex = current === last ? 0 : current + 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = nextIndex;
				}),
				() => {
					if (this.player.playing) {
						this.player.next();
					}
				},
			);
		}
	}

	/**
	 * Callback for handling the clicking on the play button
	 *
	 * @memberof MediaPlayer
	 */
	onTogglePlay(status: EPlayingStatus) {
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
		this.player.stop();

		this.setState(
			{
				currentPlaylistIndex: index,
				status: EPlayingStatus.paused,
			},
			() => {
				this.initPlaylist();
			},
		);
	}

	/**
	 * Returns the current tracks title and artist
	 *
	 * @param {number} index
	 * @param {ISoundcloudPlayer} player
	 * @returns {(IMediaPlayerTrackMetadata | null)}
	 * @memberof PlayerController
	 */
	getCurrentTrackAndArtist(index: number, player: ISoundcloudPlayer): IMediaPlayerTrackMetadata | null {
		const { title } = player._playlist.tracks[index];
		const { user } = player._playlist.tracks[index];

		const artist = user && user.username;

		if (title && artist) {
			return {
				title,
				artist,
			};
		}

		return null;
	}

	/**
	 * Updates the Player metadata
	 *
	 * @param {string} title
	 * @param {string} artist
	 * @memberof PlayerController
	 */
	updatePlayerMetadata(metadata: IMediaPlayerTrackMetadata) {
		this.setState({
			title: metadata.title,
			artist: metadata.artist,
		});
	}

	/**
	 * Initiates a new playlist
	 *
	 * @memberof PlayerController
	 */
	initPlaylist() {
		const { currentPlaylistIndex } = this.state;
		const currentPlaylist = PoolsidePlaylists[currentPlaylistIndex].url;

		this.player.resolve(currentPlaylist, (playlist: ISoundcloudPlaylist) => {
			const { player } = this;

			// once playlist is loaded it can be played
			this.setState({
				track: {
					current: getRandomTrackIndex(playlist.track_count),
					last: playlist.track_count - 1,
				},
			});

			player.on(ESoundCloudPlayerEvents.canplay, () => {
				const { _playlistIndex } = player;

				let metadata = null;

				if (_playlistIndex) {
					metadata = this.getCurrentTrackAndArtist(_playlistIndex, player);
				}

				if (metadata) {
					this.updatePlayerMetadata(metadata);
				}
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				const { track } = this.state;
				this.onClickOnNext(track);
			});
		});
	}

	/**
	 * Handles the playing status.
	 * If playing, it becomes paused and reverse.
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
	 * Updates the state with the playing states (paused or playing)
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
		const { status, track } = this.state;

		const contextValue = {
			...this.state,
			player: this.player,
			previous: () => this.onClickOnPrevious(track),
			next: () => this.onClickOnNext(track),
			togglePlay: () => this.onTogglePlay(status),
			changeVolume: () => {},
			changePlaylist: (index: number) => this.onChangePlaylist(index),
		};
		return <PlayerControllerContext.Provider value={contextValue}>{children}</PlayerControllerContext.Provider>;
	}
}

export default PlayerController;

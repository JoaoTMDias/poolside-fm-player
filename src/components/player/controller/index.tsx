import * as React from "react";
import produce from "immer";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants";
import {
	PlayerControllerContext,
	IPlayerControllerState,
	defaultPlayerControllerState,
	IPlayerControllerTrack,
	IPlayerControllerContext,
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
 * PlayerController
 *
 * Controls the player instance.
 * Plays, pauses, changes tracks and then updates the state and sends it through the Context API.
 *
 * @class PlayerController
 * @extends {React.Component<{}, IPlayerControllerState>}
 */
class PlayerController extends React.Component<{}, IPlayerControllerState> {
	public player: ISoundcloudPlayer;

	constructor(props: {}) {
		super(props);

		this.state = defaultPlayerControllerState;

		// Binds
		this.onPrevious = this.onPrevious.bind(this);
		this.onPlay = this.onPlay.bind(this);
		this.onNext = this.onNext.bind(this);

		// Refs
		this.player = new SoundCloudAudio("175c043157ffae2c6d5fed16c3d95a4c");
	}

	componentDidMount() {
		const { currentIndex } = this.state;

		this.startPlaylist(currentIndex);
	}

	/**
	 * Handles the click on the previous button
	 *
	 * @param {IPlayerControllerTrack} track
	 * @returns {boolean}
	 * @memberof PlayerController
	 */
	onPrevious(track: IPlayerControllerTrack | null): boolean {
		let hasChanged = false;

		if (this.player && track) {
			const { current, last } = track;
			const previousIndex = current <= 0 ? last : current - 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = previousIndex;
				}),
				() => {
					if (this.player.playing && this.player.previous) {
						this.player.previous();
					}
				},
			);

			hasChanged = true;
		}

		return hasChanged;
	}

	/**
	 * Handles the click on the next button
	 *
	 * @returns {void}
	 * @memberof MediaPlayer
	 */
	onNext(track: IPlayerControllerTrack) {
		if (this.player && track) {
			const { current, last } = track;

			const nextIndex = current === last ? 0 : current + 1;

			this.setState(
				produce((draftState: IPlayerControllerState) => {
					draftState.track.current = nextIndex;
				}),
				() => {
					if (this.player && this.player.next && this.player.playing) {
						this.player.next();
					}
				},
			);
		}
	}

	/**
	 * Callback for handling the clicking on the play button
	 *
	 * @returns {EPlayingStatus | null}
	 * @memberof MediaPlayer
	 */
	onPlay(status?: EPlayingStatus): EPlayingStatus | null {
		if (status) {
			let next = EPlayingStatus.paused;

			if (status === EPlayingStatus.paused) {
				next = EPlayingStatus.playing;
			} else if (status === EPlayingStatus.playing) {
				next = EPlayingStatus.paused;
			}

			this.handlePlayingStatus(next);

			return next;
		}

		return null;
	}

	/**
	 * When the user selects a new playlist, updates the current playlist index state
	 *
	 * @param {number} index
	 * @returns {void}
	 * @memberof PlayerController
	 */
	onChangeOption(index: number): void {
		if (index && this.player && this.player.stop) {
			this.player.stop();

			this.setState(
				{
					currentIndex: index,
					status: EPlayingStatus.paused,
				},
				() => {
					this.startPlaylist(index);
				},
			);
		}
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
		if (index && player) {
			// eslint-disable-next-line no-underscore-dangle
			const { title } = player._playlist.tracks[index];
			// eslint-disable-next-line no-underscore-dangle
			const { user } = player._playlist.tracks[index];

			const artist = user && user.username;

			if (title && artist) {
				return {
					title,
					artist,
				};
			}
		}

		return null;
	}

	/**
	 * Updates the Player metadata
	 *
	 * @param {string} title
	 * @param {string} artist
	 * @returns {void}
	 * @memberof PlayerController
	 */
	updateMetadata(metadata: IMediaPlayerTrackMetadata): void {
		this.setState({
			title: metadata.title,
			artist: metadata.artist,
		});
	}

	/**
	 * get the current playlist and starts a new playlist instance
	 *
	 * @returns {void}
	 * @memberof PlayerController
	 */
	startPlaylist(currentIndex: number): void {
		const currentPlaylist = PoolsidePlaylists[currentIndex].url;

		if (this.player && this.player.resolve && currentPlaylist) {
			this.player.resolve(currentPlaylist, (playlist: ISoundcloudPlaylist) => this.initPlaylist(playlist));
		}
	}

	/**
	 * Initiates a new playlist
	 *
	 * @param {ISoundcloudPlaylist} playlist
	 * @memberof PlayerController
	 */
	initPlaylist(playlist: ISoundcloudPlaylist) {
		const { player } = this;
		const current = getRandomTrackIndex(playlist.track_count);
		const last = playlist.track_count - 1;

		if (player && player.on) {
			// once playlist is loaded it can be played
			this.setState({
				track: {
					current,
					last,
				},
			});

			player.on(ESoundCloudPlayerEvents.canplay, () => {
				const { _playlistIndex } = player;
				const metadata = _playlistIndex ? this.getCurrentTrackAndArtist(_playlistIndex, player) : null;

				if (metadata) {
					this.updateMetadata(metadata);
				}
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				const { track } = this.state;
				this.onNext(track);
			});
		}
	}

	/**
	 * Handles the playing status.
	 * If playing, it becomes paused and reverse.
	 *
	 * @param {EPlayingStatus} status
	 * @returns {void}
	 * @memberof MediaPlayer
	 */
	handlePlayingStatus(status: EPlayingStatus | null): void {
		const { player } = this;
		const { track } = this.state;

		if (player && player.play && player.pause && track && status) {
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

			this.updateStatus(status);
		}
	}

	/**
	 * Updates the state with the playing states (paused or playing)
	 *
	 * @param {EPlayingStatus} status
	 * @returns {void}
	 * @memberof MediaPlayer
	 */
	updateStatus(status: EPlayingStatus): void {
		this.setState({
			status,
		});
	}

	public render() {
		const { children } = this.props;
		const { status, track } = this.state;

		const contextValue: IPlayerControllerContext = {
			...this.state,
			audio: this.player.audio,
			previous: () => this.onPrevious(track),
			next: () => this.onNext(track),
			togglePlay: () => this.onPlay(status),
			changeVolume: () => {},
			onChangeOption: (index: number) => this.onChangeOption(index),
		};

		return <PlayerControllerContext.Provider value={contextValue}>{children}</PlayerControllerContext.Provider>;
	}
}

export default PlayerController;

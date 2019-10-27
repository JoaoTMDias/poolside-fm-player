/* eslint-disable jsx-a11y/media-has-caption */
// Libraries
import * as React from "react";
import SoundCloudAudio from "soundcloud-audio";
import { PoolsidePlaylists } from "data/constants/playlists.constants";
import CurrentSong from "../../current-song/index.component";
import ControlsMedia from "../controls-media/index";
import {
	IMediaPlayerProps,
	IMediaPlayerState,
	EPlayingStatus,
	ISoundcloudPlaylist,
	ISoundcloudPlayer,
	ESoundCloudPlayerEvents,
} from "../player.interfaces";

/**
 * @description Component Description
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IMediaPlayerProps>}
 */
class MediaPlayer extends React.Component<IMediaPlayerProps, IMediaPlayerState> {
	private player: ISoundcloudPlayer;

	static defaultProps = {
		currentPlaylistIndex: 0,
	};

	constructor(props: IMediaPlayerProps) {
		super(props);

		this.state = {
			isReadyToPlay: false,
			status: EPlayingStatus.paused,
		};

		// Binds
		this.onClickOnPrevious = this.onClickOnPrevious.bind(this);
		this.onTogglePlay = this.onTogglePlay.bind(this);
		this.onClickOnNext = this.onClickOnNext.bind(this);

		// Refs
		this.player = new SoundCloudAudio("FweeGBOOEOYJWLJN3oEyToGLKhmSz0I7");
	}

	/**
	 *
	 *
	 * @memberof MediaPlayer
	 */
	componentDidMount() {
		const { currentPlaylistIndex } = this.props;
		const currentPlaylist = PoolsidePlaylists[currentPlaylistIndex];
		this.player.resolve(currentPlaylist.url, (playlist: ISoundcloudPlaylist) => {
			const { player } = this;

			// once playlist is loaded it can be played
			player.on(ESoundCloudPlayerEvents.canplay, () => {
				this.setState({
					isReadyToPlay: true,
				});
			});

			// for playlists it's possible to switch to another track in queue
			// e.g. we do it here when playing track is finished
			player.on(ESoundCloudPlayerEvents.ended, () => {
				player.next();
			});
		});
	}

	/**
	 * Handles the click on the previous button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnPrevious() {
		if (this.player) {
			this.player.previous();
		}
	}

	/**
	 * Handles the click on the next button
	 *
	 * @memberof MediaPlayer
	 */
	onClickOnNext() {
		if (this.player) {
			this.player.next();
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
	 *
	 *
	 * @param {EPlayingStatus} status
	 * @memberof MediaPlayer
	 */
	handleMediaPlayer(status: EPlayingStatus) {
		const { player } = this;
		const { isReadyToPlay } = this.state;

		console.log("isReadyToPlay: ", isReadyToPlay);

		if (player) {
			switch (status) {
				case EPlayingStatus.playing:
					player.play();
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

	render() {
		const { status } = this.state;

		return (
			<div id="media-player" className="media-player row">
				<CurrentSong title="Catch you slippin" artist="E.Live" currentTime="03:28" />
				<ControlsMedia
					status={status}
					onClickOnPrevious={this.onClickOnPrevious}
					onTogglePlay={this.onTogglePlay}
					onClickOnNext={this.onClickOnNext}
				/>
			</div>
		);
	}
}

export default MediaPlayer;

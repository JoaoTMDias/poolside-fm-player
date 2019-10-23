/* eslint-disable jsx-a11y/media-has-caption */
// Libraries
import * as React from "react";
import ControlsMedia from "../controls-media/index";
import { IAudioPlayerProps, IAudioPlayerState, EPlayingStatus } from "../player.interfaces";

/**
 * @description Component Description
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IAudioPlayerProps>}
 */
class AudioPlayer extends React.Component<IAudioPlayerProps, IAudioPlayerState> {
	private player: React.RefObject<HTMLAudioElement>;

	constructor(props: IAudioPlayerProps) {
		super(props);

		this.state = {
			player: null,
			status: EPlayingStatus.paused,
		};

		// Binds
		this.onClickOnPrevious = this.onClickOnPrevious.bind(this);
		this.onClickOnPlay = this.onClickOnPlay.bind(this);
		this.onClickOnNext = this.onClickOnNext.bind(this);

		// Refs
		this.player = React.createRef<HTMLAudioElement>();
	}

	/**
	 *
	 *
	 * @memberof AudioPlayer
	 */
	componentDidMount() {
		const { player } = this.state;
		if (this.player.current) {
			this.setState(
				{
					player: this.player.current,
				},
				() => {
					if (player) {
						player.currentTime = 0;
						player.pause();
					}
				},
			);
		}
	}

	/**
	 *
	 *
	 * @memberof AudioPlayer
	 */
	onClickOnPrevious() {
		console.log("previous");
	}

	/**
	 *
	 *
	 * @memberof AudioPlayer
	 */
	onClickOnNext() {
		console.log("next");
	}

	/**
	 *
	 *
	 * @memberof AudioPlayer
	 */
	onClickOnPlay() {
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

		this.handleAudioPlayer(nextStatus);
	}

	/**
	 *
	 *
	 * @param {EPlayingStatus} status
	 * @memberof AudioPlayer
	 */
	handleAudioPlayer(status: EPlayingStatus) {
		const { player } = this.state;

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
	 * @memberof AudioPlayer
	 */
	updatePlayingStatus(status: EPlayingStatus) {
		this.setState({
			status,
		});
	}

	render() {
		const { status } = this.state;
		const { src } = this.props;

		return (
			<div id="media-player" className="media-player row">
				<audio
					ref={this.player}
					id="audio-player"
					src={src}
					data-testid="component-audio-player"
					autoPlay={false}
					className="sr-only"
				/>
				<ControlsMedia
					status={status}
					onClickOnPrevious={this.onClickOnPrevious}
					onClickOnPlay={this.onClickOnPlay}
					onClickOnNext={this.onClickOnNext}
				/>
			</div>
		);
	}
}

export default React.memo(AudioPlayer);

/* eslint-disable jsx-a11y/media-has-caption */
// Libraries
import * as React from "react";
import { PlayerControllerContext } from "contexts/player-controller-context";
import CurrentSong from "../../current-song/index.component";
import ControlsMedia from "../controls-media/index";

/**
 * @description Component Description
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IMediaPlayerProps>}
 */
const MediaPlayer = () => {
	return (
		<PlayerControllerContext.Consumer>
			{({
				artist,
				changeVolume,
				currentTime,
				next,
				previous,
				status,
				title,
				togglePlay,
				track,
			}) => {
				return (
					<div
						id="media-player"
						data-testid="component-media-player"
						className="media-player row"
						data-current-track={track?.current.toString()}
						data-playing-status={status}
					>
						<CurrentSong title={title} artist={artist} currentTime={`${currentTime}`} />
						<ControlsMedia
							status={status}
							onClickOnPrevious={previous}
							onTogglePlay={togglePlay}
							onClickOnNext={next}
							onChangeVolume={changeVolume}
						/>
					</div>
				);
			}}
		</PlayerControllerContext.Consumer>
	);
};

export default MediaPlayer;

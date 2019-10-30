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
		<div id="media-player" className="media-player row">
			<PlayerControllerContext.Consumer>
				{({ title, artist, currentTime }) => (
					<CurrentSong title={title} artist={artist} currentTime={`${currentTime}`} />
				)}
			</PlayerControllerContext.Consumer>
			<PlayerControllerContext.Consumer>
				{({ next, previous, togglePlay, status }) => (
					<ControlsMedia status={status} onClickOnPrevious={previous} onTogglePlay={togglePlay} onClickOnNext={next} />
				)}
			</PlayerControllerContext.Consumer>
		</div>
	);
};

export default MediaPlayer;

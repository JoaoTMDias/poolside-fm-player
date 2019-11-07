// Libraries
import * as React from "react";
import { PlayerControllerContext, IPlayerControllerState } from "contexts/player-controller-context";
import { EPlayingStatus } from "components/player/media-player/player.interfaces";
import Preview from "assets/images/now-playing.gif";
import * as S from "./player-visualizer.styled";

/**
 * @description An audio visualizer for the player
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const PlayerVisualizer: React.FunctionComponent = () => {
	return (
		<PlayerControllerContext.Consumer>
			{(state: IPlayerControllerState) => (
				<S.PlayerVisualizerWrapper
					role="presentation"
					data-testid="player-visualizer-wrapper"
					id="player-visualizer"
					className={`player-visualizer ${state.status === EPlayingStatus.playing && "player-visualizer--is-playing"}`}
				>
					<figcaption className="sr-only">This is an audio visualizer for the music that is playing</figcaption>
					<img className="player-visualizer__image" src={Preview} width="272" height="32" alt="Audio visualizer" />
				</S.PlayerVisualizerWrapper>
			)}
		</PlayerControllerContext.Consumer>
	);
};

export default React.memo(PlayerVisualizer);

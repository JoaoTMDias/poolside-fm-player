// Libraries
import * as React from "react";
import Preview from "../../assets/images/now-playing.gif";
import * as S from "./player-visualizer.styled";

// Interface
interface IPlayerVisualizerProps {
	isPlaying?: boolean;
}

/**
 * @description And audio visualizer for the player
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IPlayerVisualizerProps>}
 */
const PlayerVisualizer: React.FunctionComponent<IPlayerVisualizerProps> = ({ isPlaying }) => {
	return (
		<S.PlayerVisualizerWrapper
			role="presentation"
			id="player-visualizer"
			className={`player-visualizer ${isPlaying && "player-visualizer--is-playing"}`}
		>
			<figcaption className="sr-only">This is an audio visualizer for the music that is playing</figcaption>
			<img className="player-visualizer__image" src={Preview} width="272" height="32" alt="Audio visualizer" />
		</S.PlayerVisualizerWrapper>
	);
};

PlayerVisualizer.defaultProps = {
	isPlaying: false,
};

export default React.memo(PlayerVisualizer);

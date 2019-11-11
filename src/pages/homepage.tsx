// Libraries
import * as React from "react";
import { PoolsidePlaylists } from "data/constants/playlists.constants";
import MediaPlayer from "components/player/media-player";
import TopBar from "components/top-bar";
import Select from "components/select/index.component";
import PlayerVisualizer from "components/player/visualizer";
import PlayerController from "components/player/controller";
import { PlayerControllerContext, IPlayerControllerContext } from "contexts/player-controller-context";

/**
 * @description Home page
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Homepage: React.FunctionComponent = () => {
	/**
	 * Renders the playlist visualizer component.
	 * It is based on the context state.
	 *
	 * @returns {JSX.Element}
	 */
	function renderPlayerVisualizer() {
		return (
			<PlayerControllerContext.Consumer>
				{(context: IPlayerControllerContext) => {
					const audio = context.audio && context.audio.src ? context.audio : null;
					return <PlayerVisualizer status={context.status} audio={audio} />;
				}}
			</PlayerControllerContext.Consumer>
		);
	}

	return (
		<>
			<TopBar />
			<main id="main-content" className="window__main row">
				<PlayerController>
					{renderPlayerVisualizer()}
					<Select id="channel" label="Channel:" placeholder="Choose a radio channel" options={PoolsidePlaylists} />
					<MediaPlayer />
				</PlayerController>
			</main>
		</>
	);
};

export default React.memo(Homepage);

// Libraries
import * as React from "react";
import { PoolsidePlaylists } from "data/constants";
import MediaPlayer from "components/player/media-player";
import TopBar from "components/top-bar";
import Select from "components/select/select";
import PlayerVisualizer from "components/player/visualizer";
import PlayerController from "components/player/controller";
import { PlayerControllerContext } from "contexts/player-controller-context";

/**
 * @description Home page
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Homepage: React.FunctionComponent = () => (
	<>
		<TopBar />
		<main id="main-content" className="window__main row">
			<PlayerController>
				<PlayerControllerContext.Consumer>
					{({ currentIndex, onChangeOption, audio, status }) => (
						<>
							<PlayerVisualizer status={status} audio={audio} />
							<Select
								id="channel"
								label="Channel:"
								placeholder="Choose a radio channel"
								options={PoolsidePlaylists}
								currentIndex={currentIndex}
								onChange={(index) => onChangeOption(index)}
							/>
						</>
					)}
				</PlayerControllerContext.Consumer>
				<MediaPlayer />
			</PlayerController>
		</main>
	</>
);

export default Homepage;

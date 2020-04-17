// Libraries
import React, { useContext } from "react";
import { PoolsidePlaylists } from "data/constants";
import MediaPlayer from "components/player/media-player";
import TopBar from "components/top-bar";
import Select from "components/select/select";
import PlayerVisualizer from "components/player/visualizer";
import PlayerController from "components/player/controller";
import { PlayerControllerContext } from "contexts/player-controller-context";
import AnnouncerContext from "contexts/announcer-context";
import { useDidMount } from "helpers";

/**
 * @description Home page
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const Homepage: React.FunctionComponent = () => {
	const { onDispatchAnnounce } = useContext(AnnouncerContext);

	useDidMount(() => {
		if (onDispatchAnnounce) {
			onDispatchAnnounce("change", "Navigated to the Home page");
		}
	});

	return (
		<>
			<TopBar />
			<main id="main-content" className="window__main row">
				<PlayerController>
					<PlayerControllerContext.Consumer>
						{({ currentIndex, onChangeOption, audio, status }) => {
							return (
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
							);
						}}
					</PlayerControllerContext.Consumer>
					<MediaPlayer />
				</PlayerController>
			</main>
		</>
	);
};

export default Homepage;

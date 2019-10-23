// Libraries
import * as React from "react";
import { TopBar, PlayerVisualizer, Select, CurrentSong, ControlsMedia, AudioPlayer } from "../index.components";

/**
 * @description AppComponent
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent}
 */
const App: React.FunctionComponent = () => {
	return (
		<div id="app" className="root__inner">
			<div id="window" className="window">
				<TopBar />
				<main id="main-content" className="window__main row">
					<PlayerVisualizer />
					<Select
						id="channel"
						label="Channel:"
						placeholder="Choose a radio channel"
						options={[
							{
								id: "poolside-fm",
								label: "Poolside FM (default)",
								value: "poolside-fm",
							},
							{
								id: "indie-summer",
								label: "Indie Summer",
								value: "indie-summer",
							},
							{
								id: "hangover-club",
								label: "Hangover Club",
								value: "hangover-club",
							},
							{
								id: "tokyo-disco",
								label: "Tokyo Disco",
								value: "tokyo-disco",
							},
							{
								id: "friday-nite-heat",
								label: "Friday Nite Heat",
								value: "friday-nite-heat",
							},
						]}
					/>
					<CurrentSong title="Catch you slippin" artist="E.Live" currentTime="03:28" />
					<AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
				</main>
			</div>
		</div>
	);
};

export default React.memo(App);

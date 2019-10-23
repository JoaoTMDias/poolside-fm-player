// Libraries
import * as React from "react";
import { TopBar, PlayerVisualizer, Select, CurrentSong } from "../index.components";

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
					<div id="controls" data-testid="component-controls" className="controls">
						<ul id="controls-media" className="controls__media">
							<li className="controls-media__item controls-media__item--first">
								<button className="controls-media__button">Review</button>
							</li>
							<li className="controls-media__item">
								<button className="controls-media__button">Play</button>
							</li>
							<li className="controls-media__item controls-media__item--last">
								<button className="controls-media__button">Next</button>
							</li>
						</ul>
					</div>
				</main>
			</div>
		</div>
	);
};

export default React.memo(App);

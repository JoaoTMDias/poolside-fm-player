// Libraries
import * as React from "react";
import * as S from "./current-song.styled";

// Interface
interface ICurrentSongProps {
	artist: string;
	title: string;
	currentTime?: string;
}

/**
 * @description Displays the current song
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<ICurrentSongProps>}
 */
const CurrentSong: React.FunctionComponent<ICurrentSongProps> = ({
	artist,
	title,
	currentTime,
}) => {
	return (
		<S.Wrapper id="current-song" data-testid="component-current-song" className="current-song">
			<h5 className="current-song__time ui-label">
				<span className="current-song__time__initial">00:00</span>
				<span className="current-song__time__divider">/</span>
				<span className="current-song__time__current">{currentTime}</span>
			</h5>
			<h4 className="current-song__title" title={title}>
				{title}
			</h4>
			<h6 className="current-song__artist ui-label" title={artist}>
				{artist}
			</h6>
		</S.Wrapper>
	);
};

export default React.memo(CurrentSong);

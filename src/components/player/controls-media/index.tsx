// Libraries
import * as React from "react";
import { Link } from "react-router-dom";
import { ROUTE_SETTINGS } from "data/constants/routes";
import { hasPressedSpaceOrEnter } from "helpers";
import * as S from "./controls-media.styled";
import { IControlsMediaProps, EPlayingStatus } from "../media-player/player.interfaces";
import ButtonVolume from "./button-volume";

/**
 * @description Controls - Media Buttons
 * @author João Dias
 * @date 2019-02-16
 * @returns {React.FunctionComponent<IControlsMediaProps>}
 */
const ControlsMedia: React.FunctionComponent<IControlsMediaProps> = ({
	onClickOnPrevious,
	onTogglePlay,
	onClickOnNext,
	onChangeVolume,
	status,
}) => {
	/**
	 * Returns the appropriate icon depending on the state of the player
	 *
	 * @returns {JSX.Element}
	 */
	function getButtonIcon(): JSX.Element {
		switch (status) {
			case EPlayingStatus.ready:
			case EPlayingStatus.paused:
			case EPlayingStatus.idle:
				return (
					<svg
						id="icon-pause"
						className="icon"
						xmlns="http://www.w3.org/2000/svg"
						width="9"
						height="9"
						fill="none"
						viewBox="0 0 9 9"
					>
						<path
							fill="var(--color-icon, #000)"
							d="M3 9V0h1v1h1v1h1v1h1v1h1v1H7v1H6v1H5v1H4v1H3z"
						/>
					</svg>
				);

			case EPlayingStatus.loading:
				return (
					<svg xmlns="http://www.w3.org/2000/svg" width="10" height="14" fill="none" viewBox="0 0 10 14">
						<path fill="var(--color-icon, #000)" d="M1 10h1v1H1zM1 3h1v1H1zM2 0h6v3H2zM2 11h6v3H2zM8 10h1v1H8zM8 3h1v1H8zM5 4h1v4H5z" />
						<path fill="var(--color-icon, #000)" d="M3 8V7h3v1zM0 4h1v6H0zM9 4h1v6H9z" />
					</svg>
				);

			default:
			case EPlayingStatus.playing:
				return (
					<svg
						id="icon-play"
						className="icon"
						width="9"
						height="9"
						viewBox="0 0 9 9"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path d="M2 0H4V9H2V0Z" fill="var(--color-icon, #000)" />
						<path d="M5 0H7V9H5V0Z" fill="var(--color-icon, #000)" />
					</svg>
				);
		}
	}

	return (
		<S.Wrapper id="controls" className="controls">
			<S.Buttons id="controls-media" className="controls__media">
				<li className="controls-media__item controls-media__item--first">
					<button
						id="controls-media-button-previous"
						data-testid="component-controls-media-button-previous"
						title="Previous Song"
						aria-label="Click play the previous song"
						type="button"
						className="controls-media__button button button--large"
						onClick={() => {
							if (onClickOnPrevious) {
								onClickOnPrevious();
							}
						}}
						onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
							if (onClickOnPrevious && hasPressedSpaceOrEnter(event.keyCode)) {
								onClickOnPrevious();
							}
						}}
					>
						<svg
							className="icon"
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="9"
							fill="none"
							viewBox="0 0 12 9"
						>
							<path
								fill="var(--color-icon, #000)"
								d="M12 0v9h-1V8h-1V7H9V6H8V5H7v4H6V8H5V7H4V6H3V5H2v4H0V0h2v4h1V3h1V2h1V1h1V0h1v4h1V3h1V2h1V1h1V0h1z"
							/>
						</svg>
					</button>
				</li>
				<li className="controls-media__item controls-media__item--middle">
					<button
						id="controls-media-button-play"
						data-testid="component-controls-media-button-play"
						title="Play song"
						aria-label="Click play the song"
						type="button"
						className="controls-media__button button button--large"
						onClick={() => {
							if (onTogglePlay) {
								onTogglePlay();
							}
						}}
						onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
							if (onTogglePlay && hasPressedSpaceOrEnter(event.keyCode)) {
								onTogglePlay();
							}
						}}
					>
						{getButtonIcon()}
					</button>
				</li>
				<li className="controls-media__item controls-media__item--last">
					<button
						id="controls-media-button-next"
						data-testid="component-controls-media-button-next"
						title="Next Song"
						aria-label="Click play the next song"
						type="button"
						className="controls-media__button button button--large"
						onClick={() => {
							if (onClickOnNext) {
								onClickOnNext();
							}
						}}
						onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
							if (onClickOnNext && hasPressedSpaceOrEnter(event.keyCode)) {
								onClickOnNext();
							}
						}}
					>
						<svg
							className="icon"
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="9"
							fill="none"
							viewBox="0 0 12 9"
						>
							<path
								fill="var(--color-icon, #000)"
								d="M0 9V0h1v1h1v1h1v1h1v1h1V0h1v1h1v1h1v1h1v1h1V0h2v9h-2V5H9v1H8v1H7v1H6v1H5V5H4v1H3v1H2v1H1v1H0z"
							/>
						</svg>
					</button>
				</li>
			</S.Buttons>
			<div className="controls-media__item">
				<ButtonVolume
					onChangeVolume={(value: string) => {
						if (onChangeVolume) {
							onChangeVolume(value);
						}
					}}
				/>
			</div>
			<div className="controls-media__item">
				<Link
					to={ROUTE_SETTINGS}
					id="controls-button-settings"
					data-testid="component-controls-button-settings"
					title="Settings"
					aria-label="Click to navigate to the app's settings page"
					className="controls-media__button button button--large"
				>
					<svg
						className="icon"
						xmlns="http://www.w3.org/2000/svg"
						width="9"
						height="9"
						fill="none"
						viewBox="0 0 9 9"
					>
						<path
							fill="var(--color-icon, #000)"
							d="M8.413 3.913v-.587h-.587V2.152h.587v-.978h-.587V.587h-.978v.587H5.674V.587h-.587V0H3.913v.587h-.587v.587H2.152V.587h-.978v.587H.587v.978h.587v1.174H.587v.587H0v1.174h.587v.587h.587v1.174H.587v.978h.587v.587h.978v-.587h1.174v.587h.587V9h1.174v-.587h.587v-.587h1.174v.587h.978v-.587h.587v-.978h-.587V5.674h.587v-.587H9V3.913h-.587zM6.065 5.478h-.587v.587H3.522v-.587h-.587V3.522h.587v-.587h1.956v.587h.587v1.956z"
						/>
					</svg>
				</Link>
			</div>
		</S.Wrapper>
	);
};

ControlsMedia.defaultProps = {
	status: EPlayingStatus.paused,
};

export default React.memo(ControlsMedia);

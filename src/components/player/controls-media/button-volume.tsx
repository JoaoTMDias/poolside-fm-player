import React, { FunctionComponent, useState, KeyboardEvent, ChangeEvent } from "react";
import ClickTrapPortal from "components/click-trap-portal";
import { hasPressedSpaceOrEnter, useDebouncedEffect } from "helpers";
import * as S from "./index.styles";

interface IButtonVolumeProps {
	onChangeVolume?: (value: number) => void;
	onClick?: () => void;
}

export interface IButtonVolumeState {
	showControls: boolean;
	value: string;
}

/**
 * Volume button
 *
 * @extends {FunctionComponent<IButtonVolumeProps>}
 */
const ButtonVolume: FunctionComponent<IButtonVolumeProps> = ({ onChangeVolume, onClick }) => {
	const [showControls, setShowControls] = useState(false);
	const [value, setValue] = useState("1");

	/**
	 * When changing the range input value:
	 * - Updates the state
	 * - Dispatches the onChangeVolume prop
	 *
	 * @param {string} rangeValue
	 * @returns {void}
	 */
	function onChangeRangeInput(rangeValue: string) {
		setValue(rangeValue);
	}

	/**
	 * Handles the onClick
	 *
	 * @returns {void}
	 */

	function handleOnClick(): void {
		setShowControls(!showControls);

		if (onClick) {
			onClick();
		}
	}

	useDebouncedEffect<string>(
		() => {
			if (onChangeVolume) {
				onChangeVolume(parseFloat(value));
			}
		}, 250, [value]
	);


	return (
		<>
			<button
				id="controls-button-volume"
				data-testid="component-controls-media-button-volume"
				data-volume={value}
				title="Control Volume"
				aria-label="Click to control the volume of the song"
				type="button"
				className="controls-media__button button button--large"
				onClick={() => handleOnClick()}
				onKeyUp={(event: KeyboardEvent<HTMLButtonElement>) => {
					if (hasPressedSpaceOrEnter(event.keyCode)) {
						handleOnClick();
					}
				}}
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
						d="M6.652.587V0H5.478v.587h-.587v.587h-.587v.587h-.587v.587h-1.37v.587h-.586v3.13h.587v.587h1.37v.587h.586v.587h.587v.587h.587V9h1.174v-.587h.587V.587h-.587z"
					/>
				</svg>
			</button>
			{showControls && (
				<ClickTrapPortal
					title="Click to close the volume controls"
					onClickToClose={() => handleOnClick()}
				>
					<S.Wrapper id="volume-input-wrapper" tabIndex={-1}>
						<S.Input
							type="range"
							id="volume-input-control"
							data-testid="component-button-volume-range-input"
							className="volume-input__wrapper"
							min="0"
							max="1"
							step="0.1"
							value={value}
							tabIndex={0}
							onChange={(event: ChangeEvent<HTMLInputElement>) =>
								onChangeRangeInput(event.target.value)
							}
						/>
					</S.Wrapper>
				</ClickTrapPortal>
			)}
		</>
	);
};

export default ButtonVolume;

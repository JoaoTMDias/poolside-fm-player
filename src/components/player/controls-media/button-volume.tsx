import * as React from "react";
import ClickTrapPortal from "components/click-trap-portal";
import { hasPressedSpaceOrEnter } from "helpers";
import * as S from "./button-volume.styled";

interface IButtonVolumeProps {
	onChangeVolume?: (value: string) => void;
}

export interface IButtonVolumeState {
	showControls: boolean;
	value: string;
}

/**
 * Volume button
 *
 * @class ButtonVolume
 * @extends {React.Component<IButtonVolumeProps, IButtonVolumeState>}
 */
class ButtonVolume extends React.Component<IButtonVolumeProps, IButtonVolumeState> {
	constructor(props: IButtonVolumeProps) {
		super(props);

		this.state = {
			showControls: false,
			value: "1",
		};
	}

	onChangeRangeInput(value: string) {
		this.setState(
			{
				value,
			},
			() => {
				const { onChangeVolume } = this.props;

				if (onChangeVolume) {
					onChangeVolume(value);
				}
			},
		);
	}

	handleOnClick() {
		const { showControls } = this.state;

		this.setState({
			showControls: !showControls,
		});
	}

	render() {
		const { showControls, value } = this.state;
		return (
			<>
				<button
					id="controls-button-volume"
					data-testid="component-controls-media-button-volume"
					title="Control Volume"
					aria-label="Click to control the volume of the song"
					type="button"
					className="controls-media__button button button--large"
					onClick={() => this.handleOnClick()}
					onKeyUp={(event: React.KeyboardEvent<HTMLButtonElement>) => {
						if (hasPressedSpaceOrEnter(event.keyCode)) {
							this.handleOnClick();
						}
					}}
				>
					<svg className="icon" xmlns="http://www.w3.org/2000/svg" width="9" height="9" fill="none" viewBox="0 0 9 9">
						<path
							fill="var(--color-icon, #000)"
							d="M6.652.587V0H5.478v.587h-.587v.587h-.587v.587h-.587v.587h-1.37v.587h-.586v3.13h.587v.587h1.37v.587h.586v.587h.587v.587h.587V9h1.174v-.587h.587V.587h-.587z"
						/>
					</svg>
				</button>
				{showControls && (
					<ClickTrapPortal title="Click to close the volume controls" onClickToClose={() => this.handleOnClick()}>
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
								onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onChangeRangeInput(event.target.value)}
							/>
						</S.Wrapper>
					</ClickTrapPortal>
				)}
			</>
		);
	}
}

export default ButtonVolume;

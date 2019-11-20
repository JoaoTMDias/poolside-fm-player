import { rem } from "polished";
import styled from "styled-components";

export const PlayerVisualizerWrapper = styled.figure`
	width: 100%;
	height: ${rem("40px")};
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	background-color: var(--color-black);
	margin: 0;
	padding: 0;
	position: relative;
	overflow: hidden;

	&::after {
		background-color: transparent;
		width: 100%;
		height: 100%;
		transform: translateY(-0.25rem);
		transition-property: transform;
		transition-duration: 500ms;
		transition-timing-function: linear;
		position: absolute;
		top: 0;
		left: 0;
		content: "";
		z-index: 1;
		display: block;
	}

	&.is-playing {
		background-color: var(--color-black);

		&::after {
			transform: translateY(-2.5rem);
		}
	}

	.player-visualizer__label,
	.sr-only {
		position: absolute;
	}

	.player-visualizer__label {
		color: var(--color-white);
		width: 100%;
		font-size: 0.5rem;
		letter-spacing: 2px;
		animation-duration: 1000ms;
		animation-timing-function: step-start;
		animation-delay: 0s;
		animation-iteration-count: infinite;
		animation-direction: normal;
		animation-fill-mode: none;
		animation-play-state: running;
		animation-name: blink;
		text-align: center;
	}

	.player-visualizer__image,
	.player-visualizer__canvas {
		width: 100%;
		background-color: var(--color-black);
	}

	.player-visualizer__canvas {
		height: ${rem("32px")};
	}
`;

export default PlayerVisualizerWrapper;

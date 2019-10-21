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
		background-color: var(--color-black);
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
		z-index: 5;
		display: block;
	}

	&.player-visualizer--is-playing {
		&::after {
			transform: translateY(2.5rem);
		}
	}

	.player-visualizer__image {
		width: 100%;
		height: 100%;
		background-color: var(--color-black);
	}
`;

export default PlayerVisualizerWrapper;

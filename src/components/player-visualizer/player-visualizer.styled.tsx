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

	.player-visualizer {
		&__image {
			width: 100%;
			height: 100%;
			background-color: var(--color-black);
		}
	}
`;

export default PlayerVisualizerWrapper;

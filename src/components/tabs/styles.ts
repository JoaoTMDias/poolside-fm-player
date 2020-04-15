import styled from "styled-components";
import { rem } from "polished";

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;

	display: grid;
	grid-template-rows: 1.5rem 1fr;
	grid-row-gap: 1rem;
	margin: 0.5rem 0;
`;

export const List = styled.div`
	width: 100%;
	height: 100%;
	max-height: 1.5rem;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	flex-shrink: 0;
	flex-grow: 1;
	flex-basis: 1;
	align-items: center;
`;

export const Item = styled.button`
	border-radius: 0;
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 100%;
	height: 100%;
	background: var(--color-button);
	color: var(--color-button-hover);
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-size: 1rem;
	font-family: var(--heading-font-family);

	&[aria-selected="true"] {
		background-color: var(--color-button-hover);
		color: var(--color-button);
	}

	&:first-child {
		border-top-left-radius: ${rem("4px")};
		border-bottom-left-radius: ${rem("4px")};
	}

	&:last-child {
		border-top-right-radius: ${rem("4px")};
		border-bottom-right-radius: ${rem("4px")};
	}
`;

export const Panel = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	overflow-x: hidden;
	overflow-y: scroll;
	border: 1px solid var(--color-black);

	&[hidden],
	&[tabindex="-1"] {
		display: none;
	}
`;

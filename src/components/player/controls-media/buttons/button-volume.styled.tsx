import { rem } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div`
	width: ${rem("96px")};
	height: ${rem("24px")};
	padding: 4px;
	position: absolute;
	top: calc(100vh - 4rem);
	left: calc(100vw - 9rem);
	z-index: 2;
	overflow: hidden;
	background-color: var(--color-primary);
	color: var(--color-black);
	border-radius: ${rem("4px")};
	border: 1px solid var(--color-button-icon);
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	transform: rotate(-90deg) translate(0, 0%);
`;

export const Input = styled.input`
	display: flex;
	background: transparent;

	&[type="range"] {
		-webkit-appearance: none;
		margin: 0;
		width: 100%;

		&:focus {
			outline: none;
		}

		&::-webkit-slider-runnable-track {
			width: 100%;
			height: 2px;
			cursor: pointer;
			animate: 200ms;
			background: var(--color-black);
			border-radius: 1px;
		}

		&::-webkit-slider-thumb {
			border: 1px solid var(--color-black);
			height: 1rem;
			width: 1rem;
			border-radius: 1rem;
			background: var(--color-primary);
			cursor: pointer;
			-webkit-appearance: none;
			margin-top: -7px;
		}

		&:focus::-webkit-slider-runnable-track {
			background: var(--color-black);
		}

		&::-moz-range-track {
			width: 100%;
			height: 8.4px;
			cursor: pointer;
			animate: 0.2s;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			background: #3071a9;
			border-radius: 1.3px;
			border: 0.2px solid #010101;
		}

		&::-moz-range-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 36px;
			width: 16px;
			border-radius: 3px;
			background: var(--color-primary);
			cursor: pointer;
		}

		&::-ms-track {
			width: 100%;
			height: 8.4px;
			cursor: pointer;
			animate: 0.2s;
			background: transparent;
			border-color: transparent;
			border-width: 16px 0;
			color: transparent;
		}

		&::-ms-fill-lower {
			background: #2a6495;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}

		&::-ms-fill-upper {
			background: #3071a9;
			border: 0.2px solid #010101;
			border-radius: 2.6px;
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
		}

		&::-ms-thumb {
			box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
			border: 1px solid #000000;
			height: 36px;
			width: 16px;
			border-radius: 3px;
			background: var(--color-primary);
			cursor: pointer;
		}

		&:focus {
			&::-ms-fill-lower {
				background: #3071a9;
			}

			&::-ms-fill-upper {
				background: #367ebd;
			}
		}
	}
`;

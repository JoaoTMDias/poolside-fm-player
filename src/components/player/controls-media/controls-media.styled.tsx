import { rem } from "polished";
import styled from "styled-components";

export const Wrapper = styled.nav`
	width: 100%;
	height: 2rem;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: row;

	.controls-media {
		&__item {
			width: 3rem;
			height: 2rem;
			border-radius: ${rem("4px")};
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			&--first button {
				border-top-right-radius: 0;
				border-bottom-right-radius: 0;
			}

			&--middle button {
				border-radius: 0;
				border-left: none;
				border-right: none;
			}

			&--last button {
				border-top-left-radius: 0;
				border-bottom-left-radius: 0;
			}
		}

		&__button {
			-webkit-appearance: none;
			-moz-appearance: none;
			appearance: none;
			width: 100%;
			height: 100%;
			background: var(--color-button);
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;
			text-align: center;

			.icon path {
				fill: var(--color-button-icon);
			}

			&:hover,
			&:focus {
				background-color: var(--color-button-hover);

				.icon path {
					fill: var(--color-button-icon-hover);
				}
			}
		}
	}
`;

export const Buttons = styled.ul`
	width: 9rem;
	margin: 0;
	padding: 0;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: row;
	height: 100%;
	list-style-type: none;
`;

export default Buttons;

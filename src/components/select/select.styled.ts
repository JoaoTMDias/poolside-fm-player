import { rem } from "polished";
import styled from "styled-components";

export const SelectWrapper = styled.div`
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-content: center;

	.select-input__container {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-content: center;
		height: calc(var(--global-margin) * 2.5);
		position: relative;
	}

	.select-input__button {
		height: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;

		font-family: var(--body-font-family);
		font-size: var(--body-font-size);

		text-transform: capitalize;
		text-shadow: none;
		color: var(--color-black);

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border: none;
		background-color: var(--color-primary);

		cursor: context-menu;

		box-shadow: 0 1px 0 var(--color-black);

		&:active {
			background-color: var(--color-primary-dark);
		}

		&:after {
			position: absolute;
			right: calc(var(--global-margin) * 0.25);
			transform: rotate(0deg);
			transition: all 64ms;
			background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='13' fill='none' viewBox='0 0 12 13'%3E%3Cpath fill='%23000' d='M6 10.35l-4.157-5.4h8.314L6 10.35z'/%3E%3C/svg%3E");
			background-position: center center;
			background-repeat: no-repeat;
			background-color: transparent;
			background-size: ${rem("10px")} ${rem("10px")};

			display: flex;

			height: calc(var(--global-margin) * 1);
			width: calc(var(--global-margin) * 1);
			content: "";
		}

		&:focus {
			outline-color: var(--color-black);
			outline-style: dotted;
			outline-width: 1px;
		}
	}

	.select-input__label {
		font-family: var(--heading-font-family);
	}

	.select-input__value {
		margin-left: 0.5rem;
		margin-bottom: 0;
		transform: translateY(1px);
	}

	&.is-open {
		.select-input__button:after {
			transform: rotate(180deg);
			transition: all 64ms;
		}
	}
`;

export const SelectOptionsList = styled.ul`
	display: none;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);

	border: 1px solid var(--color-black);
	background-color: var(--color-white);

	padding: 0;
	margin: 0;

	max-height: ${rem("128px")};
	overflow-x: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: "smooth";

	&.is-open {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		position: absolute;
		width: 100%;
		top: calc(var(--global-margin) * 2.5);
		z-index: 100;
	}

	.select-input__option {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		box-sizing: border-box;
		padding: ${rem("8px")};
		cursor: pointer;
		box-shadow: 0px 1px 0px var(--color-black);

		&:last-child {
			box-shadow: none;
		}

		&:hover,
		&:focus {
			background-color: var(--color-primary-dark);
		}

		&.is-selected {
			background-color: var(--color-gray8);
			color: var(--color-white);

			.select-input__option__label {
				outline: none;

				&:hover,
				&:focus {
					.ui-label {
						outline-color: var(--color-white);
						outline-style: dotted;
						outline-width: 1px;
					}
				}
			}

			.ui-label {
				outline-color: var(--color-white);
				outline-style: dotted;
				outline-width: 1px;
			}

			&:hover,
			&:focus {
				background-color: var(--color-black);

				.ui-label {
					outline-color: var(--color-white);
					outline-style: dotted;
					outline-width: 1px;
				}
			}
		}
	}

	.select-input__option__label {
		width: 100%;
		height: 100%;

		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;

		&:hover,
		&:focus {
			outline: none;

			.ui-label {
				outline-color: var(--color-black);
				outline-style: dotted;
				outline-width: 1px;
			}
		}
	}
`;

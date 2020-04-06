import { rem } from "polished";
import styled from "styled-components";

export const SelectWrapper = styled.div`
	--color-select-button: var(--color-primary);
	--color-select-button-text: var(--body-font-color);
	--color-select-button-arrow: var(--body-font-color);
	--color-select-button-border: var(--color-primary);
	--color-select-button-hover: var(--color-primary-dark);
	--color-select-button-text-hover: var(--body-font-color);
	--color-select-button-focus: var(--color-primary-dark);

	html[data-theme="terminal"] && {
		--color-select-button: var(--body-background);
		--color-select-button-text: var(--color-primary);
		--color-select-button-arrow: var(--color-select-button-text);
		--color-select-button-border: var(--color-primary);
		--color-select-button-hover: var(--color-button-hover);
		--color-select-button-text-hover: var(--body-background);
		--color-select-button-focus: var(--color-button-hover);
	}

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
		justify-content: space-between;
		align-items: center;

		font-family: var(--body-font-family);
		font-size: var(--body-font-size);

		text-transform: capitalize;
		text-shadow: none;
		color: var(--color-black);

		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;

		border: 1px solid var(--color-select-button-border);
		background-color: var(--color-select-button);

		cursor: context-menu;

		box-shadow: 0 1px 0 var(--color-black);

		&:hover,
		&:focus,
		&:active {
			background-color: var(--color-select-button-hover);

			.select-input {
				&__label,
				&__value {
					color: var(--color-select-button-text-hover);
				}
			}
		}

		&:focus {
			outline-color: var(--color-select-button-border);
			outline-style: dotted;
			outline-width: 1px;
		}
	}

	.select-input {
		&__left {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;
			width: 100%;
		}

		&__arrow {
			display: flex;
			flex-direction: row;
			align-self: flex-end;
			transform: rotate(0deg);
			transition: all 64ms;
			width: ${rem("12px")};
			height: ${rem("18px")};

			path {
				fill: var(--color-select-button-arrow);
			}
		}

		&__label,
		&__value {
			color: var(--color-select-button-text);
		}

		&__label {
			font-family: var(--heading-font-family);
		}

		&__value {
			margin-left: 0.5rem;
			margin-bottom: 0;
			transform: translateY(1px);
		}
	}

	&.is-open {
		.select-input__arrow {
			transform: rotate(180deg);
			transition: all 64ms;
		}
	}
`;

export const SelectOptionsList = styled.ul`
	--color-select-option: var(--color-white);
	--color-select-option-selected: var(--color-gray8);
	--color-select-option-selected-text: var(--color-white);
	--color-select-option-border: var(--color-black);
	--color-select-option-hover: var(--color-primary-dark);
	--color-select-option-focus: var(--color-primary-dark);
	--color-select-option-text: var(--body-font-color);
	--color-select-option-text-hover: var(--body-font-color);
	--color-select-option-new-text: var(--color-black);
	--color-select-option-new-text-background: var(--color-primary);
	--color-select-option-new-text-hover: var(--color-white);

	html[data-theme="terminal"] && {
		--color-select-option: var(--body-background);
		--color-select-option-border: var(--body-background);
		--color-select-option-hover: var(--color-primary);
		--color-select-option-text: var(--color-primary);
		--color-select-option-text-hover: var(--body-background);
		--color-select-option-selected: var(--color-primary);
		--color-select-option-selected-text: var(--body-background);
		--color-select-option-new-text: var(--color-primary);
		--color-select-option-new-text-background: var(--body-background);
		--color-select-option-new-text-hover: var(--body-background);
	}

	display: none;
	box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);

	border: 1px solid var(--color-select-option-border);
	background-color: var(--color-select-option);

	padding: 0;
	margin: 0;

	max-height: ${rem("148px")};
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
		box-shadow: 0px 1px 0px var(--color-select-option-border);

		&:last-child {
			box-shadow: none;
		}

		&:hover,
		&:focus {
			background-color: var(--color-select-option-hover);
		}

		&[aria-selected="true"] {
			background-color: var(--color-select-option-selected);
			color: var(--color-select-option-selected-text);

			.ui-label {
				outline-color: var(--color-select-option-selected-text);
				outline-style: dotted;
				outline-width: 1px;
			}

			&:hover,
			&:focus {
				background-color: var(--color-select-option-selected);

				.ui-label {
					color: var(--color-select-option-text-hover);
					outline-color: var(--color-select-option-selected-text);
					outline-style: dotted;
					outline-width: 1px;
				}
			}

			.select-input__option__label {
				outline: none;

				&:hover,
				&:focus {
					.ui-label {
						color: var(--color-select-option-text-hover);
						outline-color: var(--color-select-option-selected-text);
						outline-style: dotted;
						outline-width: 1px;
					}
				}
			}
		}
	}

	.select-input__option__label {
		width: 100%;
		height: 100%;
		-webkit-appearance: none;
		border: none;
		background-color: initial;
		color: unset;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		cursor: pointer;

		.ui-label {
			width: 100%;
			height: 1.25rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.is-new {
			width: auto;
			background-color: var(--color-select-option-new-text-background);
			color: var(--color-select-option-new-text);
			border-radius: 1rem;
			padding: 0.125rem 0.5rem;
			font-family: var(--heading-font-family);
			text-transform: uppercase;
			letter-spacing: 1px;
			font-size: 10px;
			animation-duration: 1000ms;
			animation-timing-function: step-start;
			animation-delay: 0s;
			animation-iteration-count: infinite;
			animation-direction: normal;
			animation-fill-mode: none;
			animation-play-state: running;
			animation-name: blink;
		}

		&:hover,
		&:focus {
			outline: none;

			.ui-label {
				width: 100%;
				outline-color: var(--color-black);
				outline-style: dotted;
				outline-width: 1px;
			}

			.is-new {
				background-color: var(--color-select-option-new-text-hover);
			}
		}
	}
`;

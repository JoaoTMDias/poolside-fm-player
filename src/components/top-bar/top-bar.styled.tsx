import { rem } from "polished";
import styled from "styled-components";

export const Wrapper = styled.header`
	width: 100%;
	height: ${rem("24px")};
	display: grid;
	grid-template-columns: ${rem("14px")} 1fr ${rem("82px")};
	align-items: center;
	margin: 0;
	border-top: 1px solid var(--color-white);
	text-align: right;

	.top-bar {
		&__button {
			width: ${rem("14px")};
			height: ${rem("14px")};
			flex-basis: ${rem("14px")};
			-webkit-appearance: none;
			appearance: none;
			background-color: var(--color-primary);
			border: 1px solid var(--color-black);

			&:hover,
			&:focus {
				background-color: var(--color-primary-dark);
			}

			&:active {
				background-color: var(--color-black);
			}
		}

		&__handle {
			width: calc(100% - 1rem);
			height: ${rem("13px")};
			flex-basis: ${rem("160px")};
			display: flex;
			flex-direction: column;
			justify-content: space-evenly;
			align-items: flex-start;
			margin: 0 ${rem("8px")};

			&__item {
				width: 100%;
				height: 1px;
				background-color: var(--color-black);
				margin: 0;
				padding: 0;
			}
		}
	}
`;

export default Wrapper;

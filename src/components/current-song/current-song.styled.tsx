import { rem } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	margin-top: ${rem("24px")};
	margin-right: 0;
	margin-bottom: ${rem("24px")};
	margin-left: 0;

	.current-song {
		&__time {
			margin-bottom: ${rem("8px")};
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: center;

			&__initial,
			&__divider,
			&__current {
				margin-top: 0;
				margin-bottom: 0;
				line-height: 1;
			}

			&__divider {
				margin-left: ${rem("4px")};
				margin-right: ${rem("4px")};
			}
		}

		&__title {
			font-size: ${rem("16px")};
			margin-bottom: ${rem("4px")};
			max-height: 1.5rem;
		}

		&__artist {
			margin-bottom: 0;
			max-height: 0.875rem;
		}

		&__title,
		&__artist {
			width: calc(100vw - (var(--global-margin) * 2));
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}
	}
`;

export default Wrapper;

import { rem } from "polished";
import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	margin-top: ${rem("16px")};
	margin-right: 0;
	margin-bottom: ${rem("16px")};
	margin-left: 0;

	.current-song__time {
		margin-bottom: ${rem("8px")};
	}

	.current-song__title {
		font-size: ${rem("16px")};
		margin-bottom: ${rem("4px")};
	}

	.current-song__artist {
		margin-bottom: 0;
	}
`;

export default Wrapper;

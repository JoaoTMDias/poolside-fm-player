import { css } from "styled-components";

export const hoverFocus = styles =>
	css`
		&:hover:enabled,
		&:focus:enabled {
			${css(...styles)}
		}
	`;

export default hoverFocus;

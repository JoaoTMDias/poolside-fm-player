import React, { AriaAttributes, memo } from 'react';

export interface IAnnouncerProps {
	text: string;
	politeness: AriaAttributes['aria-live'];
}

/**
 * A React a11y component created by that helps ensure announcements
 * are accessible and properly announced by screen readers.
 *
 * @export
 * @param {IAnnouncerProps} props
 * @returns {JSX.Element}
 */
export function Announcer(props: IAnnouncerProps) {
	const { text, politeness } = props;

	/**
	 * Renders the message
	 *
	 * @returns {JSX.Element}
	 */
	function renderMessage() {
		if (!text.length) {
			return null;
		}

		return (
			<p className="announcer__message">{text}</p>
		);
	}

	return (
		<div
			role="alert"
			aria-atomic
			aria-live={politeness}
			data-testid="component-announcer"
			className="announcer sr-only"
		>
			{renderMessage()}
		</div>
	)
}

Announcer.defaultProps = {
	text: "",
	politeness: "assertive"
}

export default memo(Announcer);

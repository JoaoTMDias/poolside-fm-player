import React from 'react';
import { render, cleanup } from "@testing-library/react";
import Announcer from './index';

afterEach(cleanup);

test('Component is created', () => {
	const { baseElement } = render(<Announcer text="This is an announcement!" />);
	expect(baseElement).toMatchSnapshot();
});

test('Should have a default politeness prop of `polite`', () => {
	const { getByTestId } = render(<Announcer text="" />);
	const element = getByTestId("component-announcer");

	expect(element.getAttribute("aria-live")).toBe("polite");
});

test('Text node updates when state changes', () => {
	const announcementString = "Here is a new announcement";
	const announcementAriaLive = "assertive";
	const { getByTestId, rerender } = render(<Announcer text="" />);

	expect(getByTestId("component-announcer").textContent).toBe("");

	rerender(
		<Announcer text={announcementString} politeness={announcementAriaLive} />
	);

	expect(getByTestId("component-announcer").textContent).toBe(announcementString);
	expect(getByTestId("component-announcer").getAttribute("aria-live")).toBe(announcementAriaLive);
});

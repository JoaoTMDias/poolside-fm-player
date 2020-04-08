import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";

import TopBar from "components/top-bar/index";

afterEach(cleanup);

describe("<TopBar />", () => {
	it("should render a top-bar", () => {
		const component = render(<TopBar />);

		expect(component).toMatchSnapshot();
	});

	it("should call the onClick mock", () => {
		const onClickMock = jest.fn();
		const { getByTestId } = render(<TopBar onClick={onClickMock} />);

		const button = getByTestId("component-top-bar-button");

		fireEvent.click(button);

		expect(onClickMock).toHaveBeenCalled();
	});

	it("should not the onClick mock, but close the window", () => {
		const onCloseWindow = jest.fn();
		const { getByTestId } = render(<TopBar />);

		window.close = onCloseWindow;

		const button = getByTestId("component-top-bar-button");

		fireEvent.click(button);

		expect(onCloseWindow).toHaveBeenCalled();
	});
});

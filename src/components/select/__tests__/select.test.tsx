import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react"

import Select from "components/select/select";
import { ISelectProps } from "../select.interface";

const initialProps: ISelectProps = {
	id: "component-select",
	currentIndex: 0,
	options: [
		{
			id: "poolside-fm",
			label: "Poolside FM (default)",
			value: "poolside-fm",
		},
		{
			id: "indie-summer",
			label: "Indie Summer",
			value: "indie-summer",
		},
		{
			id: "hangover-club",
			label: "Hangover Club",
			value: "hangover-club",
		},
		{
			id: "tokyo-disco",
			label: "Tokyo Disco",
			value: "tokyo-disco",
		},
		{
			id: "friday-nite-heat",
			label: "Friday Nite Heat",
			value: "friday-nite-heat",
		},
	],
};

afterEach(cleanup);

describe("<Select />", () => {
	it("should render a select component", () => {
		const component = render(<Select {...initialProps} />);

		expect(component).toMatchSnapshot();
	});

	it("should be closed by default", async () => {
		const { queryByTestId } = render(<Select {...initialProps} />);
		const selectOptionsList = await queryByTestId("component-select-list");
		expect(selectOptionsList).toBeNull();
	});

	it("should display a list on click on the button", async () => {
		const { getByTestId, getAllByTestId } = render(<Select {...initialProps} />);
		const selectButton = await getByTestId("component-select-button");

		fireEvent.click(selectButton);

		const selectOptionsList = await getAllByTestId("component-select-list");
		expect(selectOptionsList.length).toBe(1);
	});

	it("should display a default label on the button", async () => {
		const { getByTestId } = render(<Select {...initialProps} />);
		const selectButton = await getByTestId('component-select-button');
		const selectButtonValue = await selectButton.querySelector(".select-input__value");

		expect(selectButtonValue?.textContent).toBe(initialProps.options[0].label);
	});
});

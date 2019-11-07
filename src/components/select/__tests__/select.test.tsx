import React from "react";
import { shallow, mount } from "enzyme";

import Select from "components/select/index.component";
import SelectInputOptions from "../select-input-option";
import { ISelectProps } from "../select.interface";

const initialProps: ISelectProps = {
	id: "component-select",
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

describe("<Select />", () => {
	it("should render a select component", () => {
		const component = shallow(<Select {...initialProps} />);

		expect(component).toMatchSnapshot();
	});

	it("should be closed by default", () => {
		const component = shallow(<Select {...initialProps} />);
		const selectOptionsList = component.find(SelectInputOptions);
		expect(selectOptionsList.length).toBe(0);
	});

	it("should display a list on click on the button", () => {
		const component = mount(<Select {...initialProps} />);
		const selectButton = component.find("[data-testid='component-select-button']").first();

		selectButton.simulate("click");

		const selectOptionsList = component.find(SelectInputOptions);
		expect(selectOptionsList.length).toBe(1);
	});

	it("should display a default label on the button", () => {
		const component = mount(<Select {...initialProps} />);
		const selectButton = component.find("[data-testid='component-select-button']");
		const selectButtonValue = selectButton.find(".select-input__value");

		expect(selectButtonValue.text()).toBe(initialProps.options[0].label);
	});
});

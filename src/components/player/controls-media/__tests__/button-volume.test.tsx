import React from "react";
import { shallow, mount } from "enzyme";
import { findByTestAttr } from "helpers";
import ButtonVolume from "../button-volume";

describe("<ButtonVolume />", () => {
	describe("render", () => {
		it("should render without errors", () => {
			const wrapper = shallow(<ButtonVolume />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe("onChangeRangeInput", () => {
		it("should have been called on click on range input", () => {
			const root = (
				<div id="wrapper">
					<div id="app">
						<ButtonVolume />
					</div>
					<div id="app-portal" />
				</div>
			);

			ButtonVolume.prototype.onChangeRangeInput = jest.fn();

			const wrapper = mount(root);
			const button = findByTestAttr(wrapper, "component-controls-media-button-volume").first();

			button.simulate("click");

			const input = findByTestAttr(wrapper, "component-button-volume-range-input").first();

			input.simulate("change", {
				target: {
					value: 0.5,
				},
			});

			expect(ButtonVolume.prototype.onChangeRangeInput).toHaveBeenCalled();
		});
	});
});

import * as React from "react";
import { shallow } from "enzyme";

import { findByTestAttr, findById, findByClass } from "../index";

const DemoComponent = () => {
	return (
		<fieldset id="demo-component">
			<input
				id="demo-component-input"
				data-testid="demo-component-input"
				className="demo-component-input"
				type="text"
				value=""
				placeholder="Foobar"
			/>
			<button type="button" id="demo-component-button" data-testid="demo-component-button">
				<span className="demo-component-span">A Demo Button</span>
			</button>
		</fieldset>
	);
};

describe("findByTestAttr", () => {
	it("should find an element by its test attribute", () => {
		const component = shallow(<DemoComponent />);
		const button = findByTestAttr(component, "demo-component-button");

		expect(button.length).toBe(1);
	});
});

describe("findById", () => {
	it("should find an element by its id", () => {
		const component = shallow(<DemoComponent />);
		const input = findById(component, "demo-component-input");

		expect(input.length).toBe(1);
	});
});

describe("findByClass", () => {
	it("should find an element by its class as a string", () => {
		const component = shallow(<DemoComponent />);
		const span = findByClass(component, "demo-component-span");

		expect(span.length).toBe(1);
	});

	it("should find an element by its class with a dot", () => {
		const component = shallow(<DemoComponent />);
		const span = findByClass(component, ".demo-component-span");

		expect(span.length).toBe(1);
	});
});

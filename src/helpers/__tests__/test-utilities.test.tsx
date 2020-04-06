import React from "react";
import { render, cleanup } from "@testing-library/react";
import {
	findByAttribute,
	findByClassname,
	findById,
	getAllByAttribute,
	getAllByClassname,
	getAllById,
} from "../index";

afterEach(cleanup);

const DemoComponent = () => {
	return (
		<fieldset id="demo-component">
			<input
				id="demo-component-input"
				data-testid="demo-component-input"
				className="demo-component-input"
				type="text"
				defaultValue=""
				placeholder="Foobar"
			/>
			<button
				type="button"
				data-demo="button"
				id="demo-component-button"
				data-testid="demo-component-button"
			>
				<span className="demo-component-span">A Demo Button</span>
			</button>
		</fieldset>
	);
};

describe("findByAttribute", () => {
	it("should find an element by its data attribute", async () => {
		const { container } = render(<DemoComponent />);
		const button = await findByAttribute(container, "[data-demo='button']");

		expect(button?.tagName).toBe("BUTTON");
	});
});

describe("getAllByAttribute", () => {
	it("should find all element by its type attribute", async () => {
		const { container } = render(<DemoComponent />);
		const input = await getAllByAttribute(container, "[type='text']");

		expect(input?.length).toBe(1);
	});
});

describe("findById", () => {
	it("should find an element by its id", async () => {
		const { container } = render(<DemoComponent />);
		const input = await findById(container, "#demo-component-input");

		expect(input?.tagName).toBe("INPUT");
	});
});

describe("getAllById", () => {
	it("should find all elements by its id", async () => {
		const { container } = render(<DemoComponent />);
		const input = await getAllById(container, "#demo-component-input");

		expect(input?.length).toBe(1);
	});
});

describe("findByClassname", () => {
	it("should find an element by its class", async () => {
		const { container } = render(<DemoComponent />);
		const span = await findByClassname(container, ".demo-component-span");

		expect(span?.tagName).toBe("SPAN");
	});
});

describe("getAllByClassname", () => {
	it("should find an element by its class", async () => {
		const { container } = render(<DemoComponent />);
		const span = await getAllByClassname(container, ".demo-component-span");

		expect(span?.length).toBe(1);
	});
});

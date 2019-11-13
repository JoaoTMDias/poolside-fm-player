import * as React from "react";
import { shallow } from "enzyme";

import { withMemo } from "../index";

interface IDemoComponentProps {
	title: string;
	value?: string;
}

const DemoComponent: React.FunctionComponent<IDemoComponentProps> = ({ title, value }) => {
	return (
		<fieldset id="demo-component">
			<input
				id="demo-component-input"
				data-testid="demo-component-input"
				className="demo-component-input"
				type="text"
				value={value}
				placeholder="Foobar"
			/>
			<button type="button" id="demo-component-button" data-testid="demo-component-button">
				<span className="demo-component-span">{title}</span>
			</button>
		</fieldset>
	);
};

DemoComponent.defaultProps = {
	title: "Default title",
	value: "Default value",
};

const MemoDemo = withMemo<IDemoComponentProps>(DemoComponent, ["title"]);

describe("withMemo", () => {
	it("should return a MemoExoticComponent", () => {
		const component = shallow(<MemoDemo title="A new title" />);
		expect(component).toMatchSnapshot();
	});
});

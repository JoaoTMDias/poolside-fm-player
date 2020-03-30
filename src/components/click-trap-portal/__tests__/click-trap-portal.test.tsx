import React from "react";
import { mount } from "enzyme";
import { KEY_CODES, findByTestAttr } from "helpers";
import ClickTrapPortal from "..";

describe("<ClickTrapPortal />", () => {
	it("should render the portal", () => {
		const wrapper = mount(
			<div id="app-portal">
				<ClickTrapPortal onClickToClose={() => {}}>
					<p>Test</p>
				</ClickTrapPortal>
			</div>
		);

		expect(wrapper).toMatchSnapshot();
	});

	describe("should close the portal", () => {
		it("on click", () => {
			const onClickToCloseMock = jest.fn();

			const wrapper = mount(
				<div id="app-portal">
					<ClickTrapPortal onClickToClose={onClickToCloseMock}>
						<p>I am trapped inside the portal</p>
					</ClickTrapPortal>
				</div>
			);

			const button = findByTestAttr(wrapper, "component-portal-click-trap").first();
			button.simulate("click");

			expect(onClickToCloseMock).toHaveBeenCalled();
		});

		it("on press on ESC", () => {
			const map = {};

			window.addEventListener = jest.fn((event: any, callback: any) => {
				// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
				// @ts-ignore
				map[event] = callback;
			});

			const onClickToCloseMock = jest.fn();

			mount(
				<div id="app-portal">
					<ClickTrapPortal onClickToClose={onClickToCloseMock}>
						<p>I am trapped inside the portal</p>
					</ClickTrapPortal>
				</div>
			);

			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			map.keyup({ keyCode: KEY_CODES.ESC });

			expect(onClickToCloseMock).toHaveBeenCalled();
		});
	});

	it("should not close the portal on press on another key", () => {
		const map = {};

		window.addEventListener = jest.fn((event: any, callback: any) => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
			// @ts-ignore
			map[event] = callback;
		});

		const onClickToCloseMock = jest.fn();

		mount(
			<div id="app-portal">
				<ClickTrapPortal onClickToClose={onClickToCloseMock}>
					<p>I am trapped inside the portal</p>
				</ClickTrapPortal>
			</div>
		);

		// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
		// @ts-ignore
		map.keyup({ keyCode: KEY_CODES.ENTER });

		expect(onClickToCloseMock).not.toHaveBeenCalled();
	});

	it("should clear the global event listner on unmount", () => {
		window.removeEventListener = jest.fn();

		const onClickToCloseMock = jest.fn();

		const wrapper = mount(
			<div id="app-portal">
				<ClickTrapPortal onClickToClose={onClickToCloseMock}>
					<p>I am trapped inside the portal</p>
				</ClickTrapPortal>
			</div>
		);

		wrapper.unmount();

		expect(window.removeEventListener).toHaveBeenCalled();
	});
});

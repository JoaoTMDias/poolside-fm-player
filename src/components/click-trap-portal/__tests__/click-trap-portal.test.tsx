import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { KEY_CODES } from "helpers";
import ClickTrapPortal from "..";

afterEach(cleanup);

describe("<ClickTrapPortal />", () => {
	it("should render the portal", () => {
		const wrapper = render(
			<div id="app-portal">
				<ClickTrapPortal
					title="Title"
					onClickToClose={() => {}}
				>
					<p>Test</p>
				</ClickTrapPortal>
			</div>
		);

		expect(wrapper).toMatchSnapshot();
	});

	describe("should close the portal", () => {
		it("on click", () => {
			const onClickToCloseMock = jest.fn();

			const { getByTestId } = render(
				<div id="app-portal">
					<ClickTrapPortal
						title="Title"
						onClickToClose={onClickToCloseMock}
					>
						<p>I am trapped inside the portal</p>
					</ClickTrapPortal>
				</div>
			);

			const button = getByTestId("component-portal-click-trap");

			fireEvent.click(button);

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

			render(
				<div id="app-portal">
					<ClickTrapPortal
						title="Title"
						onClickToClose={onClickToCloseMock}
					>
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

		render(
			<div id="app-portal">
				<ClickTrapPortal
					title="Title"
					onClickToClose={onClickToCloseMock}
				>
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

		const wrapper = render(
			<div id="app-portal">
				<ClickTrapPortal
					title="Title"
					onClickToClose={onClickToCloseMock}
				>
					<p>I am trapped inside the portal</p>
				</ClickTrapPortal>
			</div>
		);

		wrapper.unmount();

		expect(window.removeEventListener).toHaveBeenCalled();
	});
});

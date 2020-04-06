import React from "react";
import { render, fireEvent } from "@testing-library/react";
import KEY_CODES from "helpers/key-codes";
import Provider from "../roving-provider";
import useRovingTabIndex from "../use-roving-tabindex";
import { EKeyDirection } from "../types";

const TestButton: React.FC<{
	disabled: boolean;
	id?: string;
}> = ({ disabled, children, id }) => {
	const ref = React.useRef<HTMLButtonElement>(null);
	const [tabIndex, focused, handleKeyDown, handleClick] = useRovingTabIndex(ref, disabled, id);

	return (
		<button
			ref={ref}
			type="button"
			id={id}
			onKeyDown={handleKeyDown}
			onClick={handleClick}
			tabIndex={tabIndex}
			data-focused={focused}
		>
			{children}
		</button>
	);
};

const TestToolbar: React.FC<{
	direction?: EKeyDirection.HORIZONTAL | EKeyDirection.VERTICAL | EKeyDirection.BOTH;
	flags?: Array<boolean>;
}> = ({ flags = [false, false, false], direction }) => (
	<Provider direction={direction}>
		<TestButton disabled={flags[0]}>Button One</TestButton>
		<div>
			<TestButton disabled={flags[1]}>Button Two</TestButton>
		</div>
		<TestButton disabled={flags[2]}>Button Three</TestButton>
	</Provider>
);

const TestToolbarWithIDs: React.FC<{
	flags?: Array<boolean>;
}> = ({ flags = [false, false, false] }) => (
	<Provider>
		<TestButton disabled={flags[0]} id="user-id-1">
			Button One
		</TestButton>
		<div>
			<TestButton disabled={flags[1]} id="user-id-2">
				Button Two
			</TestButton>
		</div>
		<TestButton disabled={flags[2]} id="user-id-3">
			Button Three
		</TestButton>
	</Provider>
);

describe("useRovingTaxIndex", () => {
	test("displays correctly initially when no buttons are disabled", async () => {
		const flags = [false, false, false];
		const { getByText } = render(<TestToolbar flags={flags} />);
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
	});

	test("displays correctly initially when custom IDs are used", async () => {
		const flags = [false, false, false];
		const { getByText } = render(<TestToolbarWithIDs flags={flags} />);
		expect(getByText("Button One").id).toEqual("user-id-1");
		expect(getByText("Button Two").id).toEqual("user-id-2");
		expect(getByText("Button Three").id).toEqual("user-id-3");
	});

	test("displays correctly initially when first button is disabled", async () => {
		const flags = [true, false, false];
		const { getByText } = render(<TestToolbar flags={flags} />);
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button Two").tabIndex).toEqual(0);
		expect(getByText("Button Three").tabIndex).toEqual(-1);
	});

	test("updates correctly when a button changes to being disabled", async () => {
		let flags = [false, false, false];
		const { getByText, rerender } = render(<TestToolbar flags={flags} />);
		flags = [true, false, false];
		rerender(<TestToolbar flags={flags} />);
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button Two").tabIndex).toEqual(0);
		expect(getByText("Button Three").tabIndex).toEqual(-1);
	});

	describe("direction is 'horizontal'", () => {
		test("pressing arrow right key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.HORIZONTAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow left key", async () => {
			const { getByText } = render(<TestToolbar />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow up key", async () => {
			const { getByText } = render(<TestToolbar />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);
		});

		test("pressing down up key", async () => {
			const { getByText } = render(<TestToolbar />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);
		});
	});

	describe("direction is 'vertical'", () => {
		test("pressing arrow down key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow up key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow right key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);
		});

		test("pressing arrow down key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Three").tabIndex).toEqual(-1);
		});
	});

	describe("direction is 'both'", () => {
		test("pressing arrow right key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.BOTH} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_RIGHT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow left key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.BOTH} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_LEFT });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow down key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_DOWN });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});

		test("pressing arrow up key", async () => {
			const { getByText } = render(<TestToolbar direction={EKeyDirection.VERTICAL} />);

			fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(0);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

			fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(-1);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Two").tabIndex).toEqual(0);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

			fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.ARROW_UP });
			expect(getByText("Button One").tabIndex).toEqual(0);
			expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
			expect(getByText("Button Two").tabIndex).toEqual(-1);
			expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
			expect(getByText("Button Three").tabIndex).toEqual(-1);
			expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
		});
	});

	test("pressing home key", async () => {
		const { getByText } = render(<TestToolbar />);

		fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
	});

	test("pressing end key", async () => {
		const { getByText } = render(<TestToolbar />);

		fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

		fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

		fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");
	});

	test("pressing home key", async () => {
		const { getByText } = render(<TestToolbar />);

		fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.HOME });
		expect(getByText("Button One").tabIndex).toEqual(0);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(-1);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
	});

	test("pressing end key", async () => {
		const { getByText } = render(<TestToolbar />);

		fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

		fireEvent.keyDown(getByText("Button Two"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");

		fireEvent.keyDown(getByText("Button Three"), { keyCode: KEY_CODES.END });
		expect(getByText("Button One").tabIndex).toEqual(-1);
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").tabIndex).toEqual(-1);
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").tabIndex).toEqual(0);
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("true");
	});

	test("manages focus when switching between keyboard and mouse input", async () => {
		const flags = [false, false, false];
		const { getByText } = render(<TestToolbar flags={flags} />);

		fireEvent.click(getByText("Button One"));
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.keyDown(getByText("Button One"), { keyCode: KEY_CODES.ARROW_RIGHT });
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");

		fireEvent.click(getByText("Button One"));
		expect(getByText("Button One").getAttribute("data-focused")).toEqual("true");
		expect(getByText("Button Two").getAttribute("data-focused")).toEqual("false");
		expect(getByText("Button Three").getAttribute("data-focused")).toEqual("false");
	});
});

import { renderHook } from "@testing-library/react-hooks";
import useFocusOnElement from "../use-focus-effect";

describe("useFocusOnElement", () => {
	test("does not focus on mount when false", () => {
		const focusMock = jest.fn();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockRef = { current: { focus: focusMock } } as React.RefObject<any>;
		const { rerender } = renderHook(() => useFocusOnElement(false, mockRef));
		expect(focusMock).toBeCalledTimes(0);
		rerender();
		expect(focusMock).toBeCalledTimes(0);
	});

	test("focuses on mount when true", () => {
		const focusMock = jest.fn();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockRef = { current: { focus: focusMock } } as React.RefObject<any>;
		const { rerender } = renderHook(() => useFocusOnElement(true, mockRef));
		expect(focusMock).toBeCalledTimes(1);
		rerender();
		expect(focusMock).toBeCalledTimes(1);
	});

	test("focuses when focus value changes to true", () => {
		let focused = false;
		const focusMock = jest.fn();
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockRef = { current: { focus: focusMock } } as React.RefObject<any>;
		const { rerender } = renderHook(() => useFocusOnElement(focused, mockRef));

		focused = true;
		rerender();
		expect(focusMock).toBeCalledTimes(1);
		rerender();
		expect(focusMock).toBeCalledTimes(1);

		focused = false;
		rerender();
		expect(focusMock).toBeCalledTimes(1);
	});
});

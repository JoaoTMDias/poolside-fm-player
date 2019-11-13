import { hasPressedSpaceOrEnter, KEY_CODES } from "../index";

describe("hasPressedSpaceOrEnter", () => {
	it("should return true if pressed ENTER", () => {
		expect(hasPressedSpaceOrEnter(KEY_CODES.ENTER)).toBeTruthy();
	});

	it("should return true if pressed SPACE", () => {
		expect(hasPressedSpaceOrEnter(KEY_CODES.SPACE)).toBeTruthy();
	});

	it("should return false if pressed another non-mapped KEY", () => {
		expect(hasPressedSpaceOrEnter(KEY_CODES.ARROW_DOWN)).toBeFalsy();
		expect(hasPressedSpaceOrEnter(KEY_CODES.BACK)).toBeFalsy();
		expect(hasPressedSpaceOrEnter(KEY_CODES.ESC)).toBeFalsy();
	});
});

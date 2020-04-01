import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { KEY_CODES } from "helpers";
import ButtonVolume from "../button-volume";

afterEach(cleanup);

describe("<ButtonVolume />", () => {
	describe("render", () => {
		it("should render without errors", () => {
			const wrapper = render(<ButtonVolume />);

			expect(wrapper).toMatchSnapshot();
		});
	});

	describe("data-volume", () => {
		it("should have been updated on click on range input", async () => {
			const ButtonVolumeWithPortal = () => (
				<div id="wrapper">
					<div id="app">
						<ButtonVolume />
					</div>
					<div id="app-portal" />
				</div>
			);

			const { getByTestId } = render(<ButtonVolumeWithPortal />);
			const button = await getByTestId("component-controls-media-button-volume");

			fireEvent.click(button);

			const input = await getByTestId("component-button-volume-range-input");

			fireEvent.change(input, {
				target: {
					value: 0.5,
				},
			});

			expect(button.getAttribute("data-volume")).toBe("0.5");
		});
	});

	describe("onChangeVolume", () => {
		it("should have been called on change on range input", async () => {
			const onChangeVolumeMock = jest.fn();
			const EXPECTED_VOLUME = "0.5";

			const ButtonVolumeWithPortal = () => (
				<div id="wrapper">
					<div id="app">
						<ButtonVolume
							onChangeVolume={onChangeVolumeMock}
						/>
					</div>
					<div id="app-portal" />
				</div>
			);

			const { getByTestId } = render(<ButtonVolumeWithPortal />);
			const button = await getByTestId("component-controls-media-button-volume");

			fireEvent.click(button);

			const input = await getByTestId("component-button-volume-range-input");

			fireEvent.change(input, {
				target: {
					value: EXPECTED_VOLUME,
				},
			});

			expect(onChangeVolumeMock).toHaveBeenCalledWith(EXPECTED_VOLUME);
		});
	});

	describe("onClick", () => {
		it("should have been called on change on range input", async () => {
			const onClickMock = jest.fn();

			const ButtonVolumeWithPortal = () => (
				<div id="wrapper">
					<div id="app">
						<ButtonVolume
							onClick={onClickMock}
						/>
					</div>
					<div id="app-portal" />
				</div>
			);

			const { getByTestId } = render(<ButtonVolumeWithPortal />);
			const button = await getByTestId("component-controls-media-button-volume");

			fireEvent.click(button);

			const closeButton = await getByTestId("component-portal-click-trap");

			fireEvent.click(closeButton);

			expect(onClickMock).toHaveBeenCalled();
		});

		describe("should have been called on change on key up", () => {
			it("on ENTER input", async () => {
				const onClickMock = jest.fn();
	
				const ButtonVolumeWithPortal = () => (
					<div id="wrapper">
						<div id="app">
							<ButtonVolume
								onClick={onClickMock}
							/>
						</div>
						<div id="app-portal" />
					</div>
				);
	
				const { getByTestId } = render(<ButtonVolumeWithPortal />);
				const button = await getByTestId("component-controls-media-button-volume");
	
				fireEvent.keyUp(button, {
					keyCode: KEY_CODES.ENTER,
				});
	
				expect(onClickMock).toHaveBeenCalled();
			});

			it("on SPACE input", async () => {
				const onClickMock = jest.fn();

				const ButtonVolumeWithPortal = () => (
					<div id="wrapper">
						<div id="app">
							<ButtonVolume
								onClick={onClickMock}
							/>
						</div>
						<div id="app-portal" />
					</div>
				);

				const { getByTestId } = render(<ButtonVolumeWithPortal />);
				const button = await getByTestId("component-controls-media-button-volume");

				fireEvent.keyUp(button, {
					keyCode: KEY_CODES.SPACE,
				});

				expect(onClickMock).toHaveBeenCalled();
			});
		});

		it("should not have been called on change on key up with any other key", async () => {
			const onClickMock = jest.fn();
	
			const ButtonVolumeWithPortal = () => (
				<div id="wrapper">
					<div id="app">
						<ButtonVolume
							onClick={onClickMock}
						/>
					</div>
					<div id="app-portal" />
				</div>
			);
	
			const { getByTestId } = render(<ButtonVolumeWithPortal />);
			const button = await getByTestId("component-controls-media-button-volume");
	
			fireEvent.keyUp(button, {
				keyCode: KEY_CODES.ARROW_DOWN,
			});

			fireEvent.keyUp(button, {
				keyCode: KEY_CODES.BACK,
			});

			fireEvent.keyUp(button, {
				keyCode: KEY_CODES.PLAY_PAUSE,
			});
	
			expect(onClickMock).not.toHaveBeenCalled();
		});
	});
});

/// <reference types="cypress" />
/// <reference types="../../support" />

import { setupLayout } from "../../mocks/setupLayout";

const SETTINGS_URL = "/#/settings";

describe("Settings", () => {
	beforeEach(() => {
		setupLayout();
	});

	it("should show the page and present it's url", () => {
		cy.getByTestId("component-controls-button-settings").click();
		cy.location().should((location) => {
			expect(location.href).contains(SETTINGS_URL);
		});
		cy.getAnnouncerText("Navigated to the Settings Page");
	});
});

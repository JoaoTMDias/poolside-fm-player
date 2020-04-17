/// <reference types="cypress" />
/// <reference types="../../support" />

import { setupLayout } from "../../mocks/setupLayout";
const HOMEPAGE_URL = "/";

describe("Homepage", () => {
	beforeEach(() => {
		setupLayout();
	});

	it("should show the page and present it's url", () => {
		cy.location().should((location) => {
			expect(location.href).contains(HOMEPAGE_URL);
		});
		cy.getAnnouncerText("Navigated to the Home page");
	});
});

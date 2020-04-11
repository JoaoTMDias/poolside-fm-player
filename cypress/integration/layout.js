// / <reference types="cypress" />

import { setupLayout } from "../mocks/setupLayout";

describe("Layout", () => {
	beforeEach(() => {
		setupLayout();

		cy.get("@getPoolsideFMOfficialPlaylist");
		cy.get("@getSoundcloudResolve");
	});

	it("cy.go() - go back or forward in the browser's history", () => {});
});

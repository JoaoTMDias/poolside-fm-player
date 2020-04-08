// / <reference types="cypress" />
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../src/data/constants/native";

describe("Status", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
		cy.viewport(WINDOW_WIDTH, WINDOW_HEIGHT);
	});

	it("should load the app", () => {
		cy.get("[data-testid='component-player-visualizer-label']").should("have.text", "Ready!");
		cy.get("[data-playing-status='ready']").should("exist");
		cy.get("[data-testid='component-controls-media-button-play']")
			.should("have.attr", "title")
			.and("eq", "Play song");
	});
});

// / <reference types="cypress" />
import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../src/data/constants/native";

describe("Change Playlists", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
		cy.viewport(WINDOW_WIDTH, WINDOW_HEIGHT);
	});

	it("should change the playlist to Indie Summer", () => {
		cy.getByTestId("component-select-button").click();
		cy.get(".select-input__option[aria-selected='true'] button").focus().type("{downarrow}");
		cy.get("#indie-summer-id-1 button").should("have.focus").type("{enter}").trigger("click");
		cy.getByTestId("component-select-button").find("#channel-title").contains("Indie Summer");
	});
});

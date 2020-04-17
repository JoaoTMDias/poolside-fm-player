/// <reference types="cypress" />
import { setupLayout } from "../mocks/setupLayout";

describe("Change Playlists", () => {
	beforeEach(() => {
		setupLayout();
	});

	it("should change the playlist to another", () => {
		cy.getByTestId("component-select-button").click();
		cy.get(".select-input__option[aria-selected='true'] button").focus().type("{downarrow}");
		cy.get("#indie-summer-id-1 button").should("have.focus").type("{enter}").trigger("click");
		cy.getByTestId("component-select-button").find("#channel-title").contains("Indie Summer");
	});
});

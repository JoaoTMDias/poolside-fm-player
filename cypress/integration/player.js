/// <reference types="Cypress" />

import { setupLayout } from "../mocks/setupLayout";
import { DEFAULT_TIMEOUT, TIMEOUT_LONGER } from "../constants/timeouts";
import { SELECTORS } from "../constants/selectors";

describe("Status", () => {
	beforeEach(() => {
		setupLayout();
	});

	describe("Startup", () => {
		it("should not have any song loaded at first", () => {
			cy.getByTestId(SELECTORS.player.metadata.wrapper)
				.find(SELECTORS.player.metadata.title)
				.contains("No title");
			cy.getByTestId(SELECTORS.player.metadata.wrapper)
				.find(SELECTORS.player.metadata.artist)
				.contains("No artist");
		});
	});

	describe("Player", () => {
		it("should be ready to play", () => {
			cy.getByAttr(SELECTORS.status, "ready").should("exist");
			cy.getByTestId(SELECTORS.visualizer.label).contains("Ready!");
			cy.getByTestId(SELECTORS.player.metadata.wrapper)
				.find(SELECTORS.player.metadata.time.initial)
				.contains("00:00");
			cy.getByTestId(SELECTORS.playlist.button.element)
				.find(SELECTORS.playlist.button.title)
				.contains("Poolside.Fm (Official Playlist)");
			cy.getByTestId(SELECTORS.player.buttons.play)
				.should("have.attr", "title")
				.and("eq", "Play song");
		});

		it("should play a song", () => {
			cy.wait(TIMEOUT_LONGER);
			cy.getByTestId(SELECTORS.player.buttons.play).click();
			cy.getByTestId(SELECTORS.player.metadata.wrapper)
				.find(SELECTORS.player.metadata.title)
				.not("have.text", "No title");
			cy.getByTestId(SELECTORS.player.metadata.wrapper)
				.find(SELECTORS.player.metadata.artist)
				.not("have.text", "No artist");
			cy.wait(DEFAULT_TIMEOUT);
			cy.getByTestId(SELECTORS.player.buttons.play).click();
		});

		it("should change the song to another", () => {
			cy.wait(TIMEOUT_LONGER);
			cy.getByTestId(SELECTORS.player.buttons.play).click();
			cy.wait(DEFAULT_TIMEOUT);
			cy.getByTestId(SELECTORS.player.buttons.next).click();
			cy.getByTestId(SELECTORS.player.buttons.play).click();
		});
	});
});

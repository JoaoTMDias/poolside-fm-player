/// <reference types="cypress" />

import { WINDOW_WIDTH, WINDOW_HEIGHT } from "../../src/data/constants/native";
 
describe("Layout", () => {
	beforeEach(() => {
		cy.visit("http://localhost:3000");
		cy.viewport(WINDOW_WIDTH, WINDOW_HEIGHT);
	});

	it("cy.go() - go back or forward in the browser's history", () => {

	});
});

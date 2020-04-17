/// <reference types="cypress" />

declare namespace Cypress {
	interface Chainable<Subject> {
		getByTestId(id: string): Chainable<any>
		getByAttr(attribute: string, value: string): Chainable<any>
		getAnnouncerText(message: string): Chainable<any>
	}
}

Cypress.Commands.add("getByTestId", (id) => {
	cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add("getByAttr", (attribute, value) => {
	cy.get(`[${attribute}="${value}"]`);
});

Cypress.Commands.add("getAnnouncerText", (message) => {
	cy.getByTestId("component-announcer").contains(message);
});

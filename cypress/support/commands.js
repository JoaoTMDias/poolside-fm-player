Cypress.Commands.add("getByTestId", (id) => {
	cy.get(`[data-testid="${id}"]`);
});

Cypress.Commands.add("getByAttr", (attribute, value) => {
	cy.get(`[${attribute}="${value}"]`);
});

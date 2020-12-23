// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("autoLogin", () => {
  cy.visit("/login");

  cy.get("#formBasicEmail").type("test@e2e.com");
  cy.get("#formBasicPassword").type("treelang");

  cy.get("button[type='submit']").click();
});

Cypress.Commands.add("login", (email, password) => {
  cy.visit("/login");

  cy.get("#formBasicEmail").type(email);
  cy.get("#formBasicPassword").type(password);

  cy.get("button[type='submit']").click();
});

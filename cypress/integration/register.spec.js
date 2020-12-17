var faker = require('faker');

context("Register", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("can register", () => {
        const fakeName = faker.name.firstName();
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password();

        cy.get("#formBasicName").type(fakeName);
        cy.get("#formBasicEmail").type(fakeEmail);
        cy.get("#formBasicPassword").type(fakePassword);
        cy.get("#formBasicConfirmPassword").type(fakePassword);

        cy.get("button[type='submit']").click();

        cy.location("pathname").should("include", "login");
    });

    it("can register and login", () => {
        const fakeName = faker.name.firstName();
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password();

        cy.get("#formBasicName").type(fakeName);
        cy.get("#formBasicEmail").type(fakeEmail);
        cy.get("#formBasicPassword").type(fakePassword);
        cy.get("#formBasicConfirmPassword").type(fakePassword);

        cy.get("button[type='submit']").click();

        cy.location("pathname").should("include", "login");

        cy.get("#formBasicPassword").type(fakePassword);

        cy.get("button[type='submit']").click();

        cy.location("pathname").should("include", "my-forest");
        cy.get(".Username").should("have.text", fakeName);
    });

    it("denies wrong confirm-password", () => {
        const fakeName = faker.name.firstName();
        const fakeEmail = faker.internet.email();
        const fakePassword = faker.internet.password();

        cy.get("#formBasicName").type(fakeName);
        cy.get("#formBasicEmail").type(fakeEmail);
        cy.get("#formBasicPassword").type(fakePassword);
        cy.get("#formBasicConfirmPassword").type(fakePassword + "a");

        cy.get("button[type='submit']").click();

        cy.location("pathname").should("include", "register");
        cy.get(".formError").should("have.text", "Passwords doesn't match");
    });

    it("can swap to login", () => {
        cy.get(".alreadyRegistered").click();

        cy.location("pathname").should("include", "login");
    });

});
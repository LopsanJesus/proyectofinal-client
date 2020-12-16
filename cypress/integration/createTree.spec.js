var faker = require('faker');

context("Create Tree", () => {
    it("can create a tree", () => {
        cy.autoLogin();

        cy.get(".createTreeButton").click();

        cy.location("pathname").should("include", "create-tree");

        const fakeName = "Test " + faker.lorem.word(10);

        cy.get("#formBasicName").type(fakeName);
        cy.get("#formBasicSourceLang").select("Inglés");
        cy.get("#formBasicTargetLang").select("Español");
        cy.get("button[type='submit']").click();

        cy.location("pathname").should("include", "my-forest");
        cy.get('.card-title .title').last().should("have.text", fakeName);
    });
});
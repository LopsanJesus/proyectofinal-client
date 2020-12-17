var faker = require('faker');

context("Create Branch", () => {
    it("can create a branch", () => {
        cy.autoLogin();
        cy.wait(1000);
        cy.visit("tree/10");

        cy.get(".createTreeButton").click();

        const fakeBranch = "Test " + faker.lorem.word(10);

        cy.get("#formBasicName").type(fakeBranch);

        cy.get(".col input").each(($el) => {
            cy.get($el).type("a");
        });

        cy.get("button div").click();
        cy.wait(1000);

        cy.location("pathname").should("include", "tree/10");
    });

    it("can't create with empty branch name", () => {
        cy.autoLogin();
        cy.wait(1000);
        cy.visit("tree/10");

        // cy.location("pathname").should("include", "/tree/4");

        cy.get(".createTreeButton").click();

        cy.location("pathname").should("include", "/create-branch/");

        const fakeBranch = "Test " + faker.lorem.word(10);

        //cy.get("#formBasicName").type("");

        cy.get(".col input").each(($el) => {
            cy.get($el).type("a");
        });

        cy.get("button div").click();

        cy.get("#formError").should("have.text", "There cannot be empty fields")
    });
});
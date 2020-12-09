context("Login", () => {
    beforeEach(() => {
        cy.visit("/login");
    });

    it("can login", () => {
        cy.autoLogin();

        cy.location("pathname").should("include", "my-forest");
    });

    it("can swap to register", () => {
        cy.get(".needAccount").click();

        cy.location("pathname").should("include", "register");
    });

});
context("Window", () => {
    it("displays title", () => {
        cy.visit("/");
        cy.title().should('include', 'Treelang')
    });
});
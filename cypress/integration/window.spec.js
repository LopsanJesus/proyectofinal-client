context("Window", () => {
  it("displays title", () => {
    cy.visit("/");
    cy.title().should("include", "Treelang");
  });

  // it("waits for GET", () => {
  //   cy.intercept("POST", "**/graphql").as("getGraphql");

  //   cy.visit("/");
  //   cy.title().should("include", "Treelang");
  // });
});

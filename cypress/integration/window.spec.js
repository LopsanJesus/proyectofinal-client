context("Window", () => {
  it("displays title", () => {
    cy.visit("/");
    cy.title().should("include", "Treelang");
  });

  it("waits for GET", () => {
    cy.intercept("POST", "**/graphql").as("getGraphql");

    cy.visit("/");
    cy.title().should("include", "Treelang");

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    //cy.get('.network-btn').click()

    // wait for GET comments/1
    cy.wait("@getGraphql")
      .its("response.statusCode")
      .should("be.oneOf", [200, 304]);
  });
});

describe("template spec", () => {
  beforeEach(() => {
    cy.signIn({
      email: Cypress.env("CY_TEST_EMAIL")!,
      password: Cypress.env("CY_TEST_PASSWORD")!,
    });

    cy.visit("/");
  });
  it("Home", () => {
    cy.visit("/");
  });
});

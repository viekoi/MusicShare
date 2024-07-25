describe("home page", () => {
  it("Validate submitting UploadSongForm with valid data", () => {
    cy.visit("/");
    cy.dataCy("uploadSongButton").should("not.exist");
    cy.signIn({
      email: Cypress.env("CY_TEST_EMAIL")!,
      password: Cypress.env("CY_TEST_PASSWORD")!,
    });
    cy.dataCy("uploadSongModal").should("not.exist");
    cy.dataCy("uploadSongForm").should("not.exist");

    cy.dataCy("uploadSongButton").should("be.visible").click();
    cy.dataCy("uploadSongModal")
      .should("be.visible")
      .within(() => {
        cy.dataCy("modalTitle")
          .invoke("text")
          .should("match", /chia sẽ bài hát yêu thích/i);
      });
    cy.dataCy("uploadSongForm")
      .should("be.visible")
      .within(() => {
        cy.dataCy("titleInput").should("be.visible").type("Là do em xui thôi");
        cy.dataCy("authorInput")
          .should("be.visible")
          .type("Khói, Sofia, Châu Đăng Khoa");
        cy.dataCy("mp3FileInput")
          .should("be.visible")
          .selectFile("./public/Là do em xui thôi.mp3");
        cy.dataCy("imageInput")
          .should("be.visible")
          .selectFile("./public/Là do em xui thôi.jpg");
        cy.dataCy("submitButton").should("be.visible").as("submitButton");
        cy.get("@submitButton")
          .invoke("text")
          .should("match", /tạo ngay/i);
        cy.get("@submitButton").click();
      });
  });
});

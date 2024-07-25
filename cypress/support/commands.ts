/// <reference types="cypress" />

import supaLogin from "../tasks/supaSignIn";

// ***********************************************
// This example commands.ts shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add("dataCy", (value) => {
  cy.get(`[data-cy=${value}]`);
});

Cypress.Commands.add("signIn", (credentials, redirect) => {
  supaLogin(credentials.email, credentials.password);
  cy.session([credentials.email, credentials.password], () => {
    cy.log(`Signing in with ${credentials.email}`);
  });

  cy.visit(redirect ? redirect : "/");
});

Cypress.Commands.add(
  "uploadSongFormTest",
  ({ title, imageFilePath, mp3FilePath, author, isValid }) => {
    const email = Cypress.env("CY_TEST_EMAIL");
    const password = Cypress.env("CY_TEST_PASSWORD");
    if (isValid) {
      cy.intercept(
        "POST",
        `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/storage/v1/object/songs/*`
      ).as("uploadSong");

      cy.intercept(
        "POST",
        `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/storage/v1/object/images/*`
      ).as("uploadImage");

      cy.intercept(
        "POST",
        `${Cypress.env("NEXT_PUBLIC_SUPABASE_URL")}/rest/v1/songs`
      ).as("createSongRecord");
    }

    cy.dataCy("uploadSongButton").should("not.exist");
    cy.signIn({ email, password });

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
        if (title) cy.dataCy("titleInput").type(title);
        if (author) cy.dataCy("authorInput").type(author);
        if (mp3FilePath) cy.dataCy("mp3FileInput").selectFile(mp3FilePath);
        if (imageFilePath) cy.dataCy("imageInput").selectFile(imageFilePath);

        cy.dataCy("submitButton").should("be.visible").click();
      });
    if (isValid) {
      cy.wait("@uploadSong").its("response.statusCode").should("eq", 200);

      cy.wait("@uploadImage").its("response.statusCode").should("eq", 200);

      cy.wait("@createSongRecord").its("response.statusCode").should("eq", 201);

      cy.contains("Bài hát được tạo thành công").should("be.visible");

      cy.dataCy("uploadSongModal").should("not.exist");
    } else {
      cy.dataCy("uploadSongForm")
        .should("be.visible")
        .within(() => {
          if (!title) cy.dataCy("titleInputMessage").should("be.visible");
          if (!author) cy.dataCy("authorInputMessage").should("be.visible");
          if (!mp3FilePath)
            cy.dataCy("mp3FileInputMessage").should("be.visible");
          if (!imageFilePath)
            cy.dataCy("imageInputMessage").should("be.visible");
        });
    }
  }
);

// /cypress/support/index.d.ts
/// <reference  types="cypress" />
import "./commands";

type Method = "POST" | "GET" | "DELETE";

type UploadSongFormTest = {
  isValid: boolean;
  title?: string;
  author?: string;
  mp3FilePath?: string;
  imageFilePath?: string;
};

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      signIn(
        credentials: { email: string; password: string },
        redirect?: string
      ): void;
      uploadSongFormTest(data: UploadSongFormTest): void;
    }
  }
}

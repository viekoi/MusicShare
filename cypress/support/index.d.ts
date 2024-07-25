// /cypress/support/index.d.ts
/// <reference  types="cypress" />
import "./commands";

type Method = "POST" | "GET" | "DELETE";

declare global {
  namespace Cypress {
    interface Chainable {
      dataCy(value: string): Chainable<Element>;
      signIn(credentials: { email: string; password: string }): void;
    }
  }
}

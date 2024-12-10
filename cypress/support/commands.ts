/// <reference types="cypress" />
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
Cypress.Commands.add('loginAccount', (emailValid, passwordValid) => {
  cy.contains('h1', 'Log in').should('be.visible')

  cy.get('input[type="email"]').clear().type(emailValid)
  cy.get('input[type="password"]').clear().type(passwordValid)
  cy.get('button[type="submit"]').click()

  // Condition successfully
  cy.url().should('not.include', '/login')
  cy.get('.avatar-text', { timeout: 10000 }).should('be.visible')
})

Cypress.Commands.add('logoutAccount', () => {
  cy.get('.avatar-text').click()
  cy.contains('span', 'Log out').should('be.visible')
  cy.contains('span', 'Log out').click()
  cy.wait(2000)
})

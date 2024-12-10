/**
 * Steps:
 * 1. Navigate to the login page
 * 2. At Agent List page, Click send Test at any item in list
 * 3. Delete the newly created data
 * 4. Create the new Agent with Auto response - OFF
 * 5. Delete the newly created data
 */

describe('Send Test', () => {
  const emailValid = Cypress.env('emailValid')
  const passwordValid = Cypress.env('passwordValid')
  const apiBase = Cypress.env('apiBase')

  beforeEach(() => {
    cy.visit('/login')
    cy.loginAccount(emailValid, passwordValid)
  })

  it('Send Test feature', () => {
    
  })
})

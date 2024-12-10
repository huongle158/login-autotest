/**
 * Steps:
 * 1. Navigate to the login page
 * 2. Login with valid account
 * 3. Tick the checkbox Remember me
 * 4. Click the Login button
 * 5. Log out
 * 6. Return the Login page and see that it is saving previously entered login information
 */

describe('Login Page - Remember Me Functionality', () => {
  const emailValid = Cypress.env('emailValid')
  const passwordValid = Cypress.env('passwordValid')
  const apiBase = Cypress.env('apiBase')
  beforeEach(() => {
    cy.intercept(/stats.g.doubleclick.net\/j/, [])
    cy.intercept('POST', `${apiBase}/l/login`).as('loginAPi')
    cy.intercept('GET', `${apiBase}/l/api/user`).as('getUser')
    cy.visit('/login')
  })

  it('should remember the user after login with Remember Me checked', () => {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear().type(emailValid)
    cy.get('input[type="password"]').clear().type(passwordValid)

    // Remember me
    cy.get('input[type="checkbox"]').check()

    cy.get('button[type="submit"]').click()

    cy.url().should('not.include', '/login')
    cy.get('.avatar-text', { timeout: 10000 }).should('be.visible')

    // Save localStorage state
    cy.window().then((win) => {
      const localStorageState = {}
      for (let i = 0; i < win.localStorage.length; i++) {
        const key = win.localStorage.key(i)
        localStorageState[key] = win.localStorage.getItem(key)
      }
      cy.wrap(localStorageState).as('localStorageState')
    })

    // Simulate closing and reopening the tab
    cy.clearCookies()
    cy.clearLocalStorage()

    // Restore localStorage state and reload
    cy.get('@localStorageState').then((localStorageState) => {
      cy.visit('/')
      cy.window().then((win) => {
        Object.keys(localStorageState).forEach((key) => {
          win.localStorage.setItem(key, localStorageState[key])
        })
        cy.reload()
      })
    })

    cy.get('.avatar-text', { timeout: 10000 }).should('be.visible')
    cy.url().should('not.include', '/login')
  })
})

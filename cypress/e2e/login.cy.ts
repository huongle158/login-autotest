/**
 * Steps:
 * 1. Navigate to the login page
 * 2. Enter email in correct format
 * 3. Enter password
 * 4. Click the Login button
 * 5. Log out
 */

describe('Login Test', () => {
  const emailValid = Cypress.env('emailValid')
  const passwordValid = Cypress.env('passwordValid')
  const emailInvalid = Cypress.env('emailInvalid')
  const passwordInvalid = Cypress.env('passwordInvalid')
  const apiBase = Cypress.env('apiBase')

  beforeEach(() => {
    cy.intercept(/stats.g.doubleclick.net\/j/, [])
    cy.intercept('POST', `${apiBase}/l/login`).as('loginAPi')
    cy.intercept('GET', `${apiBase}/l/api/user`).as('getUser')
    cy.visit('/login')
  })

  it('should login successfully with valid credentials', function () {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear().type(emailValid)
    cy.get('input[type="password"]').clear().type(passwordValid)
    cy.get('button[type="submit"]').click()

    // Condition successfully
    cy.url().should('not.include', '/login')
    cy.get('.avatar-text', { timeout: 10000 }).should('be.visible')
    cy.logoutAccount()
  })

  it('should show validation errors for all empty fields', () => {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear()
    cy.get('input[type="password"]').clear()
    cy.get('button[type="submit"]').click()

    // Condition successfully
    cy.get('input[type="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it('should show validation errors for empty email fields', () => {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear()
    cy.get('input[type="password"]').type(passwordValid)
    cy.get('button[type="submit"]').click()

    // Condition successfully
    cy.get('input[type="email"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it('should show validation errors for empty password fields', () => {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear().type(emailValid)
    cy.get('input[type="password"]').clear()
    cy.get('button[type="submit"]').click()

    // Condition successfully
    cy.get('input[type="password"]')
      .invoke('prop', 'validationMessage')
      .should('equal', 'Please fill out this field.')
  })

  it('should show validation errors for wrong email format', () => {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear().type('inval')
    cy.get('img[alt="Office"]', { timeout: 10000 }).should('be.visible')

    cy.get('button[type="submit"]').click()
    cy.get('input[type="email"]')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please include an '@' in the email address")

    cy.wait(3000)

    cy.get('input[type="email"]').clear().type('inval@')
    cy.get('button[type="submit"]').click()
    cy.get('input[type="email"]')
      .invoke('prop', 'validationMessage')
      .should('contain', "Please enter a part following '@'")
  })

  it('should fail to login with invalid credentials or wrong password', function () {
    cy.contains('h1', 'Log in').should('be.visible')

    cy.get('input[type="email"]').clear().type(emailInvalid)
    cy.get('input[type="password"]').clear().type(passwordInvalid)
    cy.get('button[type="submit"]').click()

    cy.url().should('include', '/login')
    cy.contains('h6', 'These credentials do not match our records.').should(
      'be.visible'
    )
  })
 
  it('Show/ Hide Password Functionality works', function () {
    cy.contains('h1', 'Log in').should('be.visible')
    cy.get('input[type="password"]').clear().type(passwordInvalid)
     cy.get('Test is successful. Check Messages section.').click()
     cy.get('input[type="text"]').should('be.visible')
     cy.get('.absolute.inset-y-0.right-0.pr-3.flex.items-center').click()
     cy.get('input[type="password"]').should('be.visible')
  })




  // it("user can forgot and reset password", () => {
  //     // Open forgot page
  //     cy.contains("Forgot your password?").should("be.visible").click();
  //     cy.url().should("include", "/forgot");
  //     cy.contains("Reset Password").should("be.visible");
  //     cy.contains(
  //         "Type the email you used to sign up on Host Tools and we'll send you a password reset email."
  //     ).should("be.visible");

  //     // Validate email field in the forgot page
  //     // Blank email
  //     clickOnResetPassButton();
  //     cy.contains("Missing email.").should("be.visible");
  //     cy.findByTestId("username").parent().should("have.css", "border-color", "rgb(220, 38, 38)");
  //     // Invalid email
  //     clearAndTypeEmail(invalidEmail);
  //     cy.contains("Please enter a valid email.").should("be.visible");
  //     // Input valid email address
  //     clearAndTypeEmail(validEmail);
  //     cy.findByTestId("username")
  //         .parent()
  //         .should("not.have.css", "border-color", "rgb(220, 38, 38)");
  //     clickOnResetPassButton();
  //     cy.wait("@forgot", {timeout: 10_000});
  //     cy.contains(confirmResetMessage).should("be.visible");
  //     cy.contains("Back to Login").click();
  //     cy.url().should("include", "/login");
  // });

  afterEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
  })
})

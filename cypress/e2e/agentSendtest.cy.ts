describe('Create a new Agent', () => {
    const emailValid = Cypress.env('emailValid04')
    const passwordValid = Cypress.env('passwordValid04')
    const apiBase = Cypress.env('apiBase');
    const firstResponderName = "Agent";
    const lastwords = `${Date.now()}`;
    const responderName = fullword(firstResponderName, lastwords);
    const firstTriggerKeyword = "STG";
    const triggerKeyword = `STG${Date.now()}`;
    const statusSuccess = "Agent created successfully!";
    const statusDeleted = "Deleted Successfully";
    const statusSendtestsuccessful = "Test is successful. Check Messages section."
    const statusSendtest = "Please wait, while we generate test message for Agent"
    const firstName = 'Khanh'
    const lastName = 'Pham'
    const callFullName= fullword(firstName,lastName)
    
    function fullword(f, l) {
      return `${f} ${l}`;
    }
      function deleteAgent() {
        cy.get('button[aria-label="delete"]')
          .last()
          .should('be.visible')
          .click({ force: true })
        cy.contains('button', 'Yes').should('be.visible').click({ force: true })
        cy.get('div[role="alert"]').contains(statusDeleted).should('exist')
      }
  
    beforeEach(() => {
      cy.intercept(/stats.g.doubleclick.net\/j/, [])
      cy.intercept('POST', `${apiBase}/l/login`).as('loginAPi')
      cy.intercept('GET', `${apiBase}/l/api/user`).as('getUser')
      cy.visit('/login')
      //login
      cy.loginAccount(emailValid,passwordValid)
    })
  
    it('Create the new Agent with Auto response - ON and check ', () => {
      // Click the + Add Agent button
      cy.contains('a', '+ Add Agent').should('be.visible').click()
      //Fill full data on the fields
      cy.get('input[name="name"]').clear().type(responderName)
      cy.get('input[name="first_name"]').clear().type(firstName)
      cy.get('input[name="last_name"]').clear().type(lastName)
      cy.get('input[name="company"]').clear().type('google')
      cy.get('input[name="selected"]')
        .clear()
        .type(triggerKeyword)
        .type('{enter}')
      cy.get('input[name="company_url"]')
        .clear()
        .type('https://automationtestpro.com/')
      cy.get('textarea[name="services"]')
        .clear()
        .type('Automation Test Overview')
      cy.get('textarea[name="products"]')
        .clear()
        .type('Automation Test Context')
      cy.get('input[name="zoom_link"]').clear().type('https://us06web.zoom.us/')
      cy.get('input[name="calendly_link"]')
        .clear()
        .type('https://calendly.com/khanh-pham-hre8/')
      cy.get('input[name="auto_respond"]').click({ force: true })
      // Click the save button
      cy.contains('button', 'Save').should('be.visible').click({ force: true })
      // Verify the message is displayed correctly after creating a new Agent
      cy.get('div[role="alert"]').contains(statusSuccess).should('exist')
      cy.contains(triggerKeyword)
        .parents('tr')
        .within(() => {
          cy.contains('button', 'Send Test')
            .last()
            .should('be.visible')
            .click({ force: true })
        })
      cy.contains(statusSendtest).should('be.visible',{ timeout: 8000 })
      cy.contains(statusSendtestsuccessful).should('be.visible',{ timeout: 8000 })
      cy.contains('span', 'Messages (beta)').should('be.visible').click()
      cy.contains(triggerKeyword).click()
      cy.contains(callFullName).should('be.visible')
      cy.contains('span', 'Agents').should('be.visible').click()
      deleteAgent();
    });

      afterEach(() => {
        cy.logoutAccount()
        cy.clearCookies()
        cy.clearLocalStorage()
      })






});
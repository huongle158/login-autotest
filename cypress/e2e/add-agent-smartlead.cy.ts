/**
 * Steps:
 * 1. Navigate to the login page
 * 2. Create the new Agent Smartlead with Auto response - ON
 * 3. Delete the newly created data
 * 4. Create the new Agent Smartlead with Auto response - OFF
 * 5. Delete the newly created data
 */

describe('Create a new agent Smartlead', () => {
    const emailValid = Cypress.env('emailSmartleadValid');
    const passwordValid = Cypress.env('passwordSmartleadValid');
    const apiBase = Cypress.env('apiBase');
    const firstResponderName = "AgentSmartLead";
    const lastNameAutoOn = generateRandomId();
    const responderNameON = fullname(firstResponderName, lastNameAutoOn);
    const triggerKeywordON = `SML${Date.now()}`;
    const lastNameAutoOff = generateRandomId() + "OFF";
    const responderNameOFF = fullname(firstResponderName, lastNameAutoOff);
    const triggerKeywordOFF = "SML" + generateRandomId() + "OFF";
    const statusSuccess = "Agent created successfully!";
    const statusDeleted = "Deleted Successfully";
    // const btbConnectSmartLeadIsAble = cy.contains('Connect Smartlead');
    // const btbDisConnectSmartLeadIsAble = cy.contains('Disconnect Smartlead');
    
    function fullname(f, l) {
      return `${f}${l}`;
    }
    
    function generateRandomId() {
      let result = '';
      for (let i = 0; i < 5; i++) {
        result += Math.floor(Math.random() * 10).toString();
      }
      return result;
    }
  
    beforeEach(() => {
      cy.intercept(/stats.g.doubleclick.net\/j/, [])
      cy.intercept('POST', `${apiBase}/l/login`).as('loginAPi')
      cy.intercept('GET', `${apiBase}/l/api/user`).as('getUser')
      cy.visit('/login')
      //login
      cy.get('input[type="email"]').clear().type(emailValid)
      cy.get('input[type="password"]').clear().type(passwordValid)
      cy.get('button[type="submit"]').should('be.visible').click()
    })
  
    it('Create the new agent SmartLead with Auto response - ON', () => {
      // Click the + Add Agent button
      cy.contains('a', '+ Add Agent').should('be.visible').click();
      //Fill full data on the fields
      cy.get('input[name="name"]').clear().type(responderNameON);
      cy.get('input[name="first_name"]').clear().type("Khanh");
      cy.get('input[name="last_name"]').clear().type("Pham");
      cy.get('input[name="company"]').clear().type("Automation Test Pro");
      cy.get('select[name="timezone"]').select('(GMT+07:00) Bangkok, Hanoi, Jakarta');
      cy.get('select[name="office_hours_from"]').select('12:00 AM');
      cy.get('select[name="office_hours_to"]').select('11:00 PM');
      cy.get('input[name="exclude_weekends"]').check();
      cy.get('input[name="selected"]').clear().type(triggerKeywordON).type('{enter}');
      cy.get('input[name="company_url"]').clear().type("https://automationtestpro.com/");
      cy.get('textarea[name="services"]').clear().type("Automation Test Overview");
      cy.get('textarea[name="products"]').clear().type("Automation Test Context");
      cy.get('input[name="zoom_link"]').clear().type("https://us06web.zoom.us/");
      cy.get('input[name="calendly_link"]').clear().type("https://calendly.com/khanh-pham-hre8/");
      cy.get('input[name="auto_respond"]').click({ force: true });
      // Click the save button
      cy.contains('button','Save').should('be.visible').click({ force: true });
      // Verify the message is displayed correctly after creating a new Agent
      cy.get('div[role="alert"]').contains(statusSuccess).should('exist');
      // Verify the newly created data
      cy.get('table').find('tbody > tr').last().find('td:nth-child(1)').scrollIntoView().should('have.text', responderNameON)
      cy.get('table').find('tbody > tr').last().find('td:nth-child(2)').scrollIntoView().should('have.text', triggerKeywordON)
      
      // Delete the newly created data
      // deleteAgent();
    })
  
    it('Create the new agent SmartLead with Auto response - OFF', () => {
      // Click the + Add Agent button
      cy.contains('a', '+ Add Agent').should('be.visible').click();
      //Fill full data on the fields
      cy.get('input[name="name"]').clear().type(responderNameOFF);
      cy.get('input[name="first_name"]').clear().type("Khanh");
      cy.get('input[name="last_name"]').clear().type("Pham");
      cy.get('input[name="company"]').clear().type("Automation Test Pro");
      cy.get('select[name="timezone"]').select('(GMT+07:00) Bangkok, Hanoi, Jakarta');
      cy.get('select[name="office_hours_from"]').select('12:00 AM');
      cy.get('select[name="office_hours_to"]').select('11:00 PM');
      cy.get('input[name="exclude_weekends"]').check();
      cy.get('input[name="selected"]').clear().type(triggerKeywordOFF).type('{enter}');
      cy.get('input[name="company_url"]').clear().type("https://automationtestpro.com/");
      cy.get('textarea[name="services"]').clear().type("Automation Test Overview");
      cy.get('textarea[name="products"]').clear().type("Automation Test Context");
      cy.get('input[name="zoom_link"]').clear().type("https://us06web.zoom.us/");
      cy.get('input[name="calendly_link"]').clear().type("https://calendly.com/khanh-pham-hre8/");
      // Click the save button
      cy.contains('button','Save').should('be.visible').click({ force: true });
      // Verify the message is displayed correctly after creating a new Agent
      cy.get('div[role="alert"]').contains(statusSuccess).should('exist');
      // Verify the newly created data
      cy.get('table').find('tbody > tr').last().find('td:nth-child(1)').scrollIntoView().should('have.text', responderNameOFF)
      cy.get('table').find('tbody > tr').last().find('td:nth-child(2)').scrollIntoView().should('have.text', triggerKeywordOFF)
      
      // Delete the newly created data
      // deleteAgent();
    })

    function deleteAgent(){
      cy.get('button[aria-label="delete"]').last().should('be.visible').click({ force: true });
      cy.contains('button','Yes').should('be.visible').click({ force: true });
      cy.get('div[role="alert"]').contains(statusDeleted).should('exist');
    }
  
  })
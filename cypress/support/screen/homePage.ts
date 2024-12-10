// Cypress.Commands.add('addNewPanel', (panelName: string, panelType: string) => {
//   cy.contains('Add Panel').click()
//   if (panelName) {
//     cy.get('#basic_panelName').clear().type(panelName)
//   }

//   // select panel type
//   if (panelType) {
//     cy.get('.ant-select-selector')
//       .click()
//       .then(() => {
//         cy.get("[class='ant-select-item-option-content']")
//           .contains(panelType)
//           .click()
//       })

//     // Pick color
//     if (
//       panelType === 'Create New Parent Group' ||
//       panelType === 'Create New Panel'
//     ) {
//       const listColor = ".add-panel-color-picker-container [tabindex='0']"
//       cy.get(listColor)
//         .its('length')
//         .then((elementCount) => {
//           let selected = Cypress._.random(elementCount - 1)
//           cy.get(listColor).eq(selected).click()
//         })
//     }
//   }

//   //Submit
//   cy.contains('Add Panel').click()
// })

// Cypress.Commands.add('deletePanel', (panelName: string) => {
//   // Delete panel
//   cy.contains(panelName).rightclick()
//   cy.get("[class='ant-dropdown-menu-title-content']")
//     .contains('Permanently Delete')
//     .click({ force: true })
//   cy.contains('button', 'Permanently Delete').click()
//   cy.contains('Panel record deleted successfully.', { timeout: 25_000 }).should(
//     'be.visible'
//   )
// })

// Cypress.Commands.add('clickOnPanel', (panelId: string) => {
//   cy.get(`[data-rbd-draggable-id='${panelId}']`)
//     .find("[class='sidebar-marker']")
//     .click()
// })

// Cypress.Commands.add('waitToGetToken', () => {
//   cy.wait('@authenticate-updated')
//     .its('response')
//     .then((value) => {
//       cy.wrap(value?.body.data.token).as('token')
//     })
// })

// Cypress.Commands.add(
//   'openPanelSettings',
//   (panelName: string, sourceView: string) => {
//     cy.contains(panelName).click()
//     cy.get(
//       "[class='ant-dropdown-trigger ant-dropdown-button-email-list actions-icon']"
//     ).click()
//     cy.contains('Panel Settings').click()
//     cy.contains(sourceView).click()
//     cy.contains('Success', { timeout: 15_000 }).should('be.visible')
//   }
// )

// Cypress.Commands.add('openGlobalSettingsOutlook', () => {
//   cy.contains('Global Settings').click()
//   cy.get('.PanelName')
//     .contains('Global Settings', { timeout: 10_000 })
//     .should('be.visible')
//   cy.contains('O365 Email').click()
//   cy.get('.email-0365-container', { timeout: 15_000 }).should('be.visible')
// })

// Cypress.Commands.add('resetPanelToAllGlobalSettings', () => {
//   cy.contains('button', 'Reset to All Global Settings').click()
//   cy.contains('Are you sure you want to Reset All to Default?').should(
//     'be.visible'
//   )
//   cy.get("[class*='reset-modal-button reset']").click()
// })

// Cypress.Commands.add("resetDefaultGlobalSettings", () => {
//   cy.contains("button", "Reset All to Default").click();
//   cy.contains("Are you sure you want to Reset All to Default?").should("be.visible");
//   cy.get("[class*='reset-modal-button reset']").click();
// });

// Cypress.Commands.add("waitForLoadingIconNotVisible", () => {
//   cy.get('.ant-spin-dot-spin', {timeout: 30_000}).should("not.exist");
// });

// Cypress.Commands.add("saveFilter", () => {
//   cy.contains('Save Filter').click()
//   cy.waitForLoadingIconNotVisible()
// });

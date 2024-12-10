// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    loginAccount(email: string, password: string): Chainable<any>
    addNewPanel(panelName: string, panelType: string): Chainable<any>
    addDataSource(
      dataSourceType: string,
      dataSourceEmail: string
    ): Chainable<any>
    deletePanel(panelName: string): Chainable<any>
    clickOnPanel(panelId: string): Chainable<any>
    isVisibleElement(element: string): Chainable<any>
    waitToGetToken(): Chainable<any>
    fillOutFilterOutlookAndSubmit(params: {
      domains?: string[]
      subject?: string
      hasTheWords?: string
      date?: string
    }): Chainable<any>
    openPanelSettings(panelName: string, sourceView: string): Chainable<any>
    resetPanelToAllGlobalSettings(): Chainable<any>
    openGlobalSettingsOutlook(): Chainable<any>
    resetDefaultGlobalSettings(): Chainable<any>
    dragImplement(
      target: string,
      options?: Partial<TypeOptions>
    ): Chainable<Element> // add to test
    verifySubjectExplainErrorDisplayed(
      invalidValue: string,
      errorText: string
    ): Chainable<any>
    verifyHasTheWordsExplainErrorDisplayed(
      invalidValue: string,
      errorText: string
    ): Chainable<any>
    getCypressDates(): Chainable<any>
    waitForElementToNotExist(selector: string): Chainable<any>
    waitForLoadingIconNotVisible(): Chainable<any>
    saveFilter(): Chainable<any>
    logoutAccount(): Chainable<any>
  }
}


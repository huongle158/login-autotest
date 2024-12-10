Cypress.Commands.add("isVisibleElement", (element: string) => {
    return cy.get("body").then($body => {
        // synchronously query from body
        // to find element
        if ($body.find(element).length) {
            // input was found, do something else here
            // cy.task('log', infoMessage + true)
            return true;
        }

        // else
        // cy.task('log', infoMessage + false)
        return false;
    });
});

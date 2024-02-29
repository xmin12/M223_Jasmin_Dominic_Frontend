it("1. Admin can Sing-up and update User", () => {
    const userInfo = {
        firstName: "James",
        lastName: "Bond",
        email: "admin@example.com",
        password: "1234",
    };
    // Login
    cy.visit("http://localhost:3000/");
    cy.get(`[data-cy="Login-Email"]`).click().type(userInfo.email);
    cy.get(`[data-cy="Login-Password"]`).click().type(userInfo.password);
    cy.get(`[data-cy="Login-Save-Button"]`).click();
    //Admin creats a new list
    cy.get(`[data-cy="lists-button"]`).click();
    cy.get(`[data-cy="List-create-button"]`).click();
    cy.get(`[data-cy="List-title-field"]`).click().type("testss");
    cy.get(`[data-cy="List-text-field"]`).click().type("testss");
    cy.get(`[data-cy="List-number-field"]`).click().type("1");
    cy.get(`[data-cy="List-save-button"]`).click();
    //Admin updates a List
    cy.get(':nth-child(2) > .MuiCardActions-root > [data-cy="List-delete-button"]').first();


});
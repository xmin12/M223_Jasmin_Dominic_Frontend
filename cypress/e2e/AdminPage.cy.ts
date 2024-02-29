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
    //visit AdminPage and creat new user.
    cy.get(`[data-cy="admin-button"]`).click();
    cy.get(`[data-cy="Admin-add-button"]`).click();
     cy.get(`[data-cy="Userform-firstname-field"]`).click().type("Sandra");
     cy.get(`[data-cy="Userform-lastname-field"]`).click().type("Bauern");
     cy.get(`[data-cy="Userform-email-field"]`).click().type("tyara.baurn@gmail.com");
     cy.get(`[data-cy="Userform-save-button"]`).click();
     cy.wait(800)
    //Update User.
    cy.get(':nth-child(6) > .MuiPaper-root > .MuiCardContent-root > .MuiCardActions-root > [data-cy="Admin-edit-button"]').click();
    cy.get('#firstName').click().clear().type("Sonja");
    cy.get('#firstName').click().clear().type("Tanja");
    cy.get('#email').click().clear().type("solos.baurn@gmail.com")
    cy.get('[data-cy="Userform-save-button"]').click();
    //Log-out
    cy.get(`[data-cy="Log-out-button"]`).click();
});

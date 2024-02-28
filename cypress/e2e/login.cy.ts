it("1. Admin can Sing-up and visit all pages and Log-out", () => {
    const userInfo = {
        firstName: "James",
        lastName: "Bond",
        email: "admin@example.com",
        password: "1234",
    };

    // Login
    cy.visit("http://localhost:3000/login");
    cy.get(`[data-cy="Login-Email"]`).click().type(userInfo.email);
    cy.get(`[data-cy="Login-Password"]`).click().type(userInfo.password);
    cy.get(`[data-cy="Login-Save-Button"]`).click();

    //visit ListPage
    cy.get(`[data-cy="lists-button"]`).click();
    //visit AdminPage
    cy.get(`[data-cy="admin-button"]`).click();
    //Log-out
    cy.wait(500)
    cy.get(`[data-cy="Log-out-button"]`).click();



});




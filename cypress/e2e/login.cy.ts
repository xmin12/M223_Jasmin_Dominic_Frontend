import auth from "../fixtures/auth.json";

const { password } = auth.admin;
const superAdminMail = auth.admin.email;


it("Test Case 1: Admin can login and visit all pages", () => {
    cy.login(superAdminMail, password);
    cy.visit("/login");
    cy.get(`[data-cy="Login-Email"]`).type('admin@')
});
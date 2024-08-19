// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("assertLocation", (path) => {
  cy.location("pathname").should("contain", path);
});
Cypress.Commands.add("completeOrder", () => {
  // Complete the order, filling form

  // login form /email
  cy.get('[data-role="email-with-possible-login"]')
    .find("input#customer-email")
    .as("email-input");
  cy.get("@email-input").type("test@emailas.com");
  // assert that email is proper by checking if message is displayed
  cy.contains(/You can create an account after checkout/i);

  // shipping details form
  // Fill in checkout details
  cy.get("#co-shipping-form").within(() => {
    cy.get('input[name="firstname"]').type("Test").should("have.value", "Test");
    cy.get('input[name="lastname"]').type("Test").should("have.value", "Test");
    cy.get('input[name="company"]').type("Test").should("have.value", "Test");
    cy.get('input[name="city"]').type("Test").should("have.value", "Test");
    cy.get('input[name="street[0]"]').type("Test").should("have.value", "Test");
    cy.get('input[name="street[1]"]').type("Test").should("have.value", "Test");
    cy.get('input[name="street[2]"]').type("Test").should("have.value", "Test");
    cy.get('select[name="region_id"]').select("1").should("have.value", "1");
    cy.get('input[name="postcode"]')
      .type("12345")
      .should("have.value", "12345");
    cy.get('input[name="telephone"]')
      .type("+3706470000")
      .should("have.value", "+3706470000");
  });

  // Select shipping method and proceed to payment
  cy.get("#co-shipping-method-form").within(() => {
    cy.get('input[value="flatrate_flatrate"]').check();
  });

  cy.get('[data-role="opc-continue"]').click();
  cy.location("hash").should("equal", "#payment");

  // place order button
  cy.get(
    "#checkout-payment-method-load > div > div > div.payment-method._active > div.payment-method-content > div.actions-toolbar > div > button"
  ).click();
  // assert that redirect to success page
  cy.assertLocation("/checkout/onepage/success/");
  cy.contains(/Thank you for your purchase!/i);
});

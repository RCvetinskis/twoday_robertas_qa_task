export function assertCounterNumber(numToBe) {
  cy.get(".counter-number").should("have.text", numToBe);
}
export function addToCart(product) {
  cy.wrap(product)
    .find(".swatch-attribute.color .swatch-option")

    .first()
    .wait(500)
    .click({ force: true });
  // Select the size (e.g., first available size option)
  cy.wrap(product)
    .find(".swatch-attribute.size .swatch-option")
    .first()
    .wait(500)
    .click({ force: true });

  // Add the product to the cart
  cy.wrap(product)
    .trigger("mouseover")
    .find('button[title="Add to Cart"]')
    .should("be.visible")
    .click({ force: true });
}

import { addToCart, assertCounterNumber } from "../../utils/helpers";

describe("Scenario Two", () => {
  beforeEach(() => {
    // Intercept all XHR and fetch requests and suppress logs
    cy.intercept("*", { log: false });
    // save localstorage
    cy.getAllLocalStorage();
  });

  it("Using navigation menu, find women pants section.", () => {
    cy.visit("/");

    // hover navigation "women" nav item
    cy.get("#ui-id-4").trigger("mouseover");
    // when popover opens hover "Bottoms"
    cy.get("#ui-id-10").trigger("mouseover");

    // navigate to pants
    cy.get("#ui-id-15").click();

    cy.assertLocation("/women/bottoms-women/pants-women.html");
  });

  it("Filter Products by Price Range, Add to Cart, Remove Item, and Proceed to Checkout", () => {
    cy.visit("/women/bottoms-women/pants-women.html");

    // Open the "Price" filter section
    cy.get("#narrow-by-list").contains("Price").wait(1000).click();

    // Click on the price filter "$30.00 - $39.99"
    cy.get('.filter-options-content[role="tabpanel"]')
      .contains("$30.00 - $39.99")
      .click();

    // Verify that the filter is applied by checking the URL
    cy.url().should("include", "price=30-40");

    cy.get(".products.wrapper .product-item").then(($products) => {
      // Create an array to hold product info with price
      const productsArray = [];

      // Iterate over each product to extract its price and store it in an array
      $products.each((index, product) => {
        const priceText = Cypress.$(product)
          .find(".price-wrapper .price")
          .text()
          .trim();
        const price = parseFloat(priceText.replace("$", ""));

        productsArray.push({ price, element: product });
      });

      // Sort the products by price in ascending order
      productsArray.sort((a, b) => a.price - b.price);

      // Add the product with the lowest price
      const cheapestProduct = productsArray[0].element;
      addToCart(cheapestProduct);
      assertCounterNumber("1");
      // Add other 2 products to the cart
      const secondProduct = productsArray[1].element;
      addToCart(secondProduct);
      assertCounterNumber("2");
      const thirdProduct = productsArray[2].element;
      addToCart(thirdProduct);
      assertCounterNumber("3");

      // open shoping cart popover
      cy.get('div[data-block="minicart"]').click();
      // remove first item
      cy.get('a[title="Remove item"]').first().click();
      // assert confirmation modal opened
      cy.get(".modal-inner-wrap").should("be.visible");
      // click ok to confirm deletion of item
      cy.get(".action-accept").click();
      assertCounterNumber("2");
      // proceed to checkout
      cy.get("#top-cart-btn-checkout").click();

      cy.assertLocation("/checkout");

      cy.completeOrder();
    });
  });
});

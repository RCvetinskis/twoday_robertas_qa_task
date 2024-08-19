describe("Scenario One", () => {
  beforeEach(() => {
    // Intercept all XHR and fetch requests and suppress logs
    cy.intercept("*", { log: false });
    // save localstorage
    cy.getAllLocalStorage();
  });
  it("Using navigation menu, find mens Hoodies & Sweatshirts section", () => {
    cy.visit("/");

    // hover navigation "men" nav item
    cy.get("#ui-id-5").trigger("mouseover");
    // when popover opens hover "tops"
    cy.get("#ui-id-17").trigger("mouseover");

    // navigate to hoodies and sweatshirts
    cy.get("#ui-id-20").click();
    cy.assertLocation("/men/tops-men/hoodies-and-sweatshirts-men.html");
  });

  it("Check/Assert that the displayed number of jackets matches the selected number of jackets displayed per page", () => {
    cy.visit("/men/tops-men/hoodies-and-sweatshirts-men.html");
    let selectedValue;
    // choose how many products to show per page
    cy.get("#limiter")
      .select("12", { force: true })
      .should("have.value", "12")
      .then(($select) => {
        // Get the selected value from the dropdown
        selectedValue = $select.val();
      });

    // assert products displayed in page
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol"
    ).within(() => {
      cy.get("li").should("have.length", parseInt(selectedValue, 10));
    });
  });

  it("Select “Frankie Sweatshirt” and open its details.", () => {
    cy.visit("/men/tops-men/hoodies-and-sweatshirts-men.html");
    // finds frankie sweashirt and clicks to navigate
    cy.get(
      "#maincontent > div.columns > div.column.main > div.products.wrapper.grid.products-grid > ol"
    ).within(() => {
      cy.contains("li", "Frankie Sweatshirt").click();
    });

    cy.assertLocation("/frankie-sweatshirt.html");
  });

  it("Select options, add to cart, verify cart, and complete the order", () => {
    cy.visit("/frankie-sweatshirt.html");
    // Select the size "M"
    cy.get('.swatch-attribute-options .swatch-option[option-label="M"]')
      .wait(500)
      .click();
    // Assert selected size
    cy.get(".swatch-attribute-selected-option").should("have.text", "M");

    // Select the color 'Green'
    cy.get('.swatch-attribute-options .swatch-option[option-label="Green"]')
      .wait(500)
      .click();
    // Assert Selected Color
    cy.get(
      '.swatch-attribute-options .swatch-option[option-label="Green"]'
    ).should("have.attr", "aria-checked", "true");

    // Select Quantity and assert
    cy.get("#qty").clear().type("2").should("have.value", "2");

    // Press add to cart btn
    cy.get("#product-addtocart-button").click();
    // assert if text value is 2
    cy.get(
      "body > div.page-wrapper > header > div.header.content > div.minicart-wrapper > a > span.counter.qty"
    ).within(() => {
      cy.get(".counter-number").should("have.text", "2");
    });

    // open  minicart modal
    cy.get("div.minicart-wrapper").click();
    // assert if product is correct
    cy.get("strong.product-item-name").should(
      "contain.text",
      "Frankie  Sweatshirt"
    );

    // proceed checkout
    cy.get("#top-cart-btn-checkout").click();

    cy.assertLocation("/checkout");

    //  custom cy can be found in support/commands.js file
    cy.completeOrder();
  });
});

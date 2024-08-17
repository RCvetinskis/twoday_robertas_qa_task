describe("Scenario One", () => {
  beforeEach(() => {
    // Intercept all XHR and fetch requests and suppress logs
    cy.intercept("*", { log: false });
  });
  it("Using navigation menu, find mens Hoodies & Sweatshirts section", () => {
    cy.visit("/");

    // hover navigation "men" nav item
    cy.get("#ui-id-5").trigger("mouseover");
    // when popover opens hover "tops"
    cy.get(
      "#ui-id-2 > li.level0.nav-3.category-item.level-top.parent.ui-menu-item > ul"
    ).trigger("mouseover");
    // navigate to hoodies and sweatshirts
    cy.get("#ui-id-20").click();
    // assert pathname
    cy.location("pathname").should(
      "equal",
      "/men/tops-men/hoodies-and-sweatshirts-men.html"
    );
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

    // check how many products is displayed in page
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
    // asserts  location
    cy.location("pathname").should("equal", "/frankie-sweatshirt.html");
  });

  it("Select options, add to cart, verify cart, and complete the order", () => {
    cy.visit("/frankie-sweatshirt.html");
    // Select the size "M"
    cy.get(
      '.swatch-attribute-options .swatch-option[option-label="M"]'
    ).click();
    // Assert selected size
    cy.get(".swatch-attribute-selected-option").should("have.text", "M");

    // Select the color 'Green'
    cy.get(
      '.swatch-attribute-options .swatch-option[option-label="Green"]'
    ).click();
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
    // save localstorage and proceed to checkout
    cy.getAllLocalStorage();
    cy.get("#top-cart-btn-checkout").click();

    // assert  location
    cy.location("pathname").should("contain", "/checkout");

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
      cy.get('input[name="firstname"]')
        .type("Test")
        .should("have.value", "Test");
      cy.get('input[name="lastname"]')
        .type("Test")
        .should("have.value", "Test");
      cy.get('input[name="company"]').type("Test").should("have.value", "Test");
      cy.get('input[name="city"]').type("Test").should("have.value", "Test");
      cy.get('input[name="street[0]"]')
        .type("Test")
        .should("have.value", "Test");
      cy.get('input[name="street[1]"]')
        .type("Test")
        .should("have.value", "Test");
      cy.get('input[name="street[2]"]')
        .type("Test")
        .should("have.value", "Test");
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
    cy.location("pathname").should("contain", "/checkout/onepage/success/");
    cy.contains(/Thank you for your purchase!/i);
  });
});

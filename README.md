# twoday_robertas_qa_task

Cypress E2E Tests Documentation

### Overview

This test suite automates the process of browsing and purchasing a product in an online store. The test suite covers the following flow:
Navigate to the "Men's Hoodies & Sweatshirts" section.
Verify that the number of displayed jackets matches the selected number per page.
Select "Frankie Sweatshirt" and open its details.
Select size, color, and quantity.
Add the product to the cart and verify the cart icon is updated.
Open the cart and verify the correct product is added.
Proceed to checkout.
Complete the order process.

### Structure

cypress/
├── e2e/
│   ├── scenario_one.cy.js
├── fixtures/
├── support/
│   ├── commands.js
│   ├── e2e.js
├── cypress.json
e2e/scenario_one.cy.js: Contains the test cases for the scenario described above.
fixtures/: Contains any mock data files or JSON objects required for the tests.
support/commands.js: Custom commands for Cypress to extend its functionality.
support/e2e.js: Global configurations and hooks. 5. In-Code Documentation
Each test case in scenario_one.cy.js is well-commented to explain its purpose and the actions performed.

### Example:
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

### Prerequisites

- Node.js (v14 or above)
- npm (v6 or above) or Yarn (v1.x or above)
- A running instance of the Magento 2 storefront

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RCvetinskis/twoday_robertas_qa_task
   cd your-repo
   Install dependencies:
   bash
   npm install
   or
   bash
   yarn install
   Configuration
   ```

### Running the Tests

Using Cypress Test Runner
bash
npx cypress open
or

bash
yarn cypress:open
Select the spec file scenario_one.cy.js to run the tests.

### Running in Headless Mode

bash
npx cypress run
or

bash
yarn cypress:run
This will execute all tests and provide a summary of results in the terminal.

# twoday_robertas_qa_task

## Cypress E2E Tests Documentation

## Overview

This test suite automates the process of browsing and purchasing a product in an online store. The test suite covers the following flow:
### ➢ Scenario one:
* Using navigation menu, find mens Hoodies & Sweatshirts section. 
* Check/Assert that the displayed number of jackets matches the selected 
number of jackets displayed per page.
* Select “Frankie Sweatshirt” and open its details.
* Select size, colour and quantity.
* Add product to cart and check that cart icon is updated with product quantity.
* Open cart and check if product match the one You added to the cart.
* Proceed to checkout
* Complete the order.
### ➢ Scenario two:
* Using navigation menu, find women pants section.
* Filter section to show the cheapest products available.
* Select the cheapest pants and add them to the cart.
* Add 2 more products to the cart. Check that cart icon is updated with each 
product.
* Remove product from the cart.
* Proceed to checkout.
* Add product to the cart from suggested products.
* Complete the order.

## Structure

cypress/
├── e2e/
│   ├── scenario_one.cy.js
│   ├── scenario_two.cy.js
├── fixtures/
├── support/
│   ├── commands.js
│   ├── e2e.js
├── cypress.json
├── utils/
│   ├── helpers.js
e2e/scenario_one.cy.js: Contains the test cases for the scenario described above.
fixtures/: Contains any mock data files or JSON objects required for the tests.
support/commands.js: Custom commands for Cypress to extend its functionality.
support/e2e.js: Global configurations and hooks. 5. In-Code Documentation
Each test case in scenario_one.cy.js is well-commented to explain its purpose and the actions performed.

## Example:
    cy.visit("/");
    // hover navigation "men" nav item
    cy.get("#ui-id-5").trigger("mouseover");
    // when popover opens hover "tops"
    cy.get("#ui-id-17").trigger("mouseover");
    cy.get("#ui-id-20").click();
    cy.assertLocation("/men/tops-men/hoodies-and-sweatshirts-men.html");
    
## Prerequisites

- Node.js (v14 or above)
- npm (v6 or above) or Yarn (v1.x or above)
- A running instance of the Magento 2 storefront

## Installation

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

## Running the Tests

Using Cypress Test Runner
bash
npx cypress open
or

bash
yarn cypress:open

1. Select E2E testing
2. Choose a browser
3. Within  E2E specs  select scenario_one or scenario_two

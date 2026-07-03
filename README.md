# QA Automation Take-Home Assessment

This repository contains a focused UI and API automation suite built with Playwright and TypeScript.
The project covers a basic e-commerce flow using SauceDemo and CRUD API validation using Restful-Booker. The goal is to demonstrate practical test automation, meaningful assertions, negative testing, and a balanced use of UI and API tests.

## Tools Used

- Playwright
- TypeScript
- SauceDemo for UI testing
- Restful-Booker for API testing
- dotenv for environment variable management

I chose Playwright because it supports both browser automation and API testing in one framework. This keeps the project consistent while allowing UI and API tests to be written and maintained in the same repository.
TypeScript was used to make the code easier to read, structure, and maintain.

## Project Structure

```text
.
├── lib/
│   └── fixtures/
│       └── saucedemo.fixture.ts
├── pages/
│   ├── login.pages.ts
│   ├── addToCart.page.ts
│   └── checkout.page.ts
├── test-data/
│   └── booking.data.ts
├── tests/
│   ├── api/
│   │   └── restful-booker.spec.ts
│   └── ui/
│       ├── login.spec.ts
│       ├── addToCart.spec.ts
│       └── checkout.spec.ts
├── .env.example
├── .gitignore
├── playwright.config.ts
├── package.json
└── README.md
```

## Installation and Setup

Clone the repository:

```bash
git clone <your-repository-url>
cd <your-repository-folder>
```

Install the dependencies:

```bash
npm install
```

Install the Playwright browsers:

```bash
npx playwright install
```

## Environment Variables

Create a `.env` file in the root folder of the project.

Use the following format:

```env
SAUCEDEMO_BASE_URL=https://www.saucedemo.com
RESTFUL_BOOKER_BASE_URL=https://restful-booker.herokuapp.com
RESTFUL_BOOKER_USERNAME=admin
RESTFUL_BOOKER_PASSWORD=password123
```

The `.env` file should not be committed to GitHub. It is excluded through `.gitignore`.
An `.env.example` file can be included in the repository as a guide:

```env
SAUCEDEMO_BASE_URL=https://www.saucedemo.com
RESTFUL_BOOKER_BASE_URL=https://restful-booker.herokuapp.com
RESTFUL_BOOKER_USERNAME=your_username
RESTFUL_BOOKER_PASSWORD=your_password
```

## Running the Test Suite

Run all UI and API tests:

```bash
npx playwright test
```

Run only the UI tests:

```bash
npx playwright test tests/ui
```

Run only the API tests:

```bash
npx playwright test tests/api
```

Run the tests in headed mode:

```bash
npx playwright test --headed
```

Open the Playwright HTML report:

```bash
npx playwright show-report
```

## UI Test Coverage

The UI test suite uses SauceDemo and focuses on the main customer flow.

Covered scenarios include:

- Successful login using a valid account
- Validation for invalid username and password
- Validation for a locked-out user account
- Verification that the inventory page loads correctly
- Adding Sauce Labs Backpack and Sauce Labs Bike Light to the cart
- Verifying that the Add to Cart button changes to Remove
- Verifying that the cart badge reflects the selected item count
- Checkout form validation for required information
- Successful checkout flow

## API Test Coverage

The API test suite uses Restful-Booker and focuses on the main booking lifecycle.

Covered scenarios include:

- API availability check
- Create a booking
- Retrieve a newly created booking
- Create an authentication token
- Update a booking using a valid token
- Reject a booking update using an invalid token
- Delete a booking using a valid token
- Verify that a deleted booking can no longer be retrieved

The API tests are designed to be independent. Tests that need an existing booking create their own booking first instead of relying on a booking created by a previous test. This allows each API test to run individually and avoids shared test-data issues.

## UI and API Test Strategy

The UI layer was used for behavior that matters directly to the user. This includes login, product selection, cart updates, checkout validation, and completing an order.

The API layer was used for booking CRUD operations, authentication, status-code validation, response-payload validation, and authorization checks.

I did not move every scenario to the UI layer. Browser tests are useful for validating critical end-to-end user behavior, while API tests are faster and more stable for validating backend functionality, request payloads, response data, and negative authorization scenarios.

## What I Would Add With More Time

With more time, I would consider adding:

- Cart scenarios for removing products and continuing shopping.
- We can add page.evaluate for injecting JavaScript code to check for broken images, missing labels and etc.
- More API negative cases, such as invalid booking IDs or incomplete request payloads.
- A reusable API client or helper layer if more endpoint groups are added.
- Test tags or separate Playwright projects for easier UI and API execution.
- GitHub Actions or another CI pipeline for automated test execution.
- Additional test artifacts such as screenshots, videos, and traces for failed UI tests.
- Test-data factories to generate unique booking data for each test execution.

## AI Tooling Disclosure

-AI was used as a support tool during development. It was used to help review test coverage, discuss fixture design, clarify Playwright and TypeScript concepts, and improve the project documentation.

-All suggestions were reviewed before being applied. The final implementation was adjusted based on the actual behavior of SauceDemo and Restful-Booker, as well as local test execution.

-For example, I kept the UI suite focused on key user flows, used fixtures only for reusable setup conditions, and made the API CRUD tests independent so they can be run individually without depending on a booking created by another test.

-The final locators, assertions, environment configuration, test structure, and coverage decisions were reviewed and validated through local execution.

## Notes

This project was intentionally kept focused. The goal was to demonstrate clean structure, meaningful assertions, realistic negative scenarios, and a practical split between UI and API automation rather than building a large test suite.

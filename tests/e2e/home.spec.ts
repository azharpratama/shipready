import { expect, test } from "@playwright/test";

test.describe("Home Page", () => {
  test("should display the main heading", async ({ page }) => {
    // Navigate to the home page
    await page.goto("/");

    // Verify the page title
    await expect(page).toHaveTitle(/Ultimate Starter Kit/);

    // Verify the main heading exists
    const heading = page.locator("h1");
    await expect(heading).toHaveText(/Ultimate Starter Kit/);
  });
});

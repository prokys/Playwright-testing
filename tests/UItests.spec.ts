import {test, expect} from "@playwright/test";

test('check if page loads', async ({page}) => {
    await page.goto("localhost:8080/");
    
    await expect(page).toHaveTitle(/Petclinic/);
});

test('search for owner', async ({page}) => {
    await page.goto("localhost:8080/");
    await page.getByText('owners').click();
    await page.getByText('search').click();

    await page.getByTestId('lastName').fill("Davis");
    await page.getByText("Find Owner").click();

    await expect(page.getByRole('table')).toContainText('Betty Davis');

});
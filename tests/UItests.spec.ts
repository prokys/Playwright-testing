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

test('add new owner', async ({page}) => {
    await page.goto("localhost:8080/");
    await page.getByText('owners').click();
    await page.getByText('add new').first().click();

    await page.getByTestId('firstName').fill("test");
    await page.getByTestId('lastName').fill("subject");
    await page.getByTestId('address').fill("from");
    await page.getByTestId('city').fill("owners");
    await page.getByTestId('telephone').fill("123456789");
    await page.getByText("Add Owner").click();

    await expect(page.getByRole('table')).toContainText('test subject');

});
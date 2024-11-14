import {test, expect} from "@playwright/test";

const url = "localhost:8080/";
const firstName = "test";
const lastName = "subject";
const address = "from";
const city = "owners";
const telephone = "123456789";

const firstNameEdited = "why";
const lastNameEdited = "do";
const addressEdited = "you";
const cityEdited = "edit";
const telephoneEdited = "987654321";

test.beforeEach('load base url page', async ({page}) =>{
    await page.goto(url);
})

test('check if page loads', async ({page}) => {
    
    await expect(page).toHaveTitle(/Petclinic/);
});

test('search for owner', async ({page}) => {

    await page.getByText('owners').click();
    await page.getByText('search').click();

    await page.getByTestId('lastName').fill("Davis");
    await page.getByText("Find Owner").click();

    await expect(page.getByRole('table')).toContainText('Betty Davis');

});

test('add new owner', async ({page}) => {

    await page.getByText('owners').click();
    await page.getByText('add new').first().click();

    await page.getByTestId('firstName').fill(firstName);
    await page.getByTestId('lastName').fill(lastName);
    await page.getByTestId('address').fill(address);
    await page.getByTestId('city').fill(city);
    await page.getByTestId('telephone').fill(telephone);
    await page.getByText("Add Owner").click();

    await expect(page.getByRole('table')).toContainText(firstName+' '+lastName);

});

test('edit owner', async ({page}) => {

    await page.getByText('owners').click();
    await page.getByText('search').click();

    await page.getByTestId('lastName').fill(lastName);
    await page.getByText("Find Owner").click();

    await page.getByText("test subject").click();
    await page.getByText("Edit Owner").click();

    await page.getByTestId('firstName').fill(firstNameEdited);
    await page.getByTestId('lastName').fill(lastNameEdited);
    await page.getByTestId('address').fill(addressEdited);
    await page.getByTestId('city').fill(cityEdited);
    await page.getByTestId('telephone').fill(telephoneEdited);
    await page.getByText("Update Owner").click();

    await page.getByText('back').click();

    await expect(page.getByRole('table')).toContainText(firstNameEdited+' '+lastNameEdited);

})
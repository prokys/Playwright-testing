import {test, expect} from "@playwright/test";
import MainPage from "./pages/mainPage";
import OwnersSearchPage from "./pages/ownersSearchPage";
import OwnersAddNewPage from "./pages/ownersAddNewPage";

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

    const mainPage = new MainPage(page);
    mainPage.gotoUsersSearchPage();

    const ownersSearchPage = new OwnersSearchPage(page);
    ownersSearchPage.fillLastName(lastName);
    ownersSearchPage.clickFindOwnerButton();

    await expect(page.getByRole('table')).toContainText('Betty Davis');

});

test('add new owner', async ({page}) => {

    const mainPage = new MainPage(page);
    mainPage.gotoUsersAddNewPage();

    const ownersAddNewPage = new OwnersAddNewPage(page);
    ownersAddNewPage.fillOwnerInfo(firstName, lastName, address, city, telephone);
    ownersAddNewPage.clickAddOwnerButton();

    await expect(page.getByRole('table')).toContainText(firstName+' '+lastName);

});

test('edit owner', async ({page}) => {

    const mainPage = new MainPage(page);

    mainPage.gotoUsersSearchPage();

    const ownersSearchPage = new OwnersSearchPage(page);
    ownersSearchPage.fillLastName(lastName);
    ownersSearchPage.clickFindOwnerButton();

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
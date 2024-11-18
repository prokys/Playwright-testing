import {test, expect} from "@playwright/test";
import MainPage from "./pages/mainPage";
import OwnersSearchPage from "./pages/ownersSearchPage";
import OwnersAddNewPage from "./pages/ownersAddNewPage";
import OwnersEditPage from "./pages/ownersEditPage";
import OwnersInformationPage from "./pages/ownersInformationPage";

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
    await mainPage.gotoOwnersSearchPage();

    const ownersSearchPage = new OwnersSearchPage(page);
    await ownersSearchPage.fillLastName('Davis');
    await ownersSearchPage.clickFindOwnerButton();

    await expect(await page.getByRole('table')).toContainText('Betty Davis');

});

test('add new owner', async ({page}) => {

    const mainPage = new MainPage(page);
    await mainPage.gotoOwnersAddNewPage();

    const ownersAddNewPage = new OwnersAddNewPage(page);
    await ownersAddNewPage.fillOwnerInfo(firstName, lastName, address, city, telephone);
    await ownersAddNewPage.clickAddOwnerButton();

    await expect(await page.getByRole('table')).toContainText(firstName+' '+lastName);

});

test('edit owner', async ({page}) => {

    const mainPage = new MainPage(page);
    await mainPage.gotoOwnersSearchPage();

    const ownersSearchPage = new OwnersSearchPage(page);
    await ownersSearchPage.fillLastName(lastName);
    await ownersSearchPage.clickFindOwnerButton();
    await ownersSearchPage.gotoOwnersInformationPage(firstName+ ' '+lastName);

    const ownersInformationPage = new OwnersInformationPage(page);
    await ownersInformationPage.clickEditOwnerButton();

    const ownersEditPage = new OwnersEditPage(page);
    await ownersEditPage.fillOwnerInfo(firstNameEdited, lastNameEdited, addressEdited, cityEdited, telephoneEdited)
    await ownersEditPage.clickUpdateOwnerButton();

    await ownersInformationPage.clickBackButton();

    await expect(await page.getByRole('table')).toContainText(firstNameEdited+' '+lastNameEdited);

})
import { test } from "./fixtures/basePage";
import { expect, APIRequestContext, Response } from "@playwright/test";
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

let ownerID: number;

test.beforeEach('load base url page', async ({page}) =>{
    await page.goto(url);
})

test('check if page loads', async ({page}) => {
    
    await expect(page).toHaveTitle(/Petclinic/);
});


test.describe('create user before, delete after', () =>{

    test.beforeEach('load base url page', async ({request}) =>{
        const response = await request.post('http://localhost:9966/petclinic/api/owners', {
            data: {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                telephone: telephone
            }
        });
        const body = await response.json();
        ownerID = body.id;
    })

    test('search for owner', async ({mainPage, ownersSearchPage}) => {

        await mainPage.gotoOwnersSearchPage();
    
        await ownersSearchPage.fillLastName(lastName);
        await ownersSearchPage.clickFindOwnerButton();
    
        await ownersSearchPage.checkIfOwnerIsInTable(firstName+' '+lastName);
    
    });

    test('edit owner', async ({mainPage, ownersSearchPage, ownersInformationPage, ownersEditPage}) => {

        await mainPage.gotoOwnersSearchPage();
    
        await ownersSearchPage.fillLastName(lastName);
        await ownersSearchPage.clickFindOwnerButton();
        await ownersSearchPage.gotoOwnersInformationPage(firstName+ ' '+lastName);
    
        await ownersInformationPage.clickEditOwnerButton();
    
        await ownersEditPage.fillOwnerInfo(firstNameEdited, lastNameEdited, addressEdited, cityEdited, telephoneEdited)
        await ownersEditPage.clickUpdateOwnerButton();
    
        await ownersInformationPage.clickBackButton();
    
        await ownersSearchPage.checkIfOwnerIsInTable(firstNameEdited+' '+lastNameEdited)
    
    })

    test.afterEach('Delte created owner', async ({ request }) => {
        const response = await request.delete('http://localhost:9966/petclinic/api/owners/'+ownerID);
        console.log('Owner with ID: '+ownerID+' deleted');
    })
})

test.describe('Delete after', () => {
    
    test('add new owner', async ({page, mainPage, ownersAddNewPage, ownersSearchPage}) => {

        page.on('response', async (response) => {
            if (response.request().method() === 'POST'){
                const body = await response.json();
                ownerID = body.id;
            }
        })

        await mainPage.gotoOwnersAddNewPage();
    
        await ownersAddNewPage.fillOwnerInfo(firstName, lastName, address, city, telephone);
        await ownersAddNewPage.clickAddOwnerButton();
    
        await ownersSearchPage.checkIfOwnerIsInTable(firstName+' '+lastName)
    
    });

    test.afterEach('Delete created owner', async ({request}) => {
        const response = await request.delete('http://localhost:9966/petclinic/api/owners/'+ownerID);
        console.log('Owner with ID: '+ownerID+' deleted');
    });

})



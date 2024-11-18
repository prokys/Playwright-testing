import { Page } from "@playwright/test";

export default class MainPage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    ownersDropdown = () => this.page.getByText('Owners');
    ownersSearchButton = () => this.page.getByText('Search');
    ownersAddNewButton = () => this.page.getByText('Add new').first();

    public async gotoOwnersSearchPage(){
        await this.ownersDropdown().click();
        await this.ownersSearchButton().click();
    }

    public async gotoOwnersAddNewPage(){
        await this.ownersDropdown().click();
        await this.ownersAddNewButton().click();
    }

}
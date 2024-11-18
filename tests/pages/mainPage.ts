import { Page } from "@playwright/test";

export default class MainPage {
    page: Page;

    constructor(page: Page){
        this.page = page;
    }

    usersDropdown = () => this.page.getByText('Owners');
    usersSearchButton = () => this.page.getByText('Search');
    usersAddNewButton = () => this.page.getByText('Add new').first();

    public async gotoUsersSearchPage(){
        await this.usersDropdown().click();
        await this.usersSearchButton().click();
    }

    public async gotoUsersAddNewPage(){
        await this.usersDropdown().click();
        await this.usersAddNewButton().click();
    }

}
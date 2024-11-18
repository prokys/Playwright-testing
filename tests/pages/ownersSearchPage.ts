import { Page } from "@playwright/test";
import MainPage from "./mainPage";

export default class OwnersSearchPage extends MainPage {
    page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    lastNameInput = () => this.page.getByTestId('lastName');
    findOwnerButton = () => this.page.getByText('Find Owner');
    resultsTable = () => this.page.getByRole('table');


    public async fillLastName(lastName: string){
        await this.lastNameInput().fill(lastName);
    }

    public async clickFindOwnerButton(){
        await this.findOwnerButton().click();
    }
}
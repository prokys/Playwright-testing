import { Page } from "@playwright/test";
import MainPage from "./mainPage";

export default class OwnersInformationPage extends MainPage {
    page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    editOwnerButton = () => this.page.getByText("Edit Owner")
    backButton = () => this.page.getByText('Back');

    public async clickEditOwnerButton(){
        await this.editOwnerButton().click();
    }

    public async clickBackButton(){
        await this.backButton().click();
    }
}
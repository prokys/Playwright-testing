import { Page } from "@playwright/test";
import MainPage from "./mainPage";

export default class OwnersAddNewPage extends MainPage {
    page: Page;

    constructor(page: Page){
        super(page);
        this.page = page;
    }

    firstNameInput = () => this.page.getByTestId('firstName');
    lastNameInput = () => this.page.getByTestId('lastName');
    addressInput = () => this.page.getByTestId('address');
    cityInput = () => this.page.getByTestId('city');
    telephoneInput = () => this.page.getByTestId('telephone');

    addOwnerButton = () => this.page.getByText('Add Owner');

    public async fillOwnerInfo(firstName: string, lastName: string, address: string, city: string, telephone: string){
        await this.firstNameInput().fill(firstName);
        await this.lastNameInput().fill(lastName);
        await this.addressInput().fill(address);
        await this.cityInput().fill(city);
        await this.telephoneInput().fill(telephone);
    }

    public async clickAddOwnerButton(){
        await this.addOwnerButton().click();
    }
}
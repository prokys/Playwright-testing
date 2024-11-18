import {test as base} from "@playwright/test";
import MainPage from "../pages/mainPage";
import OwnersAddNewPage from "../pages/ownersAddNewPage";
import OwnersEditPage from "../pages/ownersEditPage";
import OwnersInformationPage from "../pages/ownersInformationPage";
import OwnersSearchPage from "../pages/ownersSearchPage";

export const test = base.extend<{mainPage: MainPage, ownersAddNewPage:OwnersAddNewPage, ownersEditPage: OwnersEditPage, ownersInformationPage: OwnersInformationPage, ownersSearchPage: OwnersSearchPage}>({
    mainPage: async ({page}, use) => {
        await use(new MainPage(page));
    },
    ownersAddNewPage: async ({page}, use) => {
        await use(new OwnersAddNewPage(page));
    },
    ownersEditPage: async ({page}, use) => {
        await use(new OwnersEditPage(page));
    },
    ownersInformationPage: async ({page}, use) => {
        await use(new OwnersInformationPage(page));
    },
    ownersSearchPage: async ({page}, use) => {
        await use(new OwnersSearchPage(page));
    },
})
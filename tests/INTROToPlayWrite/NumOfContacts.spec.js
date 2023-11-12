"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const playwright_1 = require("playwright");
test_1.test.describe('Number Of Contacts Validation ', () => {
    let browser;
    let page;
    let expectedErrorMessage = "Invalid value.";
    let termsAndConditionsErrorMessage = "Please confirm the terms of use.";
    let receivingEmailsAndPromotionsErrorMessage = "This field is required.";
    let CONTACTS_SELECT_LOCATOR = "#your-contacts-count";
    let SUBMIT_BUTTON_LOCATOR = "//input[@type='submit']";
    let ERROR_LABEL_LOCATOR = "//label[@id = 'your-contacts-count-error']";
    let ERROR_TERMS_OF_USER = "//label[@id ='checkbox-tos-error']";
    let ERROR_PROMOTIONS = "//label[@id = 'checkbox-arem-error']";
    test_1.test.beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        browser = yield playwright_1.chromium.launch();
    }));
    test_1.test.beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        page = yield browser.newPage();
        yield page.goto('https://www.activetrail.com/free-trial/');
        yield page.setViewportSize({ width: 1920, height: 1080 });
    }));
    test_1.test.afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield page.close();
    }));
    test_1.test.afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield browser.close();
    }));
    (0, test_1.test)(`default select should show error message: '${expectedErrorMessage}'`, () => __awaiter(void 0, void 0, void 0, function* () {
        const select = page.locator(CONTACTS_SELECT_LOCATOR);
        yield select.selectOption('');
        yield page.locator(SUBMIT_BUTTON_LOCATOR).click();
        const errorMsg = yield page.locator(ERROR_LABEL_LOCATOR).textContent();
        (0, test_1.expect)(errorMsg).toBe(expectedErrorMessage);
    }));
    (0, test_1.test)(`not checking to accept terms and conditions should show error message: '${expectedErrorMessage}'`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.locator(SUBMIT_BUTTON_LOCATOR).click();
        const errorMsg = yield page.locator(ERROR_TERMS_OF_USER).textContent();
        (0, test_1.expect)(errorMsg).toBe(termsAndConditionsErrorMessage);
    }));
    (0, test_1.test)(`not checking to accept receiving emails and promotions should show error message: '${expectedErrorMessage}'`, () => __awaiter(void 0, void 0, void 0, function* () {
        yield page.locator(SUBMIT_BUTTON_LOCATOR).click();
        const errorMsg = yield page.locator(ERROR_PROMOTIONS).textContent();
        (0, test_1.expect)(errorMsg).toBe(receivingEmailsAndPromotionsErrorMessage);
    }));
});

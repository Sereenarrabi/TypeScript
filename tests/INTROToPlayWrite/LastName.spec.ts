import { test, expect, Browser, Page } from '@playwright/test';
import { chromium } from 'playwright';

test.describe('Lastname Validation ', () => {

    let browser: Browser;
    let page: Page;
    let expectedErrorMessage = "Invalid value.";
    let LASTNAME_INPUT_LOCATOR = "//input[@placeholder='Last Name*']";
    let SUBMIT_BUTTON_LOCATOR = "//input[@type='submit']";
    let ERROR_LABEL_LOCATOR = "//label[@id = 'your-last-name-error']";


    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.beforeEach(async () => {
        page = await browser.newPage();
        await page.goto('https://www.activetrail.com/free-trial/');
        await page.setViewportSize({ width: 1920, height: 1080 });

    });
    test.afterEach(async () => {
        await page.close();
    });
    test.afterAll(async () => {
        await browser.close();
    });


    test(`empty input should show error message: '${expectedErrorMessage}'`, async () => {
        const input = page.locator(LASTNAME_INPUT_LOCATOR);
        await input.fill('');
        await page.locator(SUBMIT_BUTTON_LOCATOR).click();

        const errorMsg = await page.locator(ERROR_LABEL_LOCATOR).textContent();
        expect(errorMsg).toBe(expectedErrorMessage)
    });

    test(`with special characters lastname input should show error message: '${expectedErrorMessage}'`, async () => {
        const input = page.locator(LASTNAME_INPUT_LOCATOR);
        await input.fill('aaaaaa@@');
        await page.locator(SUBMIT_BUTTON_LOCATOR).click();

        const errorMsg = await page.locator(ERROR_LABEL_LOCATOR).textContent();
        expect(errorMsg).toBe(expectedErrorMessage)
    });

    test(`with digits characters lastname input should show error message: '${expectedErrorMessage}'`, async () => {
        const input = page.locator(LASTNAME_INPUT_LOCATOR);
        await input.fill('aaaa123');
        await page.locator(SUBMIT_BUTTON_LOCATOR).click();

        const errorMsg = await page.locator(ERROR_LABEL_LOCATOR).textContent();
        expect(errorMsg).toBe(expectedErrorMessage)
    });

});

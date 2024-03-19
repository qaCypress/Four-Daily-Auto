import { test, expect, chromium, Browser } from '@playwright/test';
import { LoginFixture } from '../login-fixture.ts';
import { AllRightData } from '../login-data.json';

test.describe('AllRight', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    const allRightData = AllRightData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
    });
    test.setTimeout(500000);
    
    test('Login Allright', async ({ page }) => {
        fixture = new LoginFixture(allRightData, page, browser);
        await fixture.AllRightLogin();
        await fixture.AllRightSlider();
    });

    test.afterAll(async () => {
        await browser.close();
    });
});

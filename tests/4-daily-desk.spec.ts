import { test, expect, chromium, Browser } from '@playwright/test';
import { LoginFixture } from '../login-fixture-desk.ts';
import { AllRightData, LuckyBirdData, SlotticaData, SlottyWayData, SpinambaData, SpinBountyData, Magic365Data, SuperCatData, ViksData, SpinadoData} from '../4daily-data-desk.json';

const testData = [
    { name: 'Allright', data: AllRightData }, //tested
    { name: 'LuckyBird', data: LuckyBirdData }, //tested
    { name: 'Slottica', data: SlotticaData }, //tested
    { name: 'SlottyWay', data: SlottyWayData }, //tested
    { name: 'Spinamba', data: SpinambaData }, //tested
    { name: 'SpinBounty', data: SpinBountyData }, //tested
    { name: 'Magic365', data: Magic365Data }, //tested
    { name: 'SuperCat', data: SuperCatData }, //tested
    { name: 'Viks', data: ViksData }, //tested
    { name: 'Spinado', data: SpinadoData } //tested
];


for (const { name, data } of testData) {
    
    test.describe(`${name} Test Slider and Button`, () => {
        let fixture: LoginFixture;
        let browser: Browser;

        test.beforeAll(async () => {
            browser = await chromium.launch();
        });
        test.setTimeout(500000);

        test.beforeEach(async ({ page }) => {
            fixture = new LoginFixture(data, page, browser, data.languages[0]);
            await fixture.LoginStandart();
        });

        for (const lang of data.languages) {
            test(`languages (${lang})`, async ({ page }) => {
                fixture = new LoginFixture(data, page, browser, lang);

                switch (name) {
                    case 'Magic365':
                    case 'SpinBounty':
                        await fixture.ProjectSliderSpinBountyAndMagic(lang);
                        break;

                    default:
                        await fixture.ProjectSliderStandart(lang);
                        break;
                }
                
            });
        }

        test.afterAll(async () => {
            await browser.close();
        });
    });
}
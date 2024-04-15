import { test, expect, chromium, Browser } from '@playwright/test';
import { LoginFixture } from '../login-fixture-mob.ts';
import { AllRightData, LuckyBirdData, SlotticaData, SlottyWayData, SpinambaData, SpinBountyData, Magic365Data, SuperCatData, ViksData, SpinadoData} from '../4daily-data-mob.json';

test.describe('Allright Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;

    const allRightData = AllRightData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(allRightData, page, context, allRightData.languages[0]);
        await fixture.LoginStandart();
    });

    test.setTimeout(500000);

    for(const lang of allRightData.languages) {
        test(`languages (${lang})`, async () => {
            await fixture.ProjectSliderStandart(lang);
        });
    }

    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('LuckyBird Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;

    const luckybirdData = LuckyBirdData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(luckybirdData, page, context, luckybirdData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of luckybirdData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('Slottica Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;

    const slotticatData = SlotticaData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(slotticatData, page, context, slotticatData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of slotticatData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('SlottyWay Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const slottywayData = SlottyWayData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(slottywayData, page, context, slottywayData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of slottywayData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('Spinamba Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const spinambaData = SpinambaData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(spinambaData, page, context, spinambaData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of spinambaData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('SpinBounty Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const spinbountyData = SpinBountyData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(spinbountyData, page, context, spinbountyData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of spinbountyData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderSpinBountyAndMagic(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('Magic365 Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const magic365Data = Magic365Data;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(magic365Data, page, context, magic365Data.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of magic365Data.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderSpinBountyAndMagic(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('SuperCat Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const supercatData = SuperCatData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(supercatData, page, context, supercatData.languages[0]);
        await fixture.LoginStandart();
    });
    test.setTimeout(500000);
    
    for(const lang of supercatData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('Viks Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const viksData = ViksData;

    test.beforeAll(async () => {
        browser = await chromium.launch();
        context = await browser.newContext(); // Create a new context
        const page = await context.newPage(); // Create a new page
        fixture = new LoginFixture(viksData, page, context, viksData.languages[0]);
        await fixture.LoginStandartViks();
    });
    test.setTimeout(500000);
    
    for(const lang of viksData.languages) {
    test(`languages (${lang})`, async () => {
        await fixture.ProjectSliderStandart(lang);
       });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
}); //done //tested

test.describe('Spinado Test Slider and Button', () => {
    let fixture: LoginFixture;
    let browser: Browser;
    let context;
    
    const spinadoData = SpinadoData;

    test.beforeAll(async () => {
        test.setTimeout(2000000);
        browser = await chromium.launch();
        context = await browser.newContext();
        const page = await context.newPage();
        fixture = new LoginFixture(spinadoData, page, context, spinadoData.languages[0]);
        await fixture.LoginStandart();
    });
    
    test.setTimeout(2000000);

    for(const lang of spinadoData.languages) {
        test(`languages (${lang})`, async () => {
            await fixture.ProjectSliderStandart(lang);
        });
    }
    
    test.afterAll(async () => {
        await browser.close();
    });
});
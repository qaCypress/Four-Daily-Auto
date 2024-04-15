import { chromium, Browser, Page } from 'playwright';
import { defineConfig } from '@playwright/test';

interface DataSlider {
    email: string;
    password: string;
    signInUrl: string;
    languages: any;
    signInUrlSimple : any;
    projectName : any;
    projectName1 : any;
    countSlickSlide : any;
    slickSlide1 : any;
    slickSlide2 : any;
    slickSlide3 : any;
    slickSlide4 : any;
    slickSlide5 : any;
    slickSlideBunner1 : any;
    slickSlideBunner2 : any;
    slickSlideButton1 : any;
    slickSlideButton2 : any;
    submitButtonLogin : any;
    closeIcon : any;
    trueNumberSpan : any;
    passwordFieldLogin : any;
    emailFieldLogin : any;
    packageOverlay : any;
    buttonReferance : any;
    buttonTelegram : any;
}

export class LoginFixture {
browserParametr: Browser;
page: Page;
DataInter: DataSlider;
language: any;

constructor(DataInter: DataSlider, page : Page, browserParametr: Browser, lang: any)
{
    this.DataInter = DataInter;
    this.page = page;
    this.browserParametr = browserParametr;
    this.language = lang;
}

//function that performs authorization on the site
async LoginStandart() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.goto(this.DataInter.signInUrl);
    await this.page.fill(`${this.DataInter.emailFieldLogin}`, this.DataInter.email);
    await this.page.fill(`${this.DataInter.passwordFieldLogin}`, this.DataInter.password);
    await this.page.click(this.DataInter.submitButtonLogin);
    await this.page.waitForNavigation();
    await this.page.click(this.DataInter.closeIcon);
} //done

async LoginStandartViks() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.goto(this.DataInter.signInUrl);
    await this.page.click('[data-tab="email"]');
    await this.page.fill(`${this.DataInter.emailFieldLogin}`, this.DataInter.email);
    await this.page.fill(`${this.DataInter.passwordFieldLogin}`, this.DataInter.password);
    await this.page.click(this.DataInter.submitButtonLogin);
    await this.page.waitForNavigation();
} //done

//main function which contains other functions for testing
async ProjectSliderStandart(lang: string) {

    await this.page.waitForLoadState('networkidle');

    await this.goToProjectPage(lang);

    await this.page.waitForLoadState('networkidle');
    let totalSliderCount = 0;
    const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
    totalSliderCount += elementsCount;

    for(let index = 0; index <= elementsCount - 1; index++)
    {
    await this.handleSlide(index, lang);
    await this.handleTextValidation(index, lang);
    await this.handleButtonClick(index, lang, elementsCount);
    //await this.checkResponse(index, lang);
    await this.goToProjectPage(lang);
    }
} //done

//function which make redirect, on sites main page
async goToProjectPage(lang: string) {
    const actions: Record<string, () => void> = {
        ViksDeskSlide: async () => {
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}/casino`);
        },
        SuperCatDeskSlide: async () => {
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
            await this.page.waitForTimeout(1000);
        },
        SpinadoDeskSlide: async () => {
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
            await this.page.waitForTimeout(1000);
        },
        default: async () => {
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
        }
    };

    const action = actions[this.DataInter.projectName] || actions.default;
    await action();
} //done

//function which make click on slickslide button and make screenshots
async handleSlide(index: number, lang: string) {
    const slickSlide1 = this.DataInter.slickSlide1;
    const slickSlide2 = this.DataInter.slickSlide2;
    const slickSlide3 = this.DataInter.slickSlide3;
    const slickSlide4 = this.DataInter.slickSlide4;
    const slickSlide5 = this.DataInter.slickSlide5;

    const packageName = this.DataInter.packageOverlay;

    const actions = {
        SlottyWayDeskSlide: async () => {
            const selectors = [
                `${slickSlide1}${index}`,
                `${slickSlide2}${index}`,
                `${slickSlide3}${index}`,
                `${slickSlide4}${index}`,
                `${slickSlide5}${index}`
            ];
            await this.clickFirstFound(selectors, lang);
        },
        SpinambaDeskSlide: async () => {
            const selectors = [
                `${slickSlide1}${index}`,
                `${slickSlide2}${index}`,
                `${slickSlide3}${index}`,
                `${slickSlide4}${index}`,
                `${slickSlide5}${index}`
            ];
            await this.clickFirstFound(selectors, lang);
        },
        SuperCatDeskSlide: async () => {
            await this.page.waitForTimeout(1500);
            await this.page.click(`${slickSlide1}${index + 1})`, { force: true });
        },
        SpinadoDeskSlide: async () => {
            await this.page.click(`${slickSlide1}${index}`, { force: true });
            await this.page.waitForTimeout(1500);
        },
        default: async () => {
            await this.page.click(`${slickSlide1}${index}`, { force: true });
            await this.page.waitForLoadState('networkidle');
        }
    };

    const action = actions[this.DataInter.projectName] || actions.default;
    await action();

    
let elementHandle;
switch (this.DataInter.projectName) {
    case "LuckyBirdDeskSlide":
    case "SlottyWayDeskSlide":
    case "SpinambaDeskSlide":
        elementHandle = await this.page.$(`#banners_slick`);
        break;
    case "SuperCatDeskSlide":
        elementHandle = await this.page.$(`#root > main > div.slider`);
        break;
        case "SpinadoDeskSlide":
        elementHandle = await this.page.$(`#banners`);
        break;
    default:
        elementHandle = await this.page.$(`${packageName}${index}`);
        break;
}

if (elementHandle) {
    await this.page.waitForTimeout(800);
    const boundingBox = await elementHandle.boundingBox();
    if (boundingBox) {
        await this.page.screenshot({
            path: `ScreenProjectsSlider/${this.DataInter.projectName}/slide_${index}_language_${lang}.png`,
            clip: {
                x: boundingBox.x,
                y: boundingBox.y,
                width: boundingBox.width,
                height: boundingBox.height
            }
        });
    }
  }
} //done

//a function that is used in the handleSlide function to check the existence of slickslide elements
async clickFirstFound(selectors: string[], lang: string) {
    let clicked = false;
    for (const selector of selectors) {
        const element = await this.page.$(selector);
        if (element) {
            await element.click({ force: true });
            clicked = true;
            await this.page.waitForLoadState('networkidle');
            break;
        }
    }

    if (!clicked) {
        console.error("No slick");
    }
} //done

//a function that is used in the handleSlide function to check the existence of slickslide elements
async handleTextValidation(index: number, lang: string) {
    await this.page.waitForLoadState('networkidle');

    if(this.DataInter.projectName == "SuperCatDeskSlide")
        {
            var element = await this.page.$(`.slider-item__header`);
        }
        else if(this.DataInter.projectName == "SpinadoDeskSlide") {
            var element = await this.page.$('div.game_info > div > div');
        }
        else{
            var element = await this.page.$('p.desktop.only');
        }

    if (!element) {
        console.error('Error: Element not found on page');
        return;
    }

    let brElements;
    if(this.DataInter.projectName == "SuperCatDeskSlide" || this.DataInter.projectName == "SpinadoDeskSlide")
        {
    brElements = await element.$$('p');
        }
        else{
    brElements = await element.$$('br');
        }

    const brCount = brElements.length;

    switch (this.DataInter.projectName) {
        case "SlottyWayDeskSlide":
        case "SpinambaDeskSlide":
            if (brCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "SuperCatDeskSlide":
            if (brCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "ViksDeskSlide":
            if (brCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "SpinadoDeskSlide":
        case "SlotticaDeskSlide":
            if (brCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        default:
            if (brCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
    }
} //done

//a function that cheacking status response on page, after redirect on button
async checkResponse(index: number, lang: string)
{
    const response = await this.page.waitForResponse(response => response.status() === 200);
    if (!response) {
        await this.page.screenshot({
            path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
            fullPage: false,
        });
        throw new Error(`Error: Button response are bad on ${lang} language`);
      }
}

//function that clicks on a button on a slider and make screenshots
async handleButtonClick(index: number, lang: string, elementsCount: number) {
    
    await this.page.waitForLoadState('networkidle');

    if(this.DataInter.projectName == "SuperCatDeskSlide")
        {
            await this.page.click(`#root > main > div.slider > div.slick-slider.slick-initialized > div > div > div.slick-slide.slick-active.slick-current > div > div > div > a`);
        }
        
        else if(this.DataInter.projectName == "SpinadoDeskSlide")
            {
                await this.page.click(`#slick-slide0${index} > div > div > div.game_info > a.button.big.secondary`);
            }

        else{

    const buttonSelectors = [
        `${this.DataInter.slickSlideButton1}${index} ${this.DataInter.slickSlideButton2}`,
        `#slick-slide0${index} > div > div.overlay > div > div.button_container > a`,
        `#slick-slide1${index} > div > div.overlay > div > div.button_container > a`,
        `#slick-slide3${index} > div > div.overlay > div > div.button_container > a`
    ];

    let clicked = false;
    for (const selector of buttonSelectors) {
        const element = await this.page.$(selector);
        if (element) {
            await element.click({ force: true });
            clicked = true;
            await this.page.waitForLoadState('networkidle');
            break;
        }
        else
        {

        }
    }
}

    if (index === elementsCount - 1) {
        var elementHandle2 = await this.page.$(`${this.DataInter.buttonTelegram}`);
    } else {
        var elementHandle2 = await this.page.$(`${this.DataInter.buttonReferance}`);
    }
                
    if (elementHandle2) {
        if(this.DataInter.projectName == "SuperCatDeskSlide")
            {
                await this.page.waitForTimeout(2500);
            }
            else
            {
                await this.page.waitForTimeout(800);
            }
        
        const boundingBox = await elementHandle2.boundingBox();
        if (boundingBox) {
            await this.page.screenshot({
                path: `ScreenProjectsButton/${this.DataInter.projectName1}/button_${index}_language_${lang}.png`,
                clip: {
                    x: boundingBox.x,
                    y: boundingBox.y,
                    width: boundingBox.width,
                    height: boundingBox.height
                }
            });
        }
    }
    await this.page.waitForLoadState('networkidle');
} //done

//a separate function for other sites that uses different logic
async ProjectSliderSpinBountyAndMagic(lang: string) {
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);

    const elements = await this.page.$$(`${this.DataInter.countSlickSlide}`);
    const scrollDistance = 810;

    for (let index = 0; index < elements.length; index++) {
        await this.page.$eval(`${this.DataInter.slickSlide1}`, (element, currentScrollLeft) => {
            element.scrollTo(currentScrollLeft, 0);
        }, index * scrollDistance);
        
        await this.page.waitForLoadState('networkidle');

        const elementHandle = await this.page.$(`${this.DataInter.packageOverlay}`);
        if (elementHandle) {
            const boundingBox = await elementHandle.boundingBox();
            if (boundingBox) {
                await this.page.screenshot({
                    path: `ScreenProjectsSlider/${this.DataInter.projectName}/slide_${index}_language_${lang}.png`,
                    clip: boundingBox
                });
            }
        }

        await this.page.click(`${this.DataInter.slickSlideButton1}${index + 1}${this.DataInter.slickSlideButton2}`, { force: true });
        await this.page.waitForLoadState('networkidle');

        const elementHandle2 = await this.page.$(index === elements.length - 1 ? `${this.DataInter.buttonTelegram}` : `${this.DataInter.buttonReferance}`);
        if (elementHandle2) {
            const boundingBox = await elementHandle2.boundingBox();
            if (boundingBox) {
                await this.page.screenshot({
                    path: `ScreenProjectsButton/${this.DataInter.projectName1}/slide_${index}_language_${lang}.png`,
                    clip: boundingBox
                });
            }
        }
        await this.page.goBack();
    }
} //done

}

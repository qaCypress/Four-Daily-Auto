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
    await this.page.setViewportSize({ width: 430, height: 932 });
    await this.page.goto(this.DataInter.signInUrl);
    if(this.DataInter.projectName === "ViksMobSlide")
    {
        await this.page.click('[data-tab="email"]');
        await this.page.fill(`${this.DataInter.emailFieldLogin}`, this.DataInter.email);
    await this.page.fill(`${this.DataInter.passwordFieldLogin}`, this.DataInter.password);
    await this.page.click(this.DataInter.submitButtonLogin);
    await this.page.waitForNavigation();
    await this.page.waitForLoadState('networkidle');
    }
    else{
    await this.page.fill(`${this.DataInter.emailFieldLogin}`, this.DataInter.email);
    await this.page.fill(`${this.DataInter.passwordFieldLogin}`, this.DataInter.password);
    await this.page.click(this.DataInter.submitButtonLogin);
    await this.page.waitForNavigation();
    await this.page.click(this.DataInter.closeIcon);
    await this.page.waitForLoadState('networkidle');
    }
} //done

//main function which contains other functions for testing
async ProjectSliderStandart(lang: string) {

    await this.goToProjectPage(lang);

    if(this.DataInter.projectName === "SlotticaMobSlide" || this.DataInter.projectName === "SuperCatMobSlide" || this.DataInter.projectName === "ViksMobSlide" || this.DataInter.projectName === "SpinadoMobSlide")
    {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        await this.page.waitForLoadState('networkidle');
    }

    let totalSliderCount = 0;
    const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
    totalSliderCount += elementsCount;

    console.log(totalSliderCount);

    if(this.DataInter.projectName === "SlotticaMobSlide" || this.DataInter.projectName === "SuperCatMobSlide")
    {
        await this.page.waitForLoadState('networkidle');
        await this.page.setViewportSize({ width: 430, height: 932 });
        await this.page.waitForLoadState('networkidle');

        if(this.DataInter.projectName === "SuperCatMobSlide")
        {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
        }
    }


    for(let index = 0; index <= elementsCount - 1; index++)
    {
    await this.handleSlide(index, lang);
    await this.handleTextValidation(index, lang);
    await this.handleButtonClick(index, lang, elementsCount);
    }
} //done

//function which make redirect, on sites main page
async goToProjectPage(lang: string) {
    const actions: Record<string, () => void> = {
        ViksMobSlide: async () => {
            await this.page.waitForLoadState('networkidle');
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}/casino`);
        },
        SuperCatMobSlide: async () => {
            await this.page.waitForLoadState('networkidle');
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
            await this.page.waitForTimeout(2000);
        },
        SpinadoMobSlide: async () => {
            await this.page.waitForLoadState('networkidle');
            await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
            await this.page.waitForTimeout(2000);
        },
        default: async () => {
            await this.page.waitForLoadState('networkidle');
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
    const packageName = this.DataInter.packageOverlay;

    const actions = {
        SlottyWayMobSlide: async () => {
            const selectors = [
                `${slickSlide1}${index}${slickSlide2}`,
                `#slick-slide-control0${index}`,
                `#slick-slide-control1${index}`
            ];
            await this.clickFirstFound(selectors, lang);
        },
        SpinambaMobSlide: async () => {
            const selectors = [
                `${slickSlide1}${index}${slickSlide2}`,
                `#slick-slide-control0${index}`,
                `#slick-slide-control1${index}`,
                `#slick-slide-control3${index}`
            ];
            await this.clickFirstFound(selectors, lang);
        },
        SuperCatMobSlide: async () => {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
            await this.page.waitForTimeout(1500);
            await this.page.click(`${slickSlide1}${index + 1}${slickSlide2}`, { force: true });
            await this.page.waitForTimeout(1500);
        },
        LuckyBirdMobSlide: async () => {
        
            let flag = false;
            const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
            let count1 = index - 1;

            for (let repeat = 1; repeat <= elementsCount; repeat++) {
                const element = await this.page.$(this.DataInter.packageOverlay);
                
                for (let count = 0; count <= count1; count++ ) {
                    if (element) {
                        const elBox = await element.boundingBox();
                        if (elBox) {
            
                            const startX = elBox.x + elBox.width / 2; // Начальная точка свайпа (центр элемента)
                            const startY = elBox.y + elBox.height / 2;
                            const endX = startX - 100; // Конечная точка свайпа (100 пикселей влево)
                            const endY = startY;
            
                            await this.page.waitForTimeout(2000);
            
                            // Начало касания
                            await this.page.mouse.move(startX, startY);
                            await this.page.mouse.down();
            
                            // Перемещение пальца
                            await this.page.mouse.move(endX, endY);
            
                            // Окончание касания
                            await this.page.mouse.up();

                            if (count == count1) {
                                flag = true; 
                                break;
                            }
            
                        } else {
                            console.error("Bounding box not found for element");
                        }
                    } else {
                        console.error("ds track Element not found");
                    }
                }
            
                if(flag) {
                    flag = false; // Сбрасываем флаг после увеличения count1
                    break;
                }
            }
        
        },
        SlotticaMobSlide: async () => {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
            
            let flag = false;
            const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
            await this.page.setViewportSize({ width: 430, height: 932 });
            let count1 = index - 1;

            await this.page.waitForTimeout(2000);

            for (let repeat = 1; repeat <= elementsCount; repeat++) {
                const element = await this.page.$(this.DataInter.packageOverlay);
                
                for (let count = 0; count <= count1; count++ ) {
                    if (element) {
                        const elBox = await element.boundingBox();
                        if (elBox) {
            
                            const startX = elBox.x + elBox.width / 2; // Начальная точка свайпа (центр элемента)
                            const startY = elBox.y + elBox.height / 2;
                            const endX = startX - 100; // Конечная точка свайпа (100 пикселей влево)
                            const endY = startY;
            
                            await this.page.waitForTimeout(2000);
            
                            // Начало касания
                            await this.page.mouse.move(startX, startY);
                            await this.page.mouse.down();
            
                            // Перемещение пальца
                            await this.page.mouse.move(endX, endY);
            
                            // Окончание касания
                            await this.page.mouse.up();

                            if (count == count1) {
                                flag = true; 
                                break;
                            }
            
                        } else {
                            console.error("Bounding box not found for element");
                        }
                    } else {
                        console.error("ds track Element not found");
                    }
                }
            
                if(flag) {
                    flag = false; // Сбрасываем флаг после увеличения count1
                    break;
                }
            }
        
        },
        ViksMobSlide: async () => {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
            
            let flag = false;
            const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
            await this.page.setViewportSize({ width: 430, height: 932 });
            let count1 = index - 1;

            await this.page.waitForTimeout(2000);

            for (let repeat = 1; repeat <= elementsCount; repeat++) {
                const element = await this.page.$('div.page_wrap > main > div:nth-child(1)');
                
                for (let count = 0; count <= count1; count++ ) {
                    if (element) {
                        const elBox = await element.boundingBox();
                        if (elBox) {
            
                            const startX = elBox.x + elBox.width / 2; // Начальная точка свайпа (центр элемента)
                            const startY = elBox.y + elBox.height / 2;
                            const endX = startX - 100; // Конечная точка свайпа (100 пикселей влево)
                            const endY = startY;
            
                            await this.page.waitForTimeout(2000);
            
                            // Начало касания
                            await this.page.mouse.move(startX, startY);
                            await this.page.mouse.down();
            
                            // Перемещение пальца
                            await this.page.mouse.move(endX, endY);
            
                            // Окончание касания
                            await this.page.mouse.up();

                            if (count == count1) {
                                flag = true; 
                                break;
                            }
            
                        } else {
                            console.error("Bounding box not found for element");
                        }
                    } else {
                        console.error("ds track Element not found");
                    }
                }
            
                if(flag) {
                    flag = false; // Сбрасываем флаг после увеличения count1
                    break;
                }
            }
        
        },
        SpinadoMobSlide: async () => {
            await this.page.setViewportSize({ width: 1920, height: 1080 });
            
            let flag = false;
            await this.page.waitForTimeout(1000);
            const elementsCount = await this.page.$$eval(`${this.DataInter.countSlickSlide}`, elements => elements.length);
            await this.page.setViewportSize({ width: 430, height: 932 });
            await this.page.waitForTimeout(1000);
            let count1 = index - 1;

            await this.page.waitForTimeout(2000);

            for (let repeat = 1; repeat <= elementsCount; repeat++) {
                const element = await this.page.$('#banners > div > div > div.slick-slide.slick-current.slick-active > div > div > div.image_wrap > img.image.mobile');
                
                for (let count = 0; count <= count1; count++ ) {
                    if (element) {
                        const elBox = await element.boundingBox();
                        if (elBox) {
            
                            const startX = elBox.x + elBox.width / 2; // Начальная точка свайпа (центр элемента)
                            const startY = elBox.y + elBox.height / 2;
                            const endX = startX - 100; // Конечная точка свайпа (100 пикселей влево)
                            const endY = startY;
            
                            await this.page.waitForTimeout(2000);
            
                            // Начало касания
                            await this.page.mouse.move(startX, startY);
                            await this.page.mouse.down();
            
                            // Перемещение пальца
                            await this.page.mouse.move(endX, endY);
            
                            // Окончание касания
                            await this.page.mouse.up();

                            if (count == count1) {
                                flag = true; 
                                break;
                            }
            
                        } else {
                            console.error("Bounding box not found for element");
                        }
                    } else {
                        console.error("ds track Element not found");
                    }
                }
            
                if(flag) {
                    flag = false; // Сбрасываем флаг после увеличения count1
                    break;
                }
            }
        
        },
        default: async () => {
            await this.page.waitForLoadState('networkidle');
            await this.page.click(`${slickSlide1}${index}${slickSlide2}`, { force: true });
            await this.page.waitForLoadState('networkidle');
        }
    };

    const action = actions[this.DataInter.projectName] || actions.default;
    await action();

    
let elementHandle;
switch (this.DataInter.projectName) {
    case "LuckyBirdMobSlide":
        elementHandle = await this.page.$(`#banners_slick > div > div`);
        break;
    case "SlottyWayMobSlide":
        elementHandle = await this.page.$(packageName);
        break;
    case "SuperCatMobSlide":
        elementHandle = await this.page.$(`${packageName}`);
        break;
    case "SlotticaMobSlide":
        elementHandle = await this.page.$(`${packageName}`);
        break;
    case "ViksMobSlide":
        elementHandle = await this.page.$(`${packageName}`);
        break;
    case "SpinadoMobSlide":
        await this.page.evaluate(() => {
            window.scrollTo(0, 0);
        });
        elementHandle = await this.page.$(`${packageName}`);
        break;
    default:
        elementHandle = await this.page.$(`${packageName}${index}`);
        break;
}

if (elementHandle) {
    await this.page.waitForTimeout(800);
    const boundingBox = await elementHandle.boundingBox();
    if (boundingBox) {
        if(this.DataInter.projectName === "SuperCatMobSlide")
    {
        await this.page.setViewportSize({ width: 430, height: 932 });
        await this.page.waitForTimeout(1500);
    }
    if(this.DataInter.projectName === "SpinadoMobSlide")
    {
        await this.page.waitForTimeout(2500);

    }
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
    if(this.DataInter.projectName === "SuperCatMobSlide")
    {
        await this.page.setViewportSize({ width: 1920, height: 1080 });
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

    if(this.DataInter.projectName === "SlotticaMobSlide" || this.DataInter.projectName === "ViksMobSlide" || this.DataInter.projectName === "SppinadoMobSlide")
    {
        var textSelectors = [
            `${this.DataInter.slickSlideBunner1}`
        ];
    }
    else if(this.DataInter.projectName === "SuperCatMobSlide")
    {
        var textSelectors = [
            `.slider-item > .slider-item__header`
        ];
        await this.page.setViewportSize({ width: 430, height: 932 });
        await this.page.waitForTimeout(1500);
    }
    else
    {
        var textSelectors = [
            `${this.DataInter.slickSlideBunner1}`,
            `#slick-slide0${index} > div > div.overlay > div > div.text > p.desktop.only`,
            `#slick-slide1${index} > div > div.overlay > div > div.text > p.desktop.only`,
            `#slick-slide3${index} > div > div.overlay > div > div.text > p.desktop.only`,
            `${this.DataInter.slickSlideBunner1}${index}${this.DataInter.slickSlideBunner2}`
        ];
    }

    let textElement;
    for (const selector of textSelectors) {
        textElement = await this.page.$(selector);
        if (textElement) {
            break;
        }
    }

    if (!textElement) {
        console.error('Error: Element not found on page');
        return;
    }

    const text = await textElement.textContent();
    if (!text) {
        console.error('Error: Failed to get element text');
        return;
    }

    const paragraphCount = text.split('\n').filter(Boolean).length;

    switch (this.DataInter.projectName) {
        case "SlottyWayMobSlide":
        case "SpinambaMobSlide":
            if (paragraphCount !== this.DataInter.trueNumberSpan) {
                console.log(paragraphCount)
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "SuperCatMobSlide":
            if (paragraphCount !== this.DataInter.trueNumberSpan) {
                console.log(paragraphCount)
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "ViksMobSlide":
            if (paragraphCount >= 4) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        case "SpinadoMobSlide":
        case "SlotticaMobSlide":
            if (paragraphCount > 3) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
        default:
            if (paragraphCount !== this.DataInter.trueNumberSpan) {
                await this.page.screenshot({
                    path: `ScreenshotsError/${this.DataInter.projectName}_${index}_language_${lang}.png`,
                    fullPage: false,
                });
                throw new Error(`Error: Incorrect number of paragraphs per ${lang} language`);
            }
            break;
    }
} //done

//function that clicks on a button on a slider and make screenshots
async handleButtonClick(index: number, lang: string, elementsCount: number) {
    
    await this.page.waitForLoadState('networkidle');

    if(this.DataInter.projectName === "LuckyBirdMobSlide")
    {
        var buttonSelectors = [
            `#slick-slide0${index} > div > div.overlay > div.button_container > a.button.button_new.circular.button_mobile`
        ];
    }

    else if(this.DataInter.projectName === "SpinadoMobSlide")
    {
        var buttonSelectors = [
            `${this.DataInter.slickSlideButton1}`
        ];
    }

    else if(this.DataInter.projectName === "ViksMobSlide")
    {
        var buttonSelectors = [
            `${this.DataInter.slickSlideButton1}`
        ];
    }

    else if(this.DataInter.projectName === "SuperCatMobSlide"){
        await this.page.setViewportSize({ width: 1920, height: 1080 });
        var buttonSelectors = [
            `${this.DataInter.slickSlideButton1}`
        ];
    }

    else{
        var buttonSelectors = [
            `${this.DataInter.slickSlideButton2}`,
            `${this.DataInter.slickSlideButton1}${index}${this.DataInter.slickSlideButton2}`,
            `#slick-slide0${index} > div > div.overlay > div > div.button_container > a`,
            `#slick-slide1${index} > div > div.overlay > div > div.button_container > a`,
            `#slick-slide3${index} > div > div.overlay > div > div.button_container > a`,
            `#slick-slide0${index} > div > div.overlay > div.button_container > a.button.button_new.circular.button_mobile`
        ];
    }

    let clicked = false;
    for (const selector of buttonSelectors) {
        const element = await this.page.$(selector);
        if (element) {
            if(this.DataInter.projectName === "SuperCatMobSlide"){
                await this.page.setViewportSize({ width: 1920, height: 1080 });
            }
            await element.click({ force: true });
            clicked = true;
            await this.page.waitForLoadState('networkidle');
            break;
        }
    }

    if (!clicked && (this.DataInter.projectName === "SlottyWayMobSlide" || this.DataInter.projectName === "SpinambaMobSlide")) {
        console.log("No button");
    }

    if (index === elementsCount - 1) {
        var elementHandle2 = await this.page.$(`${this.DataInter.buttonTelegram}`);
    } else {
        var elementHandle2 = await this.page.$(`${this.DataInter.buttonReferance}`);
    }

    if (elementHandle2) {
        await this.page.waitForTimeout(800);
        const boundingBox = await elementHandle2.boundingBox();
        if (boundingBox) {
            if(this.DataInter.projectName === "SuperCatMobSlide")
    {
        await this.page.setViewportSize({ width: 430, height: 932 });
        await this.page.waitForTimeout(1500);
    }
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
    await this.page.goBack();
} //done

//a separate function for other sites that uses different logic
async ProjectSliderSpinBountyAndMagic(lang: string) {
    await this.page.waitForLoadState('networkidle');
    await this.page.goto(`${this.DataInter.signInUrlSimple}${lang}`);
    await this.page.waitForTimeout(2000);
    const elements = await this.page.$$(`${this.DataInter.countSlickSlide}`);
    const scrollDistance = 310;

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
        await this.page.waitForLoadState('networkidle');
        await this.page.click(`${this.DataInter.slickSlideButton1}${index + 1}${this.DataInter.slickSlideButton2}`, { force: true });
        await this.page.waitForLoadState('networkidle');
        const elementHandle2 = await this.page.$(index === elements.length - 1 ? `${this.DataInter.buttonTelegram}` : `${this.DataInter.buttonReferance}`);
        if (elementHandle2) {
            const boundingBox = await elementHandle2.boundingBox();
            if (boundingBox) {
                await this.page.waitForLoadState('networkidle');
                await this.page.screenshot({
                    path: `ScreenProjectsButton/${this.DataInter.projectName1}/slide_${index}_language_${lang}.png`,
                    clip: boundingBox
                });
                await this.page.waitForLoadState('networkidle');
            }
        }
        await this.page.waitForLoadState('networkidle');
        await this.page.goBack();
    }
} //done

}

import { chromium, Browser, Page } from 'playwright';
import { defineConfig } from '@playwright/test';

interface AllRightData {
    email: string;
    password: string;
    signInUrl: string;
    allrightlang: any;
    signInUrlSimple : any;
}

export class LoginFixture {

browserParametr: Browser;
page: Page;
AllRightDataInter: AllRightData; 


constructor(AllRightDataInter: AllRightData, page : Page, browserParametr: Browser)
{
    this.AllRightDataInter = AllRightDataInter;
    this.page = page;
    this.browserParametr = browserParametr;
}

async AllRightLogin() {
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.goto(this.AllRightDataInter.signInUrl);
    await this.page.fill('input[type="email"][name="SigninForm[login]"]', this.AllRightDataInter.email);
    await this.page.fill('[name="SigninForm[password]"][placeholder="Пароль"]', this.AllRightDataInter.password);
    await this.page.click('#form-signin-email > div.submit_button > button');
    await this.page.waitForNavigation();
    await this.page.click('.close > .icon-close');
    await this.page.waitForTimeout(500);
   }

async AllRightSlider() {
for(let lang of this.AllRightDataInter.allrightlang)
{
    await this.page.waitForTimeout(500);
    await this.page.goto(`${this.AllRightDataInter.signInUrlSimple}${lang}`);
    const elementsCount = await this.page.$$eval('button[id^="slick-slide-control0"]', elements => elements.length);
    for(let index = 0; index <= elementsCount - 1; index++)
    {
    await this.page.click(`#slick-slide-control0${index}`, { force: true });
    await this.page.waitForTimeout(1000);
        
    await this.page.screenshot({
        path: `ScreenshotsSlide/AllRightDeskSlide_${index}_language_${lang}.png`,
        fullPage: false,
      });
    
      const textElement = await this.page.$(`#slick-slide0${index} > .item > .overlay > .banner_content > .text > .desktop`);
      if (textElement) {
          const text = await textElement.textContent();
          if (text) {
              const paragraphCount = text.split('\n').filter(Boolean).length;
              if (paragraphCount !== 3) {
                  throw new Error(`Ошибка: Некорректное количество абзацев на ${lang} языке`);
              }
          } else {
              console.error('Ошибка: Не удалось получить текст элемента');
          }
      } else {
          console.error('Ошибка: Элемент не найден на странице');
      }

    await this.page.waitForTimeout(500);

    console.log(index);

    await this.page.click(`#slick-slide0${index} > .item > .overlay > .banner_content > .button`, { force: true });
    
    await this.page.waitForTimeout(1500);

    await this.page.screenshot({
        path: `ScreenshotsButton/AllRightDeskSlide_${index}_language_${lang}.png`,
        fullPage: false,
      });
      await this.page.goBack();
      }
    }
  }   
}
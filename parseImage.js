const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

// Загружаем пути из файла image-path-data.json
const { slidersAndbuttonsPath } = require('./image-path-data.json');

// Получаем массивы путей к кнопкам и слайдерам для рабочего стола
const buttonsPathDesk = slidersAndbuttonsPath.buttonsPathDesk;
const sliderPathDesk = slidersAndbuttonsPath.sliderPathDesk;
const buttonsPathMob = slidersAndbuttonsPath.buttonsPathMob;
const sliderPathMob = slidersAndbuttonsPath.sliderPathMob;

const typeScreen = ["Button", "Slider"];
const htmlFilePaths = [];

(async () => {
  const browser = await chromium.launch(); // Launching the browser instance
  const context = await browser.newContext(); // Creating a new context

  const resultFolderPath = path.join(__dirname, 'ResultMargedHTML');

  if (!fs.existsSync(resultFolderPath)) {
    fs.mkdirSync(resultFolderPath);
  }

  [buttonsPathDesk, sliderPathDesk, buttonsPathMob, sliderPathMob].forEach(paths => {
    const type = paths === buttonsPathDesk || paths === buttonsPathMob ? "Button" : "Slider";

    paths.forEach(pathProject => {
      const folderPath = `..\\Four-Daily-Auto\\ScreenProjects${type}\\${pathProject}`;

      if (fs.existsSync(folderPath)) {

        const files = fs.readdirSync(folderPath);

        const imageFiles = files.filter(file => path.extname(file).toLowerCase() === '.png');

        if (imageFiles.length > 0) {
          const absoluteFolderPath = path.resolve(folderPath);

          const htmlContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Screenshots for ${pathProject}</title>
            </head>
            <body>
              <h1>Screenshots for ${pathProject}</h1>
              <div id="screenshots">
                ${imageFiles.map(file => `<img src="file://${path.join(absoluteFolderPath, file)}" alt="${file}">`).join('\n')}
              </div>
            </body>
            </html>
          `;

          const htmlFilePath = path.join(resultFolderPath, `${pathProject}_screenshots.html`);
          console.log("HTML file path:", htmlFilePath);

          fs.writeFileSync(htmlFilePath, htmlContent);
          htmlFilePaths.push(htmlFilePath);
        }
      } else {
        console.log("Folder does not exist:", folderPath);
      }
    });
  });

  if (htmlFilePaths.length > 0) {
    for (const htmlFilePath of htmlFilePaths) {
      const page = await context.newPage();
      await page.goto(`file://${htmlFilePath}`);
    }
    console.log("All HTML files opened in the default browser.");
  } else {
    console.log("No HTML files found.");
  }

  await browser.close();

})();

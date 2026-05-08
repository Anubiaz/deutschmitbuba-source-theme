const path = require('node:path');
const {chromium} = require('playwright');
const {ensureDir, getTargetUrl, qaRoot, timestamp} = require('./common');

const viewports = [
    {name: '390', width: 390, height: 844},
    {name: '768', width: 768, height: 1024},
    {name: '1024', width: 1024, height: 768},
    {name: '1440', width: 1440, height: 900},
    {name: '1920', width: 1920, height: 1080}
];

(async () => {
    const url = getTargetUrl();
    const outDir = path.join(qaRoot, 'screenshots', timestamp());
    ensureDir(outDir);

    const browser = await chromium.launch();
    const page = await browser.newPage();
    const files = [];

    for (const viewport of viewports) {
        await page.setViewportSize({width: viewport.width, height: viewport.height});
        await page.goto(url, {waitUntil: 'networkidle', timeout: 60000});
        const file = path.join(outDir, `${viewport.name}.png`);
        await page.screenshot({path: file, fullPage: true});
        files.push(file);
    }

    await browser.close();
    console.log(`screenshots: ok (${files.length})`);
    console.log(`report=${outDir}`);
})().catch((error) => {
    console.error(error.message);
    process.exit(1);
});

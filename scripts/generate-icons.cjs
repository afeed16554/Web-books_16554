const fs = require('fs');
const { chromium } = require('playwright-core');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const svgContent = fs.readFileSync('public/icon.svg', 'utf8');

  // 512x512
  await page.setViewportSize({ width: 512, height: 512 });
  await page.setContent(`<div id="box" style="margin:0;padding:0;width:512px;height:512px;">${svgContent}</div>`);
  const el512 = await page.$('#box');
  await el512.screenshot({ path: 'public/pwa-512x512.png', omitBackground: false });

  // 192x192
  await page.setViewportSize({ width: 192, height: 192 });
  await page.setContent(`<div id="box" style="margin:0;padding:0;width:192px;height:192px;">${svgContent}</div>`);
  const el192 = await page.$('#box');
  await el192.screenshot({ path: 'public/pwa-192x192.png', omitBackground: false });

  // 180x180 for iOS Apple Touch Icon
  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(`<div id="box" style="margin:0;padding:0;width:180px;height:180px;">${svgContent}</div>`);
  const el180 = await page.$('#box');
  await el180.screenshot({ path: 'public/apple-touch-icon.png', omitBackground: false });

  // 512x512 Maskable (with 15% safe margin)
  await page.setViewportSize({ width: 512, height: 512 });
  await page.setContent(`
    <div id="box" style="margin:0;padding:0;width:512px;height:512px;background:#020617;display:flex;align-items:center;justify-content:center;">
      <div style="width:410px;height:410px;">${svgContent}</div>
    </div>
  `);
  const elMask = await page.$('#box');
  await elMask.screenshot({ path: 'public/pwa-maskable-512x512.png', omitBackground: false });

  await browser.close();
  console.log('Successfully generated all PWA & app store PNG icons in /public!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});

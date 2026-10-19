const { chromium } = require('playwright');
const fs = require('fs');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const content = fs.readFileSync('src/components/WebBooksLogo.tsx', 'utf8');
  const svgMatch = content.match(/WEB_BOOKS_GLOBE_SVG_RAW = `([\s\S]*?)`;/);
  if (!svgMatch) throw new Error('SVG not found in WebBooksLogo.tsx');
  const svg = svgMatch[1];

  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;overflow:hidden;width:512px;height:512px;">${svg}</body></html>`);

  await page.setViewportSize({ width: 512, height: 512 });
  const svgEl = await page.locator('svg');

  await svgEl.screenshot({ path: 'public/pwa-512x512.png', omitBackground: true });
  console.log('Saved public/pwa-512x512.png');

  await page.setViewportSize({ width: 192, height: 192 });
  await svgEl.screenshot({ path: 'public/pwa-192x192.png', omitBackground: true });
  console.log('Saved public/pwa-192x192.png');

  await page.setViewportSize({ width: 180, height: 180 });
  await svgEl.screenshot({ path: 'public/apple-touch-icon.png', omitBackground: true });
  console.log('Saved public/apple-touch-icon.png');

  await page.setViewportSize({ width: 512, height: 512 });
  await svgEl.screenshot({ path: 'public/pwa-maskable-512x512.png', omitBackground: true });
  console.log('Saved public/pwa-maskable-512x512.png');

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

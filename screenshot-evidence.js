const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const EVIDENCE_DIR = path.join(__dirname, 'docs', 'evidence');
const files = fs.readdirSync(EVIDENCE_DIR).filter(f => f.endsWith('.html'));

(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 900, height: 600 });

  for (const file of files) {
    const htmlPath = path.join(EVIDENCE_DIR, file);
    await page.goto('file:///' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });
    const pngPath = path.join(EVIDENCE_DIR, file.replace('.html', '.png'));
    await page.screenshot({ path: pngPath, fullPage: true });
    console.log('Screenshot saved:', path.basename(pngPath));
  }

  await browser.close();
  console.log('\n✅ All PNG screenshots saved!');
})();

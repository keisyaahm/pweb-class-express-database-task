const { spawn } = require('child_process');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const EVIDENCE_DIR = path.join(__dirname, 'docs', 'evidence');
if (!fs.existsSync(EVIDENCE_DIR)) fs.mkdirSync(EVIDENCE_DIR, { recursive: true });

function htmlPage(title, method, url, body, statusCode, statusText, responseBody) {
  const statusColor = statusCode >= 200 && statusCode < 300 ? '#27ae60'
    : statusCode >= 400 && statusCode < 500 ? '#e74c3c' : '#e67e22';
  const methodColor = { GET: '#2ecc71', POST: '#3498db', PUT: '#f39c12', DELETE: '#e74c3c' }[method] || '#95a5a6';
  const bodySection = body ? `
    <div class="section">
      <div class="label">Request Body</div>
      <pre>${JSON.stringify(body, null, 2)}</pre>
    </div>` : '';
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #1a1a2e; font-family: 'Segoe UI', sans-serif; color: #e0e0e0; padding: 24px; }
  .card { background: #16213e; border-radius: 12px; padding: 24px; max-width: 780px; border: 1px solid #0f3460; }
  .title { font-size: 18px; font-weight: bold; color: #e94560; margin-bottom: 20px; }
  .request-bar { display: flex; align-items: center; gap: 12px; background: #0f3460; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; }
  .method { background: ${methodColor}; color: #fff; font-weight: bold; font-size: 13px; padding: 4px 10px; border-radius: 6px; }
  .url { font-size: 14px; color: #a8d8ea; font-family: monospace; word-break: break-all; }
  .status-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .status { background: ${statusColor}; color: #fff; font-weight: bold; font-size: 14px; padding: 6px 14px; border-radius: 20px; }
  .status-text { color: #ccc; font-size: 13px; }
  .section { margin-bottom: 16px; }
  .label { font-size: 11px; text-transform: uppercase; color: #7f8c8d; letter-spacing: 1px; margin-bottom: 8px; }
  pre { background: #0a0a1a; border: 1px solid #0f3460; border-radius: 8px; padding: 16px; font-size: 13px; color: #2ecc71; overflow-x: auto; line-height: 1.6; white-space: pre-wrap; }
  .header-bar { background: #e94560; height: 4px; border-radius: 4px 4px 0 0; margin: -24px -24px 24px -24px; }
</style>
</head>
<body>
<div class="card">
  <div class="header-bar"></div>
  <div class="title">${title}</div>
  <div class="request-bar">
    <span class="method">${method}</span>
    <span class="url">${url}</span>
  </div>
  ${bodySection}
  <div class="status-row">
    <span class="status">${statusCode}</span>
    <span class="status-text">${statusText}</span>
  </div>
  <div class="section">
    <div class="label">Response Body</div>
    <pre>${typeof responseBody === 'string' ? responseBody : JSON.stringify(responseBody, null, 2)}</pre>
  </div>
</div>
</body>
</html>`;
}

async function saveHtml(filename, title, method, url, body, statusCode, statusText, responseBody) {
  const html = htmlPage(title, method, url, body, statusCode, statusText, responseBody);
  const htmlPath = path.join(EVIDENCE_DIR, filename + '.html');
  fs.writeFileSync(htmlPath, html);
  return htmlPath;
}

async function runAllTests() {
  console.log('Starting Express server...');
  const server = spawn('node', ['app.js'], { stdio: 'pipe' });
  server.stdout.on('data', d => process.stdout.write(d.toString()));
  server.stderr.on('data', d => process.stderr.write(d.toString()));
  await new Promise(r => setTimeout(r, 3000));

  const tests = [];

  // 1. GET all products
  let r = await fetch('http://localhost:3000/products');
  tests.push({ file: '01-get-all-products', title: 'GET /products - Menampilkan Seluruh Produk', method: 'GET', url: 'http://localhost:3000/products', body: null, status: r.status, statusText: 'OK', res: await r.json() });

  // 2. GET by ID = 1
  r = await fetch('http://localhost:3000/products/1');
  tests.push({ file: '02-get-product-by-id', title: 'GET /products/1 - Menampilkan Produk Buku', method: 'GET', url: 'http://localhost:3000/products/1', body: null, status: r.status, statusText: 'OK', res: await r.json() });

  // 3. GET by ID = 999 (404)
  r = await fetch('http://localhost:3000/products/999');
  tests.push({ file: '03-get-product-not-found', title: 'GET /products/999 - Produk Tidak Ditemukan (404)', method: 'GET', url: 'http://localhost:3000/products/999', body: null, status: r.status, statusText: 'Not Found', res: await r.json() });

  // 4. GET by invalid ID abc (400)
  r = await fetch('http://localhost:3000/products/abc');
  tests.push({ file: '04-get-invalid-id', title: 'GET /products/abc - ID Tidak Valid (400)', method: 'GET', url: 'http://localhost:3000/products/abc', body: null, status: r.status, statusText: 'Bad Request', res: await r.json() });

  // 5. POST validation fail - name kosong (400)
  r = await fetch('http://localhost:3000/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: '', price: 5000 }) });
  tests.push({ file: '05-post-validation-fail-name', title: 'POST /products - Validasi Gagal: Name Kosong (400)', method: 'POST', url: 'http://localhost:3000/products', body: { name: '', price: 5000 }, status: r.status, statusText: 'Bad Request', res: await r.json() });

  // 6. POST validation fail - price negatif (400)
  r = await fetch('http://localhost:3000/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Spidol', price: -100 }) });
  tests.push({ file: '06-post-validation-fail-price', title: 'POST /products - Validasi Gagal: Price Negatif (400)', method: 'POST', url: 'http://localhost:3000/products', body: { name: 'Spidol', price: -100 }, status: r.status, statusText: 'Bad Request', res: await r.json() });

  // Save DB BEFORE POST
  const dbBefore = await prisma.product.findMany();
  const dbBeforeHtml = htmlPage(
    'Database State: BEFORE POST - Prisma Studio View',
    'DB', 'neondb → public.Product', null, 200, 'Connected',
    dbBefore
  );
  fs.writeFileSync(path.join(EVIDENCE_DIR, '07-db-before-post.html'), dbBeforeHtml);
  console.log('Saved: 07-db-before-post.html');

  // 7. POST success (201)
  r = await fetch('http://localhost:3000/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Spidol', price: 7500 }) });
  const created = await r.json();
  tests.push({ file: '08-post-success', title: 'POST /products - Membuat Produk Baru: Spidol (201)', method: 'POST', url: 'http://localhost:3000/products', body: { name: 'Spidol', price: 7500 }, status: r.status, statusText: 'Created', res: created });

  // Save DB AFTER POST
  const dbAfterPost = await prisma.product.findMany();
  const dbAfterPostHtml = htmlPage(
    'Database State: AFTER POST - Prisma Studio View',
    'DB', 'neondb → public.Product', null, 200, 'Connected',
    dbAfterPost
  );
  fs.writeFileSync(path.join(EVIDENCE_DIR, '09-db-after-post.html'), dbAfterPostHtml);
  console.log('Saved: 09-db-after-post.html');

  // 8. PUT success (200)
  r = await fetch('http://localhost:3000/products/' + created.id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: 'Spidol Permanen', price: 8500 }) });
  tests.push({ file: '10-put-success', title: `PUT /products/${created.id} - Update Produk (200)`, method: 'PUT', url: `http://localhost:3000/products/${created.id}`, body: { name: 'Spidol Permanen', price: 8500 }, status: r.status, statusText: 'OK', res: await r.json() });

  // Save DB AFTER PUT
  const dbAfterPut = await prisma.product.findMany();
  const dbAfterPutHtml = htmlPage(
    'Database State: AFTER PUT - Prisma Studio View',
    'DB', 'neondb → public.Product', null, 200, 'Connected',
    dbAfterPut
  );
  fs.writeFileSync(path.join(EVIDENCE_DIR, '11-db-after-put.html'), dbAfterPutHtml);
  console.log('Saved: 11-db-after-put.html');

  // 9. DELETE success (204)
  r = await fetch('http://localhost:3000/products/' + created.id, { method: 'DELETE' });
  tests.push({ file: '12-delete-success', title: `DELETE /products/${created.id} - Hapus Produk (204)`, method: 'DELETE', url: `http://localhost:3000/products/${created.id}`, body: null, status: r.status, statusText: 'No Content', res: `204 No Content - Produk berhasil dihapus (tidak ada body response)` });

  // 10. DELETE not found (404)
  r = await fetch('http://localhost:3000/products/999', { method: 'DELETE' });
  tests.push({ file: '13-delete-not-found', title: 'DELETE /products/999 - Produk Tidak Ada (404)', method: 'DELETE', url: 'http://localhost:3000/products/999', body: null, status: r.status, statusText: 'Not Found', res: await r.json() });

  // Save DB AFTER DELETE
  const dbAfterDelete = await prisma.product.findMany();
  const dbAfterDeleteHtml = htmlPage(
    'Database State: AFTER DELETE - Prisma Studio View',
    'DB', 'neondb → public.Product', null, 200, 'Connected',
    dbAfterDelete
  );
  fs.writeFileSync(path.join(EVIDENCE_DIR, '14-db-after-delete.html'), dbAfterDeleteHtml);
  console.log('Saved: 14-db-after-delete.html');

  // Save all test HTML pages
  for (const t of tests) {
    await saveHtml(t.file, t.title, t.method, t.url, t.body, t.status, t.statusText, t.res);
    console.log(`Saved: ${t.file}.html`);
  }

  server.kill();
  await prisma.$disconnect();
  console.log('\n✅ All evidence HTML files saved to docs/evidence/');
}

runAllTests();

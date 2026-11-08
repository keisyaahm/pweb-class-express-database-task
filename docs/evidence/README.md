# Evidence Pengujian (Screenshot Asli)

Folder ini **sengaja kosong dari screenshot lama**. Screenshot yang sebelumnya
ada di folder ini bukan berasal dari Postman/Prisma Studio asli, sehingga
dihapus agar tidak menyesatkan.

Isi folder ini dengan screenshot yang kamu ambil sendiri dari aplikasi asli:

1. **Postman / Bruno / Hoppscotch** untuk semua request API.
2. **Prisma Studio** (`npx prisma studio`) untuk kondisi database sebelum dan
   sesudah POST, PUT, dan DELETE.

## Nama file yang diharapkan

| No | Aksi | Status | Nama File |
| -- | ---- | ------ | --------- |
| 01 | GET `/products` | 200 | `01-get-all-products.png` |
| 02 | GET `/products/1` | 200 | `02-get-product-by-id.png` |
| 03 | GET `/products/999` | 404 | `03-get-product-not-found.png` |
| 04 | GET `/products/abc` | 400 | `04-get-invalid-id.png` |
| 05 | POST `name` kosong | 400 | `05-post-validation-fail-name.png` |
| 06 | POST `price` negatif | 400 | `06-post-validation-fail-price.png` |
| 07 | Prisma Studio sebelum POST | 2 data | `07-db-before-post.png` |
| 08 | POST `Spidol` / 7500 | 201 | `08-post-success.png` |
| 09 | Prisma Studio setelah POST | 3 data | `09-db-after-post.png` |
| 10 | PUT `/products/:id` | 200 | `10-put-success.png` |
| 11 | Prisma Studio setelah PUT | data berubah | `11-db-after-put.png` |
| 12 | DELETE `/products/:id` | 204 | `12-delete-success.png` |
| 13 | DELETE `/products/999` | 404 | `13-delete-not-found.png` |
| 14 | Prisma Studio setelah DELETE | 2 data | `14-db-after-delete.png` |
| 15 | Restart server lalu GET `/products` | 200, data tetap ada | `15-data-persists-after-restart.png` |

## Yang harus terlihat di screenshot Postman

- Method dan URL request.
- Tab **Body** dengan mode **Pretty** dan **JSON**.
- **Status** response (contoh: `200 OK`, `201 Created`, `404 Not Found`).

Tidak perlu membuka Inspect Element atau Console browser.

## Tips urutan pengambilan evidence

1. Jalankan `npm run prisma:seed` agar data kembali ke kondisi awal.
2. Ambil screenshot Prisma Studio (07).
3. Jalankan collection Postman berurutan: GET, lalu POST (08), Prisma Studio
   (09), PUT (10), Prisma Studio (11), DELETE (12), Prisma Studio (14).
4. Untuk nomor 15: hentikan server dengan `Ctrl+C`, jalankan `npm start` lagi,
   lalu `GET /products` dan screenshot hasilnya.
5. Setelah selesai, jalankan `npm run prisma:seed` lagi jika ingin data kembali
   bersih.

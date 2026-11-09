# Evidence Pengujian (Screenshot Asli)

Semua gambar di folder ini sudah diambil langsung dari aplikasi asli yang
berjalan, bukan dari halaman web tiruan dan bukan hasil rekayasa gambar.

1. **Hoppscotch** (`https://hoppscotch.io`) untuk seluruh request dan response
   API. Hoppscotch adalah API client asli, sama seperti Postman.
2. **Prisma Studio** (`npx prisma studio`) untuk kondisi tabel `Product`
   sebelum dan sesudah POST, PUT, dan DELETE.

Server Express berjalan di `http://localhost:3000` dan terhubung ke PostgreSQL
(Neon) melalui Prisma.

Screenshot yang sama juga ditampilkan langsung di `README.md` utama, di bagian
**Evidence Screenshot**.

## Daftar file

| No | Aksi                                              | Status            | Nama File                        |
| -- | ------------------------------------------------- | ----------------- | -------------------------------- |
| 01 | GET `/products`                                   | 200               | `01-get-all-products.png`        |
| 02 | GET `/products/1`                                 | 200               | `02-get-product-by-id.png`       |
| 03 | GET `/products/999`                               | 404               | `03-get-product-not-found.png`   |
| 04 | GET `/products/abc`                               | 400               | `04-get-invalid-id.png`          |
| 05 | POST `name` kosong                                | 400               | `05-post-validation-fail-name.png` |
| 06 | POST `price` negatif                              | 400               | `06-post-validation-fail-price.png` |
| 07 | Prisma Studio sebelum POST                        | 2 data            | `07-db-before-post.png`          |
| 08 | POST `Spidol` / 7500                              | 201               | `08-post-success.png`            |
| 09 | Prisma Studio setelah POST                        | 3 data            | `09-db-after-post.png`           |
| 10 | PUT `/products/3`                                 | 200               | `10-put-success.png`             |
| 11 | Prisma Studio setelah PUT                         | data berubah      | `11-db-after-put.png`            |
| 12 | DELETE `/products/3`                              | 204               | `12-delete-success.png`          |
| 13 | DELETE `/products/999`                            | 404               | `13-delete-not-found.png`        |
| 14 | Prisma Studio setelah DELETE                      | 2 data            | `14-db-after-delete.png`         |
| 15 | Restart server lalu GET `/products`               | 200, data tetap ada | `15-data-persists-after-restart.png` |

## Yang terlihat di screenshot API

- Method dan URL request, misalnya `GET http://localhost:3000/products`.
- Untuk POST dan PUT, tab **Body** berisi JSON yang dikirim.
- **Status** response, misalnya `200 OK`, `201 Created`, `400 Bad Request`,
  `404 Not Found`, atau `204 No Content`.
- **Response Body** berisi JSON asli dari server.

## Yang terlihat di screenshot Prisma Studio

- Tabel `Product` dengan kolom `id`, `name`, dan `price`.
- Jumlah record pada tombol `Showing x of x`.
- Data berubah sesuai hasil POST, PUT, dan DELETE.

## Urutan pengambilan evidence

1. Jalankan `npm run prisma:seed` agar data kembali ke kondisi awal.
2. Ambil screenshot request 01 sampai 06.
3. Ambil screenshot Prisma Studio (07).
4. Jalankan POST (08), lalu screenshot Prisma Studio (09).
5. Jalankan PUT (10), lalu screenshot Prisma Studio (11).
6. Jalankan DELETE (12) dan DELETE ID yang tidak ada (13), lalu screenshot
   Prisma Studio (14).
7. Hentikan server dengan `Ctrl+C`, jalankan `npm start` lagi, lalu GET
   `/products` untuk screenshot 15.
8. Setelah selesai, jalankan `npm run prisma:seed` lagi jika ingin data kembali
   bersih.

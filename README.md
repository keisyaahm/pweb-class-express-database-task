# Tugas Week 9 & 10: ExpressJS + PostgreSQL + Prisma

**Nama:** Keisya Halimah Mulia
**NRP:** 5027251068
**Kelas:** Pemrograman Web C

---

## Tentang Tugas Ini

Di tugas ini saya membuat REST API produk menggunakan ExpressJS. Mulanya data
disimpan di array (`data/products.js`) untuk Week 9, lalu dipindahkan ke
PostgreSQL menggunakan Prisma ORM untuk Week 10.

Project ini **backend saja**. Tidak ada tampilan HTML/CSS/React buatan sendiri.
Semua request diuji lewat aplikasi API client asli, yaitu **Hoppscotch**, dan
isi database dilihat lewat **Prisma Studio**. Jadi tidak ada halaman web tiruan
atau screenshot hasil rekayasa.

---

## Yang Dipelajari

- **Week 9:** REST API Express dengan pemisahan route dan controller, data
  disimpan di array in-memory.
- **Week 10:** Data dipindah ke PostgreSQL lewat Prisma, ditambah validasi
  input, error handling, dan CRUD lengkap (GET, POST, PUT, DELETE).

---

## Struktur Project

```
├── app.js                         <- Entry point Express
├── controllers/
│   ├── productController.js       <- Week 9: GET & POST (array)
│   ├── productGetController.js    <- Week 10: GET (Prisma)
│   ├── productPostController.js   <- Week 10: POST (Prisma)
│   ├── productPutController.js    <- Week 10: PUT (Prisma)
│   └── productDeleteController.js <- Week 10: DELETE (Prisma)
├── data/
│   └── products.js                <- Week 9: array in-memory
├── lib/
│   └── prisma.js                  <- Prisma Client singleton
├── middlewares/
│   ├── requestLogger.js           <- Log setiap request
│   ├── validateProduct.js         <- Validasi name & price
│   ├── validateId.js              <- Validasi parameter ID
│   ├── errorHandler.js            <- Error handling terpusat
│   └── notFoundHandler.js         <- 404 untuk route yang tidak ada
├── prisma/
│   ├── schema.prisma              <- Model Product & konfigurasi database
│   ├── seed.js                    <- Data awal (Buku & Pulpen)
│   └── migrations/                <- Riwayat migrasi tabel
├── routes/
│   ├── productRoutes.js           <- Router utama
│   ├── productGetRoutes.js
│   ├── productPostRoutes.js
│   ├── productPutRoutes.js
│   └── productDeleteRoutes.js
├── postman/
│   ├── Keisya-Week10.postman_collection.json
│   └── Keisya-Week10.postman_environment.json
└── docs/
    └── evidence/                  <- Screenshot asli dari Hoppscotch & Prisma Studio
```

---

## Daftar Endpoint

| Method | Endpoint        | Status Sukses | Keterangan                        |
| ------ | --------------- | ------------- | --------------------------------- |
| GET    | `/products`     | 200           | Seluruh produk                    |
| GET    | `/products/:id` | 200           | Satu produk, 404 jika tidak ada   |
| POST   | `/products`     | 201           | Membuat produk baru               |
| PUT    | `/products/:id` | 200           | Update produk, 404 jika tidak ada |
| DELETE | `/products/:id` | 204           | Hapus produk, 404 jika tidak ada  |

Aturan validasi:

- `name` wajib string dan tidak boleh kosong.
- `price` wajib bilangan bulat dan tidak boleh negatif.
- `:id` wajib bilangan bulat positif. Kalau tidak, hasilnya `400 Bad Request`.

---

## Cara Menjalankan

```bash
# 1. Install dependencies
npm install

# 2. Salin .env.example menjadi .env, lalu isi DATABASE_URL dan DIRECT_URL

# 3. Generate Prisma Client
npx prisma generate

# 4. Terapkan migrasi ke database
npx prisma migrate deploy

# 5. Isi data awal: Buku Rp 15.000 dan Pulpen Rp 5.000
npm run prisma:seed

# 6. Jalankan server
npm start        # atau: npm run dev
```

Langkah 3 sampai 5 bisa diringkas jadi satu perintah:

```bash
npm run db:setup
```

Server berjalan di `http://localhost:3000`.

Kalau mau melihat isi database:

```bash
npx prisma studio
```

---

## Cara Menguji di Hoppscotch

1. Jalankan server dulu (`npm start`).
2. Buka `https://hoppscotch.io`.
3. Pilih method (GET, POST, PUT, atau DELETE), lalu isi URL, misalnya
   `http://localhost:3000/products`.
4. Untuk POST dan PUT, buka tab **Body**, pilih content type
   `application/json`, lalu isi JSON-nya.
5. Klik **Send**.
6. Status dan **Response Body** muncul di panel bawah.

Screenshot di folder `docs/evidence/` diambil dengan cara ini, jadi yang
terlihat memang request dan response asli dari server Express.

## Cara Menguji di Postman

1. Jalankan server dulu (`npm start`).
2. Buka **Postman**, klik **Import**, lalu pilih
   `postman/Keisya-Week10.postman_collection.json`.
3. Opsional: import juga `postman/Keisya-Week10.postman_environment.json`,
   lalu pilih environment **Keisya Week 10 - Local**.
4. Buka collection **Keisya Week 10 - Product API**.
5. Klik salah satu request, lalu klik **Send**.

Catatan:

- Request **08 - POST buat produk** menyimpan ID produk baru ke variable
  `createdProductId`. Jadi request PUT, GET, dan DELETE setelahnya memakai
  produk yang baru dibuat, bukan produk seed.
- Request **02 - GET produk by ID** memakai variable `productId` (default `1`),
  jadi produk seed tidak ikut berubah.
- Kalau collection dijalankan berurutan lewat Collection Runner, semua request
  jalan tanpa perlu mengganti ID manual.

---

## Evidence Screenshot

### 01. GET `/products` - 200 OK

Menampilkan seluruh produk yang ada di database, yaitu Buku dan Pulpen.

![01 - GET semua produk](docs/evidence/01-get-all-products.png)

### 02. GET `/products/1` - 200 OK

Mengambil satu produk dengan id 1.

![02 - GET produk by ID](docs/evidence/02-get-product-by-id.png)

### 03. GET `/products/999` - 404 Not Found

Produk dengan id 999 tidak ada, jadi server membalas 404.

![03 - GET produk tidak ditemukan](docs/evidence/03-get-product-not-found.png)

### 04. GET `/products/abc` - 400 Bad Request

ID harus bilangan bulat. Karena `abc` bukan angka, server membalas 400.

![04 - GET ID tidak valid](docs/evidence/04-get-invalid-id.png)

### 05. POST dengan `name` kosong - 400 Bad Request

Validasi menolak request karena `name` kosong.

![05 - POST validasi name gagal](docs/evidence/05-post-validation-fail-name.png)

### 06. POST dengan `price` negatif - 400 Bad Request

Validasi menolak request karena `price` negatif.

![06 - POST validasi price gagal](docs/evidence/06-post-validation-fail-price.png)

### 07. Prisma Studio sebelum POST - 2 data

Isi tabel `Product` masih berisi data awal: Buku dan Pulpen.

![07 - Database sebelum POST](docs/evidence/07-db-before-post.png)

### 08. POST `{"name":"Spidol","price":7500}` - 201 Created

Produk baru berhasil dibuat dengan id 3.

![08 - POST berhasil](docs/evidence/08-post-success.png)

### 09. Prisma Studio setelah POST - 3 data

Produk Spidol sudah masuk ke tabel.

![09 - Database setelah POST](docs/evidence/09-db-after-post.png)

### 10. PUT `/products/3` - 200 OK

Produk id 3 diubah menjadi Spidol Snowman dengan harga 15000.

![10 - PUT berhasil](docs/evidence/10-put-success.png)

### 11. Prisma Studio setelah PUT - data berubah

Data Spidol sudah berubah sesuai hasil PUT.

![11 - Database setelah PUT](docs/evidence/11-db-after-put.png)

### 12. DELETE `/products/3` - 204 No Content

Produk id 3 berhasil dihapus.

![12 - DELETE berhasil](docs/evidence/12-delete-success.png)

### 13. DELETE `/products/999` - 404 Not Found

Menghapus produk yang tidak ada menghasilkan 404.

![13 - DELETE produk tidak ditemukan](docs/evidence/13-delete-not-found.png)

### 14. Prisma Studio setelah DELETE - kembali 2 data

Tabel kembali berisi 2 data, yaitu Buku dan Pulpen.

![14 - Database setelah DELETE](docs/evidence/14-db-after-delete.png)

### 15. GET `/products` setelah server restart - 200 OK

Server dihentikan dengan Ctrl+C lalu dijalankan lagi. Datanya tetap ada,
artinya data benar-benar tersimpan di PostgreSQL.

![15 - Data tetap ada setelah restart](docs/evidence/15-data-persists-after-restart.png)

---

## Hasil Pengujian

Pengujian di bawah ini saya lakukan langsung ke server Express yang terhubung
ke PostgreSQL, bukan simulasi.

| Skenario                     | Hasil            |
| ---------------------------- | ---------------- |
| GET `/products`              | `200 OK`         |
| GET `/products/1`            | `200 OK`         |
| GET `/products/999`          | `404 Not Found`  |
| GET `/products/abc`          | `400 Bad Request`|
| POST `name` kosong           | `400 Bad Request`|
| POST `price` negatif         | `400 Bad Request`|
| POST `price` desimal         | `400 Bad Request`|
| POST data valid              | `201 Created`    |
| PUT data valid               | `200 OK`         |
| GET produk hasil update      | `200 OK`         |
| DELETE data valid            | `204 No Content` |
| GET produk yang sudah dihapus| `404 Not Found`  |
| DELETE ID tidak ada          | `404 Not Found`  |
| GET endpoint tidak ada       | `404 Not Found`  |

---

## Catatan

- Data awal Week 9 (Buku Rp 15.000 dan Pulpen Rp 5.000) tersimpan permanen di
  PostgreSQL.
- Restart server tidak menghapus data. Ini buktinya migrasi dari array ke
  database persisten berhasil.
- File `.env` tidak di-commit karena berisi credential database.
- Kalau mau mengembalikan data ke kondisi awal, jalankan `npm run prisma:seed`.

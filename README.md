# Tugas Week 10 - ExpressJS x PostgreSQL x Prisma

**Nama:** Keisya Halimah Mulia
**NRP:** 5027251068
**Kelas:** Pemrograman Web C

---

## Deskripsi

Lanjutan tugas week 9. Data produk tidak lagi disimpan di array memori, tetapi
disimpan permanen di PostgreSQL melalui Prisma ORM. Project tetap memisahkan
**route** dan **controller**, dengan tambahan **middleware** untuk validasi,
logging, dan penanganan error.

Fitur yang tersedia:

- `GET /products` - menampilkan seluruh data
- `GET /products/:id` - menampilkan satu data berdasarkan ID
- `POST /products` - membuat data baru
- `PUT /products/:id` - mengupdate data berdasarkan ID
- `DELETE /products/:id` - menghapus data berdasarkan ID

## Struktur Project

```
keisya-tugas-database-express-week10/
├── app.js
├── controllers/
│   ├── productGetController.js
│   ├── productPostController.js
│   ├── productPutController.js
│   └── productDeleteController.js
├── lib/
│   └── prisma.js
├── middlewares/
│   ├── errorHandler.js
│   ├── notFoundHandler.js
│   ├── requestLogger.js
│   ├── validateId.js
│   └── validateProduct.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│       ├── migration_lock.toml
│       └── 20261104000000_init/
│           └── migration.sql
├── routes/
│   ├── productRoutes.js
│   ├── productGetRoutes.js
│   ├── productPostRoutes.js
│   ├── productPutRoutes.js
│   └── productDeleteRoutes.js
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Yang Perlu Di-install

1. **Node.js** (versi 18 ke atas) - https://nodejs.org
2. **Neon PostgreSQL** - https://neon.tech
   - PostgreSQL lokal tidak wajib karena database tersedia online melalui Neon.
3. **Postman** / **Bruno** / **Hoppscotch** untuk menguji endpoint dan mengambil screenshot.
4. **Git** dan akun **GitHub** untuk mengumpulkan repository.
5. **VS Code** (opsional) untuk mengedit kode.

## Menyiapkan Database

1. Salin `.env.example` menjadi `.env`.
2. Ganti `YOUR_NEON_PASSWORD` dengan password Neon asli. Jangan commit file `.env`.
   ```
   DATABASE_URL=""
   DIRECT_URL=""
   PORT=3000
   ```

## Menjalankan Project

```bash
npm install
npx prisma generate
npx prisma migrate deploy
npm start
```

Server berjalan di `http://localhost:3000`.

Untuk development, perintah `npm run prisma:migrate` dapat dipakai saat ada
perubahan schema. Folder migration wajib ikut di-commit ke Git (tanpa `.env`).

## Melihat Isi Database

```bash
npm run prisma:studio
```

Buka alamat yang ditampilkan Prisma Studio (default `http://localhost:5555`).
Gunakan Studio untuk screenshot kondisi database **before** dan **after** POST,
PUT, dan DELETE.

## Koleksi Postman

Import file `postman/Keisya-Week10.postman_collection.json` ke Postman. Koleksi
sudah memuat skenario sukses dan error. Sesuaikan variable `productId` dengan ID
hasil POST sebelum menguji GET/PUT/DELETE berdasarkan ID.

## Daftar Endpoint

| Method | Endpoint        | Status Sukses | Keterangan                          |
| ------ | --------------- | ------------- | ----------------------------------- |
| GET    | `/products`     | 200           | Array semua produk                  |
| GET    | `/products/:id` | 200           | Satu produk; 404 jika tidak ada     |
| POST   | `/products`     | 201           | Membuat produk baru                 |
| PUT    | `/products/:id` | 200           | Mengupdate produk; 404 jika tidak ada |
| DELETE | `/products/:id` | 204           | Menghapus produk; 404 jika tidak ada |

### Validasi

- `name` wajib string dan tidak boleh kosong.
- `price` wajib bilangan bulat non-negatif (rupiah bulat).
- `id` pada path wajib bilangan bulat positif.
- Input tidak valid menghasilkan `400 Bad Request`.
- Body JSON rusak menghasilkan `400 Bad Request`.
- ID yang tidak ada pada PUT/DELETE menghasilkan `404 Not Found`.

## Contoh Request

### GET semua produk

```bash
curl -i http://localhost:3000/products
```

### POST produk baru

```bash
curl -i -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Buku\",\"price\":15000}"
```

### GET produk berdasarkan ID

```bash
curl -i http://localhost:3000/products/1
```

### PUT update produk

```bash
curl -i -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Buku Tulis\",\"price\":17500}"
```

### DELETE produk

```bash
curl -i -X DELETE http://localhost:3000/products/1
```

## Checklist Evidence Laporan

Ambil screenshot dari Postman/Bruno/Hoppscotch dan Prisma Studio untuk:

1. **Success GET all** - status 200 dan array produk.
2. **Success POST #1** - status 201, perhatikan ID dari database.
3. **Success POST #2** - status 201 dengan ID berbeda.
4. **Success GET by ID** - status 200 dan data sesuai.
5. **Success PUT** - status 200 dan data berubah.
6. **Success DELETE** - status 204, lalu GET list membuktikan data hilang.
7. **Validasi gagal** - `name` kosong / `price` negatif / `price` bukan angka -> 400.
8. **ID tidak ditemukan** - GET/PUT/DELETE `/products/999` -> 404.
9. **ID tidak valid** - `/products/abc` -> 400.
10. **Database before - after** - screenshot Prisma Studio sebelum dan sesudah
    POST/PUT/DELETE.
11. **Persistensi** - lakukan POST, restart server Express, lalu GET kembali;
    produk harus tetap ada. Ini membuktikan data tersimpan di PostgreSQL, bukan array.

## Catatan Migration dan Rollback

- `prisma migrate dev` mencatat perubahan struktur ke folder `prisma/migrations`.
- Perubahan schema saja tidak mengubah tabel database sebelum migration dijalankan.
- Rollback dilakukan dengan membuat migration baru yang membalik perubahan,
  bukan menghapus riwayat migration yang sudah diterapkan.
- `prisma migrate reset` menghapus data dan bukan cara rollback satu migration.

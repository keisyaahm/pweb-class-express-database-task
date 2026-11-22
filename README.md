# Backend: ExpressJS REST API, Prisma ORM, dan PostgreSQL

**Nama:** Keisya Halimah Mulia  
**NRP:** 5027251068  
**Kelas:** Pemrograman Web C

---

## Deskripsi Proyek

Repository ini berisi REST API backend untuk aplikasi Manajemen Produk. Proyek ini dibangun menggunakan ExpressJS, Prisma ORM, dan database PostgreSQL (Neon).

Pada Tugas 4, backend ini dikembangkan sebagai sumber data utama yang terhubung langsung dengan frontend React pada repository [pweb-class-react-tailwind-task](https://github.com/keisyaahm/pweb-class-react-tailwind-task).

---

## Fitur dan Kemampuan Backend

1. **Operasi CRUD Lengkap**:
   - `GET /products`: Mengambil seluruh daftar produk.
   - `GET /products/:id`: Mengambil detail satu produk berdasarkan ID.
   - `POST /products`: Menambahkan produk baru dengan validasi data.
   - `PUT /products/:id`: Memperbarui data produk berdasarkan ID.
   - `DELETE /products/:id`: Menghapus produk dari database.
   - `POST /products/reset`: Mengembalikan data produk ke seeder awal.

2. **Integrasi Database PostgreSQL**:
   - Menggunakan Prisma ORM untuk pemodelan data, migrasi skema, dan query database.
   - Skema produk mencakup: `id`, `name`, `category`, `price`, `stock`, `sku`, `description`, dan `createdAt`.
   - Data tersimpan persisten di cloud PostgreSQL (Neon).

3. **Dukungan Integrasi Frontend (Tugas 4)**:
   - Konfigurasi CORS aktif untuk komunikasi dengan frontend Vite React (`http://localhost:5173` dan `http://localhost:4173`).
   - Validasi data input dan penanganan error terpusat (middleware error handler).

---

## Struktur Folder

```text
├── app.js                         # Entry point server Express & konfigurasi CORS
├── controllers/                   # Logika penanganan request CRUD
│   ├── productGetController.js    # Handler GET all & by ID
│   ├── productPostController.js   # Handler POST produk & reset data
│   ├── productPutController.js    # Handler PUT update produk
│   └── productDeleteController.js # Handler DELETE produk
├── data/
│   └── initialProducts.js         # Dataset seeder awal inventaris
├── lib/
│   ├── prisma.js                  # Instance Prisma Client singleton
│   └── productPayload.js          # Helper normalisasi payload request
├── middlewares/                   # Middleware logger, validator, dan error handler
├── prisma/
│   ├── schema.prisma              # Skema model data Prisma & konfigurasi database
│   ├── seed.js                    # Script pengisian data seeder awal
│   └── migrations/                # Riwayat file migrasi SQL
├── routes/                        # Definisi rute modular Express
├── postman/                       # File Postman collection & environment
└── docs/
    └── evidence/                  # Dokumentasi bukti tangkapan layar pengujian
```

---

## Daftar Endpoint REST API

| Method | Endpoint | Status Sukses | Keterangan |
| --- | --- | --- | --- |
| GET | `/products` | 200 OK | Mengambil seluruh data produk |
| GET | `/products/:id` | 200 OK | Mengambil data produk berdasarkan ID |
| POST | `/products` | 201 Created | Menambahkan produk baru |
| PUT | `/products/:id` | 200 OK | Memperbarui data produk yang ada |
| DELETE | `/products/:id` | 204 No Content | Menghapus produk dari database |
| POST | `/products/reset` | 200 OK | Reset data inventaris ke seeder awal |

---

## Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi Environment Variable
Salin berkas `.env.example` menjadi `.env` lalu sesuaikan URL koneksi database:
```env
DATABASE_URL="postgresql://user:password@host/neondb?sslmode=require"
DIRECT_URL="postgresql://user:password@host/neondb?sslmode=require"
PORT=3000
```

### 3. Setup Database (Generate, Migrate, Seed)
```bash
npm run db:setup
```
*Perintah di atas otomatis menjalankan `prisma generate`, `prisma migrate deploy`, dan `prisma/seed.js`.*

### 4. Jalankan Server
```bash
npm start
```
Server akan aktif di `http://localhost:3000`.

Untuk memeriksa data langsung melalui GUI Prisma:
```bash
npx prisma studio
```

---

## Bukti Pengujian Backend

Seluruh pengujian endpoint dan database telah diverifikasi. Klik tautan pada kolom **Bukti** untuk melihat tangkapan layar pengujian:

| No | Skenario Pengujian | Status / Hasil | Bukti Screenshot |
| :--: | --- | --- | --- |
| 01 | GET `/products` | 200 OK | [01-get-all-products.png](docs/evidence/01-get-all-products.png) |
| 02 | GET `/products/1` | 200 OK | [02-get-product-by-id.png](docs/evidence/02-get-product-by-id.png) |
| 03 | GET `/products/999` (ID tidak ada) | 404 Not Found | [03-get-product-not-found.png](docs/evidence/03-get-product-not-found.png) |
| 04 | GET `/products/abc` (ID non-numerik) | 400 Bad Request | [04-get-invalid-id.png](docs/evidence/04-get-invalid-id.png) |
| 05 | POST dengan nama produk kosong | 400 Bad Request | [05-post-validation-fail-name.png](docs/evidence/05-post-validation-fail-name.png) |
| 06 | POST dengan harga negatif | 400 Bad Request | [06-post-validation-fail-price.png](docs/evidence/06-post-validation-fail-price.png) |
| 07 | Prisma Studio sebelum penambahan data | 2 data awal | [07-db-before-post.png](docs/evidence/07-db-before-post.png) |
| 08 | POST data produk valid | 201 Created | [08-post-success.png](docs/evidence/08-post-success.png) |
| 09 | Prisma Studio setelah data berhasil dibuat | 3 data tersimpan | [09-db-after-post.png](docs/evidence/09-db-after-post.png) |
| 10 | PUT pembaruan data produk | 200 OK | [10-put-success.png](docs/evidence/10-put-success.png) |
| 11 | Prisma Studio setelah data diperbarui | Data berubah di DB | [11-db-after-put.png](docs/evidence/11-db-after-put.png) |
| 12 | DELETE produk berdasarkan ID | 204 No Content | [12-delete-success.png](docs/evidence/12-delete-success.png) |
| 13 | DELETE produk ID tidak ada | 404 Not Found | [13-delete-not-found.png](docs/evidence/13-delete-not-found.png) |
| 14 | Prisma Studio setelah produk dihapus | Kembali 2 data | [14-db-after-delete.png](docs/evidence/14-db-after-delete.png) |
| 15 | GET `/products` setelah restart server | Data tetap bertahan | [15-data-persists-after-restart.png](docs/evidence/15-data-persists-after-restart.png) |

---

## Verifikasi Pengujian

| Skenario | Hasil |
| --- | --- |
| GET seluruh produk | `200 OK` |
| GET produk spesifik | `200 OK` |
| Validasi data input (nama, harga) | `400 Bad Request` |
| Penambahan data baru (POST) | `201 Created` |
| Pembaruan data (PUT) | `200 OK` |
| Penghapusan data (DELETE) | `204 No Content` |
| Akses data tidak ditemukan | `404 Not Found` |
| Persistensi restart server | Data tetap tersimpan di PostgreSQL |

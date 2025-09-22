# On Board Documents Module

Modul ini menangani manajemen dokumen onboarding untuk kandidat.

## Struktur Database

Tabel `on_board_documents` memiliki struktur sebagai berikut:

```sql
CREATE TABLE public.on_board_documents (
    on_board_documents_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    candidate_id uuid NOT NULL,
    on_board_documents_name varchar(255) NULL,
    on_board_documents_file varchar(500) NOT NULL,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    create_by varchar(255) NULL,
    update_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_by varchar(255) NULL,
    delete_at timestamp NULL,
    delete_by varchar(255) NULL,
    CONSTRAINT "PK_e219bb7c715a9e094ea667720b0" PRIMARY KEY (on_board_documents_id),
    CONSTRAINT "FK_80ade96d703682f6c44ce9c9130" FOREIGN KEY (candidate_id) REFERENCES public.candidates(candidate_id) ON DELETE CASCADE
);
```

## Endpoints

### 1. GET Data dengan POST Method
**POST** `/api/on-board-documents/get`

Mengambil data on board documents dengan filtering, pagination, dan sorting menggunakan method POST.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "kata kunci pencarian",
  "sort_by": "create_at",
  "sort_order": "desc",
  "candidate_id": "uuid-candidate",
  "on_board_documents_name": "on-board-documents-name"
}
```

### 2. Create Data
**POST** `/api/on-board-documents`

Membuat data on board document baru.

**Request Body (multipart/form-data):**
```json
{
  "candidate_id": "uuid-candidate",
  "on_board_documents_name": "on-board-documents-name",
  "on_board_documents_file": "file-upload"
}
```

### 3. Get Data by ID
**GET** `/api/on-board-documents/{id}`

Mengambil data on board document berdasarkan ID.

**Parameters:**
- `id` (path): UUID on board document

### 4. Update Data
**PUT** `/api/on-board-documents/{id}`

Memperbarui data on board document.

**Request Body (multipart/form-data):**
```json
{
  "on_board_documents_name": "on-board-documents-name",
  "on_board_documents_file": "file-upload"
}
```

### 5. Delete Data
**DELETE** `/api/on-board-documents/{id}`

Menghapus data on board document (soft delete).

**Parameters:**
- `id` (path): UUID on board document

### 6. Restore Data
**POST** `/api/on-board-documents/{id}/restore`

Mengembalikan data on board document yang telah dihapus.

### 7. Get Data with Relations
**GET** `/api/on-board-documents/{id}/relations`

Mengambil data on board document beserta relasi (candidate, company, department, title).

### 8. Get Data by Candidate
**GET** `/api/on-board-documents/candidate/{candidateId}`

Mengambil semua on board documents untuk kandidat tertentu.

## File Upload

Modul ini mendukung upload file dengan tipe:
- Images: jpg, jpeg, png, gif, webp
- Documents: pdf, doc, docx, txt, xls, xlsx

Ukuran maksimal file: 10MB

## Validasi

- `candidate_id`: Required, harus berupa UUID yang valid
- `on_board_documents_name`: Optional, maksimal 255 karakter
- `on_board_documents_file`: Required untuk create, optional untuk update

## Response Format

Semua endpoint mengembalikan response dalam format:

```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

Untuk list data dengan pagination:

```json
{
  "success": true,
  "message": "Success message",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Error Handling

- 400: Validation error
- 401: Unauthorized
- 404: Data not found
- 500: Internal server error

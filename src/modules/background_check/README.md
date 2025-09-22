# Background Check Module

Modul ini menangani operasi CRUD untuk data background check kandidat.

## Struktur Database

Tabel `background_check` memiliki struktur sebagai berikut:

```sql
CREATE TABLE public.background_check (
    background_check_id uuid DEFAULT uuid_generate_v4() NOT NULL,
    candidate_id uuid NOT NULL,
    background_check_note text NULL,
    create_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    create_by varchar(255) NULL,
    update_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_by varchar(255) NULL,
    delete_at timestamp NULL,
    delete_by varchar(255) NULL,
    file_attachment varchar(500) NULL,
    background_check_status varchar(255) NULL,
    CONSTRAINT "PK_6d3bb83e845f904ebe9415631ff" PRIMARY KEY (background_check_id),
    CONSTRAINT "FK_94aaf5201e68f6772c44edddbe0" FOREIGN KEY (candidate_id) REFERENCES public.candidates(candidate_id) ON DELETE CASCADE
);
```

## Endpoints

### 1. GET Data dengan POST Method
**POST** `/api/background-checks/get`

Request body:
```json
{
  "page": 1,
  "limit": 10,
  "search": "kata kunci pencarian",
  "sort_by": "create_at",
  "sort_order": "desc",
  "candidate_id": "uuid-candidate",
  "background_check_status": "background-check-status"
}
```

### 2. Create Data
**POST** `/api/background-checks`

Request body (multipart/form-data):
```json
{
  "candidate_id": "uuid-candidate",
  "background_check_status": "background-check-status",
  "background_check_note": "background-check-note",
  "file_attachment": "file-attachment"
}
```

### 3. Update Data
**PUT** `/api/background-checks/:id`

Request body (multipart/form-data):
```json
{
  "background_check_status": "background-check-status",
  "background_check_note": "background-check-note",
  "file_attachment": "file-attachment"
}
```

### 4. Delete Data
**DELETE** `/api/background-checks/:id`

### 5. Get Data by ID
**GET** `/api/background-checks/:id`

### 6. Get Data with Relations
**GET** `/api/background-checks/:id/relations`

### 7. Get Data by Candidate
**GET** `/api/background-checks/candidate/:candidateId`

### 8. Restore Data
**POST** `/api/background-checks/:id/restore`

## File Upload

Modul ini mendukung upload file attachment dengan tipe file yang diizinkan:
- Images: jpg, jpeg, png, gif, webp
- Documents: pdf, doc, docx, txt, xls, xlsx

Ukuran maksimal file: 10MB

## Validasi

- `candidate_id`: Required, harus berupa UUID yang valid
- `background_check_status`: Optional, maksimal 255 karakter
- `background_check_note`: Optional, maksimal 2000 karakter
- `file_attachment`: Optional, harus berupa file yang diizinkan

## Response Format

Semua response mengikuti format standar:

```json
{
  "success": true,
  "message": "Success message",
  "data": {
    // Data object
  }
}
```

Untuk list data dengan pagination:

```json
{
  "success": true,
  "message": "Success message",
  "data": [
    // Array of data objects
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Error Handling

Error response format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "field_name",
      "message": "Error message"
    }
  ]
}
```

## Authentication

Semua endpoint memerlukan authentication token (Bearer Token) di header:

```
Authorization: Bearer <token>
```

## Soft Delete

Modul ini menggunakan soft delete, data tidak dihapus secara permanen dari database melainkan hanya ditandai dengan `delete_at` timestamp.

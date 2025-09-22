# Interview Module

Module ini mengelola data interview yang sudah dilakukan berdasarkan schedule interview. Setiap interview memiliki company value yang dinilai dan dapat memiliki detail berupa pertanyaan, jawaban, dan score.

## Database Schema

### Tabel `interview`
- `interview_id` (UUID, Primary Key)
- `schedule_interview_id` (UUID, Foreign Key ke `schedule_interview`)
- `company_value` (VARCHAR, required) - Nilai perusahaan yang dinilai
- `comment` (TEXT, nullable) - Komentar interview
- `employee_id` (UUID, nullable, Foreign Key ke `employees`) - Interviewer
- Standard audit fields (create_at, create_by, update_at, update_by, delete_at, delete_by, is_delete)

### Tabel `detail_interview`
- `detail_interview_id` (UUID, Primary Key)
- `interview_id` (UUID, Foreign Key ke `interview`)
- `aspect` (VARCHAR, nullable) - Aspek yang dinilai
- `question` (TEXT, nullable) - Pertanyaan interview
- `answer` (TEXT, nullable) - Jawaban kandidat
- `score` (INTEGER, default 0) - Score penilaian (0-100)
- Standard audit fields (create_at, create_by, update_at, update_by, delete_at, delete_by, is_delete)

## API Endpoints

### POST /api/interviews/get
Mengambil daftar interview dengan pagination dan filter menggunakan method POST.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "kata kunci pencarian",
  "sort_by": "create_at",
  "sort_order": "desc",
  "schedule_interview_id": "uuid-schedule-interview",
  "employee_id": "uuid-employee",
  "company_value": "company-value"
}
```

### GET /api/interviews/:id
Mengambil data interview berdasarkan ID dengan detail lengkap.

**Path Parameters:**
- `id` (UUID) - Interview ID

### POST /api/interviews
Membuat interview baru.

**Request Body:**
```json
{
  "schedule_interview_id": "123e4567-e89b-12d3-a456-426614174000",
  "company_value": "Integrity",
  "aspect": "Leadership",
  "question": "Bagaimana Anda menangani konflik dalam tim?",
  "answer": "Saya selalu mencoba mendengarkan semua pihak dan mencari solusi yang adil.",
  "score": 85,
  "comment": "Kandidat menunjukkan kemampuan leadership yang baik.",
  "employee_id": "123e4567-e89b-12d3-a456-426614174001"
}
```

### PUT /api/interviews/:id
Update interview berdasarkan ID.

**Path Parameters:**
- `id` (UUID) - Interview ID

**Request Body:** (semua field optional)
```json
{
  "schedule_interview_id": "123e4567-e89b-12d3-a456-426614174000",
  "company_value": "Integrity",
  "aspect": "Leadership",
  "question": "Bagaimana Anda menangani konflik dalam tim?",
  "answer": "Saya selalu mencoba mendengarkan semua pihak dan mencari solusi yang adil.",
  "score": 85,
  "comment": "Kandidat menunjukkan kemampuan leadership yang baik.",
  "employee_id": "123e4567-e89b-12d3-a456-426614174001"
}
```

### DELETE /api/interviews/:id
Soft delete interview berdasarkan ID.

**Path Parameters:**
- `id` (UUID) - Interview ID

### PUT /api/interviews/:id/restore
Restore interview yang sudah di-soft delete.

**Path Parameters:**
- `id` (UUID) - Interview ID

## Fitur Utama

1. **CRUD Operations**: Create, Read, Update, Delete interview
2. **Soft Delete**: Data tidak benar-benar dihapus, hanya ditandai
3. **Pagination**: Support untuk pagination pada list data
4. **Search & Filter**: Pencarian dan filter berdasarkan berbagai field
5. **Sorting**: Pengurutan data berdasarkan field tertentu
6. **Validation**: Validasi input menggunakan express-validator
7. **Relational Data**: Mengambil data relasi dari schedule_interview, employees, dan candidates
8. **Detail Interview**: Support untuk detail pertanyaan, jawaban, dan score

## Validasi

### Create Interview
- `schedule_interview_id`: Required, harus UUID valid
- `company_value`: Required, maksimal 255 karakter
- `comment`: Optional
- `employee_id`: Optional, harus UUID valid jika diisi
- `aspect`: Optional, maksimal 255 karakter
- `question`: Optional
- `answer`: Optional
- `score`: Optional, integer 0-100

### Update Interview
- `id` (path param): Required, harus UUID valid
- Semua field body optional dengan validasi yang sama seperti create

### Get Interview
- `id` (path param): Required, harus UUID valid

### List Interviews
- `page`: Optional, integer >= 1
- `limit`: Optional, integer 1-100
- `search`: Optional, maksimal 100 karakter
- `sort_by`: Optional, enum: company_value, create_at, update_at, schedule_interview_date
- `sort_order`: Optional, enum: asc, desc
- Filter fields: schedule_interview_id, employee_id, company_value

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Message",
  "data": {...}
}
```

### List Response
```json
{
  "success": true,
  "message": "Message",
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPrevPage": false,
    "nextPage": 2,
    "prevPage": null
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [
    {
      "field": "field_name",
      "message": "Error description"
    }
  ]
}
```

## Relasi Data

Interview module memiliki relasi dengan:
- **schedule_interview**: Mengambil data jadwal interview, kandidat
- **employees**: Mengambil data interviewer
- **candidates**: Mengambil data kandidat melalui schedule_interview

## Autentikasi

Semua endpoint memerlukan Bearer token di header:
```
Authorization: Bearer <your-jwt-token>
```

## Swagger Documentation

Dokumentasi lengkap tersedia di Swagger UI dengan schema dan contoh request/response yang detail.

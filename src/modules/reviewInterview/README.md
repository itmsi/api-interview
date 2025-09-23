# Review Interview Module

Module ini mengelola data review interview untuk menampilkan daftar kandidat yang telah melakukan interview dengan informasi terkait perusahaan dan posisi mereka.

## Database Schema

Module ini menggunakan relasi antara tabel:
- `candidates` → `schedule_interview` (melalui candidate_id)
- `schedule_interview` → `interview` (melalui schedule_interview_id)
- `candidates` → `companies` (melalui company_id)
- `candidates` → `titles` (melalui title_id)
- `candidates` → `departments` (melalui departement_id)

## API Endpoints

### POST /api/reviewInterview
Mengambil data review interview dengan pagination dan filter menggunakan method POST.

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "kata kunci pencarian",
  "sort_by": "create_at",
  "sort_order": "desc",
  "interview_id": "uuid-interview"
}
```

**Request Parameters:**
- `page` (optional, integer, min: 1) - Nomor halaman untuk pagination
- `limit` (optional, integer, min: 1, max: 100) - Jumlah data per halaman
- `search` (optional, string, max: 255) - Kata kunci pencarian
- `sort_by` (optional, enum) - Field untuk sorting: `candidate_name`, `candidate_email`, `company_name`, `title_name`, `create_at`
- `sort_order` (optional, enum) - Urutan sorting: `asc` atau `desc`
- `interview_id` (optional, UUID) - Filter berdasarkan interview ID
- `candidate_id` (optional, UUID) - Filter berdasarkan candidate ID
- `company_id` (optional, UUID) - Filter berdasarkan company ID
- `title_id` (optional, UUID) - Filter berdasarkan title ID
- `departement_id` (optional, UUID) - Filter berdasarkan department ID

**Response:**
```json
{
  "statusCode": 200,
  "message": "Dashboard data retrieved successfully",
  "data": {
    "recent_candidates": [
      {
        "id": "29f922d6-d732-448b-8a2d-eefafa75d1ef",
        "name": "Nidya Agesthi",
        "email": "nidya.agesthi@yahoo.co.id",
        "position": "Performance & Reward Manager",
        "company": "PT Motor Sights International",
        "image": null,
        "date_applied": "2025-09-11T04:17:44.261Z"
      }
    ]
  }
}
```

**Response Fields:**
- `id` - Candidate ID
- `name` - Nama kandidat
- `email` - Email kandidat
- `position` - Posisi/jabatan kandidat
- `company` - Nama perusahaan
- `image` - URL foto kandidat (nullable)
- `date_applied` - Tanggal aplikasi kandidat

## Features

- **Pagination**: Mendukung pagination dengan page dan limit
- **Search**: Pencarian berdasarkan nama kandidat, email, nama perusahaan, atau posisi
- **Sorting**: Sorting berdasarkan berbagai field dengan urutan asc/desc
- **Filtering**: Filter berdasarkan interview_id, candidate_id, company_id, title_id, atau departement_id
- **Validation**: Validasi input request dengan express-validator
- **Error Handling**: Penanganan error yang komprehensif

## Authentication

Endpoint ini memerlukan authentication token yang valid melalui header `Authorization: Bearer <token>`.

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "limit",
      "message": "Limit must be between 1 and 100"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized access"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Failed to get review interview data"
}
```

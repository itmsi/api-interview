# Notes Module

Module untuk mengelola data notes dalam sistem Interview Management.

## Fitur

- ✅ **CRUD Operations**: Create, Read, Update, Delete notes
- ✅ **Soft Delete**: Penghapusan data dengan soft delete
- ✅ **Pagination & Filtering**: Pagination dengan filter berdasarkan candidate_id dan employee_id
- ✅ **Search**: Pencarian berdasarkan content notes
- ✅ **Sorting**: Sorting berdasarkan create_at, update_at, atau notes
- ✅ **JWT Authentication**: Proteksi endpoint dengan JWT
- ✅ **Validation**: Validasi input yang komprehensif
- ✅ **UUID Support**: Semua ID menggunakan UUID
- ✅ **Foreign Key Relations**: Relasi dengan tabel candidates dan employees

## Database Schema

### Tabel: notes

| Column | Type | Description |
|--------|------|-------------|
| note_id | uuid | Primary key (auto-generated) |
| candidate_id | uuid | ID kandidat (required, FK ke candidates) |
| notes | text | Content notes (required) |
| employee_id | uuid | ID employee (optional, FK ke employees) |
| create_at | timestamp | Waktu dibuat |
| create_by | varchar | User yang membuat |
| update_at | timestamp | Waktu diupdate |
| update_by | varchar | User yang mengupdate |
| delete_at | timestamp | Waktu dihapus |
| delete_by | varchar | User yang menghapus |
| is_delete | boolean | Flag soft delete |
| create_role | varchar | Role user yang membuat |

### Foreign Key Constraints
- `candidate_id` → `candidates.candidate_id` (CASCADE DELETE)
- `employee_id` → `employees.employee_id`

## API Endpoints

### Authentication Required
Semua endpoint memerlukan JWT token di header `Authorization: Bearer <token>`

- `POST /api/notes/get` - Get notes dengan pagination (POST method)
- `POST /api/notes` - Buat note baru
- `GET /api/notes/:id` - Detail note
- `PUT /api/notes/:id` - Update note
- `DELETE /api/notes/delete` - Hapus note (soft delete)

## Query Parameters

### POST /api/notes/get
Body parameters:
- `page` (number): Halaman (default: 1)
- `limit` (number): Jumlah data per halaman (default: 10, max: 100)
- `search` (string): Pencarian berdasarkan content notes
- `sort_by` (string): Field untuk sorting (create_at, update_at, notes)
- `sort_order` (string): Urutan sorting (asc, desc)
- `candidate_id` (uuid): Filter berdasarkan candidate ID
- `employee_id` (uuid): Filter berdasarkan employee ID

## Request/Response Examples

### Create Note
```http
POST /api/notes
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "candidate_id": "550e8400-e29b-41d4-a716-446655440001",
  "employee_id": "550e8400-e29b-41d4-a716-446655440002",
  "notes": "Kandidat menunjukkan performa yang baik dalam interview teknikal"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note created successfully",
  "data": {
    "note_id": "550e8400-e29b-41d4-a716-446655440003",
    "candidate_id": "550e8400-e29b-41d4-a716-446655440001",
    "employee_id": "550e8400-e29b-41d4-a716-446655440002",
    "notes": "Kandidat menunjukkan performa yang baik dalam interview teknikal",
    "create_at": "2025-01-09T10:00:00.000Z",
    "create_by": "user-uuid",
    "update_at": "2025-01-09T10:00:00.000Z",
    "update_by": null,
    "delete_at": null,
    "delete_by": null,
    "is_delete": false,
    "create_role": null
  }
}
```

### Get Notes (POST Method)
```http
POST /api/notes/get
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "page": 1,
  "limit": 10,
  "search": "interview",
  "sort_by": "create_at",
  "sort_order": "desc",
  "candidate_id": "550e8400-e29b-41d4-a716-446655440001",
  "employee_id": "550e8400-e29b-41d4-a716-446655440002"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notes retrieved successfully",
  "data": [
    {
      "note_id": "550e8400-e29b-41d4-a716-446655440003",
      "candidate_id": "550e8400-e29b-41d4-a716-446655440001",
      "employee_id": "550e8400-e29b-41d4-a716-446655440002",
      "notes": "Kandidat menunjukkan performa yang baik dalam interview teknikal",
      "create_at": "2025-01-09T10:00:00.000Z",
      "create_by": "user-uuid",
      "update_at": "2025-01-09T10:00:00.000Z",
      "update_by": null,
      "delete_at": null,
      "delete_by": null,
      "is_delete": false,
      "create_role": null,
      "candidate_name": "John Doe",
      "candidate_email": "john.doe@email.com",
      "employee_name": "Jane Smith",
      "employee_email": "jane.smith@company.com"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Update Note
```http
PUT /api/notes/550e8400-e29b-41d4-a716-446655440003
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "notes": "Kandidat menunjukkan performa yang sangat baik dalam interview teknikal dan komunikasi"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note updated successfully",
  "data": {
    "note_id": "550e8400-e29b-41d4-a716-446655440003",
    "candidate_id": "550e8400-e29b-41d4-a716-446655440001",
    "employee_id": "550e8400-e29b-41d4-a716-446655440002",
    "notes": "Kandidat menunjukkan performa yang sangat baik dalam interview teknikal dan komunikasi",
    "create_at": "2025-01-09T10:00:00.000Z",
    "create_by": "user-uuid",
    "update_at": "2025-01-09T10:05:00.000Z",
    "update_by": "user-uuid",
    "delete_at": null,
    "delete_by": null,
    "is_delete": false,
    "create_role": null
  }
}
```

### Delete Note
```http
DELETE /api/notes/delete
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "note_id": "550e8400-e29b-41d4-a716-446655440003"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

## Validation Rules

### Create Note
- `candidate_id`: Required, UUID format
- `employee_id`: Optional, UUID format
- `notes`: Required, string, min 1 character, max 5000 characters

### Update Note
- `notes`: Required, string, min 1 character, max 5000 characters

### Delete Note
- `note_id`: Required, UUID format

### Get Notes (POST)
- `page`: Optional, integer, min 1
- `limit`: Optional, integer, min 1, max 100
- `search`: Optional, string, max 100 characters
- `sort_by`: Optional, enum: create_at, update_at, notes
- `sort_order`: Optional, enum: asc, desc
- `candidate_id`: Optional, UUID format
- `employee_id`: Optional, UUID format

## Error Responses

### Validation Error (400)
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "candidate_id",
      "message": "Candidate ID is required"
    },
    {
      "field": "notes",
      "message": "Notes is required"
    }
  ]
}
```

### Not Found (404)
```json
{
  "success": false,
  "message": "Note not found"
}
```

### Server Error (500)
```json
{
  "success": false,
  "message": "Failed to create note",
  "error": "Error message details"
}
```

## Migration

Untuk menjalankan migrasi database:

```bash
npm run migrate
```

File migrasi: `src/repository/postgres/migrations/20250922000003_create_notes_table.js`

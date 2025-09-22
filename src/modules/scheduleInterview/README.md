# Schedule Interview Module

Module ini mengelola penjadwalan interview untuk kandidat dalam sistem API Interview.

## Struktur Database

### Tabel `schedule_interview`
- `schedule_interview_id` (UUID, Primary Key)
- `candidate_id` (UUID, Foreign Key ke tabel candidates)
- `assign_role` (VARCHAR 255) - Role yang ditugaskan (HR,TM,PIC,HRD)
- `schedule_interview_date` (DATE) - Tanggal interview
- `schedule_interview_time` (TIME) - Waktu interview
- `schedule_interview_duration` (VARCHAR 100) - Durasi interview
- `create_at`, `create_by`, `update_at`, `update_by`, `delete_at`, `delete_by`, `is_delete`

### Tabel `schedule_interview_details`
- `schedule_interview_details_id` (UUID, Primary Key)
- `schedule_interview_id` (UUID, Foreign Key ke tabel schedule_interview)
- `employee_id` (UUID, Foreign Key ke tabel employees)
- `create_at`, `create_by`, `update_at`, `update_by`, `delete_at`, `delete_by`, `is_delete`

## Endpoints

### 1. GET /api/schedule-interviews/get (POST Method)
Mengambil daftar schedule interview dengan filter dan pagination.

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
  "schedule_interview_date": "2023-12-01",
  "schedule_interview_time": "09:00:00",
  "schedule_interview_duration": "60 menit"
}
```

### 2. GET /api/schedule-interviews/:id
Mengambil schedule interview berdasarkan ID.

**Response:**
```json
{
  "success": true,
  "message": "Schedule interview retrieved successfully",
  "data": {
    "schedule_interview_id": "uuid",
    "candidate_id": "uuid",
    "candidate_name": "John Doe",
    "assign_role": "HR,TM",
    "schedule_interview_date": "2023-12-01",
    "schedule_interview_time": "09:00:00",
    "schedule_interview_duration": "60 menit",
    "details": [
      {
        "schedule_interview_details_id": "uuid",
        "employee_id": "uuid",
        "employee_name": "Jane Smith",
        "employee_email": "jane@company.com"
      }
    ]
  }
}
```

### 3. POST /api/schedule-interviews
Membuat schedule interview baru.

**Request Body:**
```json
{
  "candidate_id": "uuid-candidate",
  "assign_role": "HR,TM,PIC,HRD",
  "employee_id": ["uuid-employee1", "uuid-employee2"],
  "schedule_interview_date": "2023-12-01",
  "schedule_interview_time": "09:00:00",
  "schedule_interview_duration": "60 menit"
}
```

### 4. PUT /api/schedule-interviews/:id
Update schedule interview.

**Request Body:**
```json
{
  "assign_role": "HR,TM,PIC,HRD",
  "employee_id": ["uuid-employee1", "uuid-employee2"],
  "schedule_interview_date": "2023-12-01",
  "schedule_interview_time": "09:00:00",
  "schedule_interview_duration": "60 menit"
}
```

### 5. DELETE /api/schedule-interviews/:id
Soft delete schedule interview dan detail terkait.

## Fitur

1. **CRUD Operations**: Create, Read, Update, Delete dengan soft delete
2. **Pagination**: Mendukung pagination standar
3. **Filtering**: Filter berdasarkan berbagai field
4. **Searching**: Pencarian berdasarkan nama kandidat dan assign role
5. **Sorting**: Sorting berdasarkan field yang diizinkan
6. **Relational Data**: Otomatis join dengan tabel candidates dan employees
7. **Transaction**: Menggunakan database transaction untuk operasi yang melibatkan multiple tabel
8. **Validation**: Validasi input menggunakan express-validator
9. **Swagger Documentation**: Dokumentasi API lengkap

## Validasi

- `candidate_id`: Required UUID format
- `assign_role`: Optional, max 255 karakter
- `employee_id`: Optional array of UUID
- `schedule_interview_date`: Optional date format
- `schedule_interview_time`: Optional time format (HH:MM:SS)
- `schedule_interview_duration`: Optional, max 100 karakter

## Logika Bisnis

1. **Create**: Saat membuat schedule interview, jika `employee_id` disediakan, maka akan membuat record di tabel `schedule_interview_details`
2. **Update**: Saat update, jika `employee_id` disediakan, maka akan menghapus (soft delete) detail lama dan membuat detail baru
3. **Delete**: Saat delete schedule interview, semua detail terkait juga akan di-soft delete
4. **Restore**: Saat restore, schedule interview dan semua detail terkait akan di-restore

## Dependencies

- `knex`: Database query builder
- `express-validator`: Input validation
- `../../utils/standard_query`: Utility untuk standardisasi query dan pagination

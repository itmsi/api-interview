# Modul Applicant

Modul ini mengelola data pelamar kerja lengkap dengan informasi terkait seperti latar belakang pendidikan, keluarga, pengalaman kerja, pelatihan informal, dan referensi.

## Struktur Database

### Tabel Utama

#### `applicant_information`
Tabel utama yang menyimpan informasi dasar pelamar:
- `applicate_id` (UUID, Primary Key)
- `first_name`, `middle_name`, `last_name`
- `mobile`, `email`
- `id_number` (Nomor KTP/ID)
- `position_applied_for` (Posisi yang dilamar)
- `expected_salary` (Gaji yang diharapkan)
- `emergency_contact`
- `present_address`, `city`
- `date_of_birth`, `blood_type`
- `tax_identification_number` (NPWP)
- `working_available_date` (Tanggal mulai kerja)
- `religion`
- Audit fields: `create_at`, `create_by`, `update_at`, `update_by`, `delete_at`, `delete_by`, `is_delete`

### Tabel Terkait

#### `education_background`
Menyimpan riwayat pendidikan formal:
- `education_background_id` (UUID, Primary Key)
- `applicate_id` (Foreign Key ke `applicant_information`)
- `type_of_school`, `name_of_school`, `location_of_school`
- `grade_of_school`, `major_of_school`

#### `family_background`
Menyimpan informasi keluarga:
- `family_background_id` (UUID, Primary Key)
- `applicate_id` (Foreign Key ke `applicant_information`)
- `relationship_of_family_member`, `name_of_family_member`
- `age_of_family_member`, `employment_status_of_family_member`
- `emergency_contact_of_family_member`

#### `informal_education_qualification`
Menyimpan riwayat pelatihan/kursus informal:
- `informal_education_qualification_id` (UUID, Primary Key)
- `applicate_id` (Foreign Key ke `applicant_information`)
- `type_of_training`, `institute_name`, `location_of_institute`
- `certificate_of_training`, `period_of_training`

#### `reference`
Menyimpan informasi referensi:
- `reference_id` (UUID, Primary Key)
- `applicate_id` (Foreign Key ke `applicant_information`)
- `name_of_reference`, `position_of_reference`
- `phone_number_of_reference`

#### `work_experience`
Menyimpan riwayat pengalaman kerja:
- `work_experience_id` (UUID, Primary Key)
- `applicate_id` (Foreign Key ke `applicant_information`)
- `company_name`, `start_date_of_work`, `end_date_of_work`
- `pay_per_month`, `name_of_supervisor`, `reason_for_leaving`

## API Endpoints

### Public Endpoints (No Authentication Required)

#### 1. POST /api/public/applicants
Membuat pelamar baru untuk publik (tanpa perlu login/token)

**Request Body:** Sama dengan endpoint create applicant biasa
```json
{
  "first_name": "string",
  "middle_name": "string",
  "last_name": "string",
  "mobile": "string",
  "email": "string",
  "id_number": "string",
  "position_applied_for": "string",
  "expected_salary": "string",
  "emergency_contact": "string",
  "present_address": "string",
  "city": "string",
  "date_of_birth": "string",
  "blood_type": "string",
  "tax_identification_number": "string",
  "working_available_date": "string",
  "religion": "string",
  "education_backgrounds": [...],
  "informal_education_qualifications": [...],
  "family_backgrounds": [...],
  "work_experiences": [...],
  "references": [...]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Applicant created successfully",
  "data": {
    "applicate_id": "uuid",
    "first_name": "John",
    "last_name": "Doe",
    ...
  }
}
```

### Protected Endpoints (Authentication Required)

#### 2. POST /api/applicants/get
Mengambil daftar pelamar dengan filtering (menggunakan method POST)

**Request Body:**
```json
{
  "page": 1,
  "limit": 10,
  "search": "kata kunci pencarian",
  "sort_by": "create_at",
  "sort_order": "desc",
  "applicate_id": "uuid-applicate",
  "first_name": "first-name",
  "middle_name": "middle-name",
  "last_name": "last-name",
  "mobile": "mobile",
  "email": "email",
  "id_number": "id-number",
  "position_applied_for": "position-applied-for",
  "expected_salary": "expected-salary",
  "emergency_contact": "emergency-contact",
  "present_address": "present-address",
  "city": "city",
  "date_of_birth": "date-of-birth",
  "blood_type": "blood-type",
  "tax_identification_number": "tax-identification-number",
  "working_available_date": "working-available-date",
  "religion": "religion"
}
```

#### 3. POST /api/applicants
Membuat pelamar baru dengan semua data terkait (memerlukan authentication)

**Request Body:**
```json
{
  "first_name": "string",
  "middle_name": "string",
  "last_name": "string",
  "mobile": "string",
  "email": "string",
  "id_number": "string",
  "position_applied_for": "string",
  "expected_salary": "string",
  "emergency_contact": "string",
  "present_address": "string",
  "city": "string",
  "date_of_birth": "string",
  "blood_type": "string",
  "tax_identification_number": "string",
  "working_available_date": "string",
  "religion": "string",
  "education_backgrounds": [
    {
      "type_of_school": "string",
      "name_of_school": "string",
      "location_of_school": "string",
      "grade_of_school": "string",
      "major_of_school": "string"
    }
  ],
  "informal_education_qualifications": [
    {
      "type_of_training": "string",
      "institute_name": "string",
      "location_of_institute": "string",
      "certificate_of_training": "string",
      "period_of_training": "string"
    }
  ],
  "family_backgrounds": [
    {
      "relationship_of_family_member": "string",
      "name_of_family_member": "string",
      "age_of_family_member": "string",
      "employment_status_of_family_member": "string",
      "emergency_contact_of_family_member": "string"
    }
  ],
  "work_experiences": [
    {
      "company_name": "string",
      "start_date_of_work": "string",
      "end_date_of_work": "string",
      "pay_per_month": "string",
      "name_of_supervisor": "string",
      "reason_for_leaving": "string"
    }
  ],
  "references": [
    {
      "name_of_reference": "string",
      "position_of_reference": "string",
      "phone_number_of_reference": "string"
    }
  ]
}
```

#### 4. GET /api/applicants/:applicate_id
Mengambil data pelamar berdasarkan ID dengan semua data terkait

**Path Parameters:**
- `applicate_id`: UUID pelamar

#### 5. PUT /api/applicants/:applicate_id
Mengupdate data pelamar dengan semua data terkait

**Path Parameters:**
- `applicate_id`: UUID pelamar

**Request Body:** Sama dengan POST create

#### 6. DELETE /api/applicants/:applicate_id
Menghapus pelamar (soft delete) beserta semua data terkait

**Path Parameters:**
- `applicate_id`: UUID pelamar

## Fitur

### Transaksi Database
- Semua operasi create/update menggunakan database transaction
- Jika ada error pada salah satu tabel, semua perubahan akan di-rollback
- Memastikan konsistensi data

### Soft Delete
- Semua data menggunakan soft delete (flag `is_delete`)
- Data tidak benar-benar dihapus dari database
- Dapat di-restore jika diperlukan

### Validasi
- Validasi komprehensif untuk semua field
- Validasi format UUID, email, tanggal
- Validasi panjang string sesuai dengan skema database

### Filtering dan Pagination
- Support untuk pagination dengan `page` dan `limit`
- Full-text search pada multiple kolom
- Sorting berdasarkan kolom yang diizinkan
- Filtering berdasarkan field spesifik

### Dokumentasi Swagger
- Dokumentasi API lengkap dengan Swagger/OpenAPI
- Schema dan contoh request/response
- Deskripsi parameter dan field

## Struktur File

```
src/modules/applicant/
├── README.md              # Dokumentasi modul
├── index.js              # Entry point modul
├── handler.js            # Controller/handler untuk endpoints
├── postgre_repository.js # Repository untuk operasi database
└── validation.js         # Validasi request
```

## Migrasi Database

File migrasi tersedia di:
```
src/repository/postgres/migrations/
├── 20250922000010_create_applicant_information_table.js
├── 20250922000011_create_education_background_table.js
├── 20250922000012_create_family_background_table.js
├── 20250922000013_create_informal_education_qualification_table.js
├── 20250922000014_create_reference_table.js
└── 20250922000015_create_work_experience_table.js
```

## Contoh Penggunaan

### Membuat Pelamar Baru (Public - Tanpa Authentication)
```bash
curl -X POST "http://localhost:3000/api/public/applicants" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "mobile": "081234567890",
    "position_applied_for": "Software Engineer",
    "education_backgrounds": [
      {
        "type_of_school": "University",
        "name_of_school": "Universitas Indonesia",
        "major_of_school": "Computer Science"
      }
    ]
  }'
```

### Membuat Pelamar Baru (Protected - Dengan Authentication)
```bash
curl -X POST "http://localhost:3000/api/applicants" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@example.com",
    "mobile": "081234567890",
    "position_applied_for": "Software Engineer",
    "education_backgrounds": [
      {
        "type_of_school": "University",
        "name_of_school": "Universitas Indonesia",
        "major_of_school": "Computer Science"
      }
    ]
  }'
```

### Mengambil Daftar Pelamar
```bash
curl -X POST "http://localhost:3000/api/applicants/get" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "page": 1,
    "limit": 10,
    "search": "Software Engineer",
    "sort_by": "create_at",
    "sort_order": "desc"
  }'
```

### Mengambil Pelamar Berdasarkan ID
```bash
curl -X GET "http://localhost:3000/api/applicants/uuid-here" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

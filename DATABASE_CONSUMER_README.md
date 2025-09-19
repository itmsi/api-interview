# Database Consumer - RabbitMQ Consumer untuk Operasi Database

Database Consumer adalah sistem consumer RabbitMQ yang menangani operasi database (CREATE, UPDATE, DELETE) berdasarkan payload yang diterima dari queue.

## 🚀 Fitur

- ✅ **CREATE Operation**: Insert data baru ke database
- ✅ **UPDATE Operation**: Update data yang sudah ada
- ✅ **DELETE Operation**: Soft delete data (set `is_delete = true`)
- ✅ **SQL Query Support**: Mendukung raw SQL query atau menggunakan ORM
- ✅ **Error Handling**: Comprehensive error handling dengan logging
- ✅ **Retry Mechanism**: Automatic retry untuk failed operations
- ✅ **Monitoring**: Detailed logging dan alerting
- ✅ **Graceful Shutdown**: Handle SIGINT/SIGTERM dengan baik

## 📋 Struktur Payload

### Payload Dasar
```json
{
  "database": "gate_db",
  "table": "companies",
  "method": "create|update|delete",
  "data": { ... },
  "timestamp": "2025-09-19T06:57:51.490Z",
  "operation_id": "op_1758265071490_j19x9fjvk"
}
```

### Field Optional
```json
{
  "query_sql": "INSERT INTO companies (...) VALUES (...)",
  "record_id": "7944defd-5801-48c6-88e0-319b21c93128",
  "primary_key": "company_id",
  "result": { ... }
}
```

## 📝 Contoh Payload

### CREATE Operation
```json
{
  "database": "gate_db",
  "table": "companies",
  "method": "create",
  "query_sql": "INSERT INTO companies (company_name, company_parent_id, company_address, company_email, created_by) VALUES ('IEL2', '3eeffc21-1109-4bbc-a734-a223a73b6c89', 'string', 'user@example.com', '15baf47d-4a61-4062-b230-ea2e6a76e503')",
  "data": {
    "company_name": "IEL2",
    "company_parent_id": "3eeffc21-1109-4bbc-a734-a223a73b6c89",
    "company_address": "string",
    "company_email": "user@example.com",
    "created_by": "15baf47d-4a61-4062-b230-ea2e6a76e503"
  },
  "result": {
    "company_id": "7944defd-5801-48c6-88e0-319b21c93128",
    "company_name": "IEL2",
    "company_parent_id": "3eeffc21-1109-4bbc-a734-a223a73b6c89",
    "company_address": "string",
    "company_email": "user@example.com",
    "created_at": "2025-09-19T06:57:51.483Z",
    "created_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "updated_at": null,
    "updated_by": null,
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "timestamp": "2025-09-19T06:57:51.490Z",
  "operation_id": "op_1758265071490_j19x9fjvk"
}
```

### UPDATE Operation
```json
{
  "database": "gate_db",
  "table": "companies",
  "method": "update",
  "query_sql": "UPDATE companies SET company_name = 'IEL2', company_parent_id = '3eeffc21-1109-4bbc-a734-a223a73b6c89', company_address = 'string', company_email = 'user@example.com', updated_by = '15baf47d-4a61-4062-b230-ea2e6a76e503', updated_at = '2025-09-19T07:04:23.604Z' WHERE company_id = '7944defd-5801-48c6-88e0-319b21c93128'",
  "data": {
    "company_name": "IEL2",
    "company_parent_id": "3eeffc21-1109-4bbc-a734-a223a73b6c89",
    "company_address": "string",
    "company_email": "user@example.com",
    "updated_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "updated_at": "2025-09-19T07:04:23.604Z"
  },
  "record_id": "7944defd-5801-48c6-88e0-319b21c93128",
  "primary_key": "company_id",
  "result": {
    "company_id": "7944defd-5801-48c6-88e0-319b21c93128",
    "company_name": "IEL2",
    "company_parent_id": "3eeffc21-1109-4bbc-a734-a223a73b6c89",
    "company_address": "string",
    "company_email": "user@example.com",
    "created_at": "2025-09-19T06:57:51.483Z",
    "created_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "updated_at": "2025-09-19T07:04:23.604Z",
    "updated_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "deleted_at": null,
    "deleted_by": null,
    "is_delete": false
  },
  "timestamp": "2025-09-19T07:04:23.610Z",
  "operation_id": "op_1758265463610_lee5w71v3"
}
```

### DELETE Operation
```json
{
  "database": "gate_db",
  "table": "companies",
  "method": "delete",
  "query_sql": "UPDATE companies SET is_delete = true, deleted_at = '2025-09-19T07:05:12.864Z', deleted_by = '15baf47d-4a61-4062-b230-ea2e6a76e503' WHERE company_id = '7944defd-5801-48c6-88e0-319b21c93128'",
  "data": {
    "is_delete": true,
    "deleted_at": "2025-09-19T07:05:12.864Z",
    "deleted_by": "15baf47d-4a61-4062-b230-ea2e6a76e503"
  },
  "record_id": "7944defd-5801-48c6-88e0-319b21c93128",
  "primary_key": "company_id",
  "result": {
    "company_id": "7944defd-5801-48c6-88e0-319b21c93128",
    "company_name": "IEL2",
    "company_parent_id": "3eeffc21-1109-4bbc-a734-a223a73b6c89",
    "company_address": "string",
    "company_email": "user@example.com",
    "created_at": "2025-09-19T06:57:51.483Z",
    "created_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "updated_at": "2025-09-19T07:05:12.864Z",
    "updated_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "deleted_at": "2025-09-19T07:05:12.864Z",
    "deleted_by": "15baf47d-4a61-4062-b230-ea2e6a76e503",
    "is_delete": true
  },
  "timestamp": "2025-09-19T07:05:12.865Z",
  "operation_id": "op_1758265512865_p9xtet98g"
}
```

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
```bash
cp environment.example .env
```

Edit file `.env` dan sesuaikan konfigurasi:
```env
RABBITMQ_URL=amqp://guest:guest@localhost:9505
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=gate_db
```

### 3. Jalankan Consumer

#### Opsi 1: Standalone Consumer
```bash
node start-database-consumer.js
```

#### Opsi 2: Dengan Listener Utama
```bash
npm start
# atau
node src/scripts/start-consumer.js
```

## 🧪 Testing

### 1. Test Consumer
```bash
# Test semua operasi
node test-database-consumer.js

# Test hanya operasi dengan SQL
node test-database-consumer.js --sql-only

# Test hanya operasi ORM
node test-database-consumer.js --orm-only

# Lihat help
node test-database-consumer.js --help
```

### 2. Manual Testing
```javascript
const { publishCreateOperation } = require('./src/utils/database_queue')

// Test CREATE
await publishCreateOperation('gate_db', 'companies', {
  company_name: 'Test Company',
  company_email: 'test@example.com',
  created_by: 'user-id'
})
```

## 📊 Queue Configuration

- **Exchange**: `database-sso-exchange`
- **Queue**: `database_changes_queue_sso`
- **Type**: `fanout`
- **Durable**: `true`
- **TTL**: `3600000` (1 hour)
- **Max Retries**: `3`
- **Prefetch**: `5`

## 📁 File Structure

```
├── src/
│   ├── listeners/
│   │   ├── database_listener.js    # Main consumer logic
│   │   └── index.js               # Listener initializer
│   ├── utils/
│   │   ├── database_queue.js      # Queue publisher utilities
│   │   └── index.js              # Utils exports
│   └── config/
│       └── rabbitmq.js           # RabbitMQ configuration
├── test-database-consumer.js      # Test script
├── start-database-consumer.js     # Standalone consumer
└── DATABASE_CONSUMER_README.md    # This documentation
```

## 🔍 Monitoring & Logging

### Log Files
- **Consumer Logs**: `logs/listener/database-consumer-YYYY-MM-DD.txt`
- **Operation Logs**: `logs/database-consumer/database-consumer-YYYY-MM-DD.txt`

### Log Format
```
Success create-companies-2025-09-19 14:30:45: {"operation_id":"op_123","status":"success",...}
Failed update-users-2025-09-19 14:31:00: {"operation_id":"op_124","status":"error",...}
```

### Monitoring
- Consumer status monitoring
- Error alerting via `sendAlert()`
- Operation success/failure tracking
- Performance metrics logging

## 🚨 Error Handling

### Error Types
1. **Validation Errors**: Invalid payload structure
2. **Database Errors**: Connection, query, constraint errors
3. **Queue Errors**: Connection, parsing errors

### Retry Strategy
- **Invalid Payload**: No retry (nack without requeue)
- **Database Errors**: Retry with requeue
- **Temporary Errors**: Retry with requeue

### Error Alerts
Errors automatically trigger alerts via `sendAlert()` function dengan informasi:
- Job name
- Error details
- Exception stack trace
- Payload data

## 🔧 API Usage

### Publisher Functions

```javascript
const { 
  publishCreateOperation,
  publishUpdateOperation, 
  publishDeleteOperation 
} = require('./src/utils/database_queue')

// CREATE
await publishCreateOperation(database, table, data, sql, result)

// UPDATE  
await publishUpdateOperation(database, table, data, recordId, primaryKey, sql, result)

// DELETE
await publishDeleteOperation(database, table, data, recordId, primaryKey, sql, result)
```

### Direct Queue Publishing
```javascript
const { publishDatabaseOperation } = require('./src/utils/database_queue')

await publishDatabaseOperation({
  database: 'gate_db',
  table: 'companies',
  method: 'create',
  data: { ... },
  query_sql: 'INSERT INTO ...',
  record_id: 'uuid',
  primary_key: 'id',
  result: { ... }
})
```

## 🤝 Integration

### Dengan Sistem yang Ada
Consumer terintegrasi dengan:
- **Database**: PostgreSQL via Knex.js
- **Logging**: Existing logger system
- **Alerting**: Existing alert system
- **Configuration**: Environment variables

### Dengan Aplikasi Lain
Aplikasi lain dapat publish message ke queue `database_changes_queue_sso` dengan format payload yang sesuai.

## 📈 Performance

### Optimizations
- **Prefetch Limit**: 5 messages per consumer
- **Connection Pooling**: Database connection reuse
- **Batch Processing**: Multiple operations dapat diproses bersamaan
- **Memory Management**: Automatic cleanup setelah processing

### Scalability
- Multiple consumer instances dapat berjalan bersamaan
- Load balancing otomatis via RabbitMQ
- Horizontal scaling dengan menambah consumer

## 🔒 Security

### Validations
- Payload structure validation
- SQL injection prevention (via parameterized queries)
- Required field validation
- Method validation

### Access Control
- Environment-based configuration
- Database credentials protection
- Queue access control

## 🐛 Troubleshooting

### Common Issues

1. **Consumer tidak menerima message**
   ```bash
   # Check RabbitMQ connection
   curl -u guest:guest http://localhost:15672/api/queues
   
   # Check queue exists
   node -e "console.log(process.env.RABBITMQ_URL)"
   ```

2. **Database connection error**
   ```bash
   # Check database connection
   psql -h localhost -U username -d gate_db
   
   # Check environment variables
   node -e "console.log(process.env.DB_HOST)"
   ```

3. **Message not processed**
   - Check payload format
   - Check required fields
   - Check consumer logs
   - Verify queue binding

### Debug Mode
```bash
DEBUG=* node start-database-consumer.js
```

### Health Check
```javascript
// Check consumer health
const { connectRabbitMQ } = require('./src/config/rabbitmq')
const { connection, channel } = await connectRabbitMQ()
console.log('RabbitMQ connected:', !!connection)
```

## 📞 Support

Untuk pertanyaan atau issues:
1. Check logs di `logs/listener/` dan `logs/database-consumer/`
2. Verify RabbitMQ dan database connection
3. Test dengan `test-database-consumer.js`
4. Check environment variables
5. Restart consumer jika diperlukan

---

**Happy Coding! 🚀**

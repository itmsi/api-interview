const { publishToRabbitMqQueueSingle } = require('../config/rabbitmq')
const { lang } = require('../lang')
const { EXCHANGES, QUEUE } = require('./constant')

/**
 * Publish database operation ke RabbitMQ queue
 * @param {string} database - Nama database
 * @param {string} table - Nama tabel
 * @param {string} method - Method operasi (create, update, delete)
 * @param {Object} data - Data untuk operasi
 * @param {string} query_sql - Optional SQL query
 * @param {string} record_id - ID record untuk update/delete
 * @param {string} primary_key - Primary key column name
 * @param {Object} result - Result dari operasi (optional)
 * @returns {Object} Operation metadata
 */
const publishDatabaseOperation = async ({
  database,
  table,
  method,
  data,
  query_sql = null,
  record_id = null,
  primary_key = null,
  primary_key_value = null,
  result = null
}) => {
  try {
    // Validasi parameter wajib
    if (!database || !table || !method) {
      throw new Error('Database, table, dan method harus diisi')
    }

    // Validasi method
    const validMethods = ['create', 'update', 'delete']
    if (!validMethods.includes(method.toLowerCase())) {
      throw new Error(`Method ${method} tidak valid. Method yang valid: ${validMethods.join(', ')}`)
    }

    // Validasi data untuk setiap method
    if (method.toLowerCase() === 'create' && !data) {
      throw new Error('Data tidak boleh kosong untuk operasi create')
    }

    if ((method.toLowerCase() === 'update' || method.toLowerCase() === 'delete') && (!record_id || !primary_key)) {
      throw new Error('record_id dan primary_key tidak boleh kosong untuk operasi update/delete')
    }

    // Generate operation ID dan timestamp
    const operation_id = `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const timestamp = new Date().toISOString()

    // Buat payload
    const payload = {
      database,
      table,
      method: method.toLowerCase(),
      data,
      timestamp,
      operation_id
    }

    // Tambahkan field optional jika ada
    if (query_sql) payload.query_sql = query_sql
    if (record_id) payload.record_id = record_id
    if (primary_key) payload.primary_key = primary_key
    if (primary_key_value) payload.primary_key_value = primary_key_value
    if (result) payload.result = result

    // Publish ke queue
    const queueName = QUEUE.DATABASE_SSO
    const exchangeName = EXCHANGES.DATABASE_SSO
    
    await publishToRabbitMqQueueSingle(exchangeName, queueName, payload)
    
    console.info(`Database operation published: ${method} ${table} with operation_id: ${operation_id}`)
    
    return {
      operation_id,
      timestamp,
      status: 'published',
      payload
    }

  } catch (error) {
    console.error('Error publishing database operation:', error)
    throw error
  }
}

/**
 * Publish CREATE operation ke database queue
 * @param {string} database - Nama database
 * @param {string} table - Nama tabel
 * @param {Object} data - Data untuk insert
 * @param {string} query_sql - Optional SQL query
 * @param {string} primary_key_value - Optional primary key value untuk sinkronisasi ID
 * @param {Object} result - Result dari operasi (optional)
 */
const publishCreateOperation = async (database, table, data, query_sql = null, primary_key_value = null, result = null) => {
  return await publishDatabaseOperation({
    database,
    table,
    method: 'create',
    data,
    query_sql,
    primary_key_value,
    result
  })
}

/**
 * Publish UPDATE operation ke database queue
 * @param {string} database - Nama database
 * @param {string} table - Nama tabel
 * @param {Object} data - Data untuk update
 * @param {string} record_id - ID record yang akan diupdate
 * @param {string} primary_key - Primary key column name
 * @param {string} query_sql - Optional SQL query
 * @param {Object} result - Result dari operasi (optional)
 */
const publishUpdateOperation = async (database, table, data, record_id, primary_key, query_sql = null, result = null) => {
  return await publishDatabaseOperation({
    database,
    table,
    method: 'update',
    data,
    record_id,
    primary_key,
    query_sql,
    result
  })
}

/**
 * Publish DELETE operation ke database queue
 * @param {string} database - Nama database
 * @param {string} table - Nama tabel
 * @param {Object} data - Data untuk soft delete (deleted_by, dll)
 * @param {string} record_id - ID record yang akan dihapus
 * @param {string} primary_key - Primary key column name
 * @param {string} query_sql - Optional SQL query
 * @param {Object} result - Result dari operasi (optional)
 */
const publishDeleteOperation = async (database, table, data, record_id, primary_key, query_sql = null, result = null) => {
  return await publishDatabaseOperation({
    database,
    table,
    method: 'delete',
    data,
    record_id,
    primary_key,
    query_sql,
    result
  })
}

module.exports = {
  publishDatabaseOperation,
  publishCreateOperation,
  publishUpdateOperation,
  publishDeleteOperation
}

const { connectRabbitMQ } = require('../config/rabbitmq')
const { pgCore } = require('../config/database')
const {
  EXCHANGES, QUEUE, logger, todayFormat, sendAlert
} = require('../utils')
const { insert, updated, deletePermanently, raw } = require('../repository/postgres/core_postgres')

// Mapping primary key untuk setiap tabel
const TABLE_PRIMARY_KEYS = {
  companies: 'company_id',
  candidates: 'candidate_id',
  departments: 'department_id',
  employees: 'employee_id',
  users: 'user_id',
  categories: 'category_id',
  genders: 'gender_id',
  islands: 'island_id',
  titles: 'title_id',
  // Tambahkan mapping tabel lain sesuai kebutuhan
}

/**
 * Menjalankan operasi database berdasarkan method yang diterima dari queue
 * @param {Object} payload - Data dari queue RabbitMQ
 * @param {Object} channel - Channel RabbitMQ
 */
const methodExecution = async (payload, channel) => {
  try {
    const { database, table, method, data, query_sql, record_id, primary_key, primary_key_value } = payload
    
    // Validasi payload
    if (!database || !table || !method) {
      throw new Error('Payload tidak valid: database, table, dan method harus ada')
    }

    console.info(`Processing ${method} operation for table ${table}`)
    
    let result = null
    
    switch (method.toLowerCase()) {
      case 'create':
        // Untuk operasi create, gunakan data yang diberikan
        if (!data) {
          throw new Error('Data tidak boleh kosong untuk operasi create')
        }
        
        // Sinkronisasi ID data master dengan mirror menggunakan primary_key_value
        if (primary_key_value) {
          const tablePrimaryKey = TABLE_PRIMARY_KEYS[table]
          if (tablePrimaryKey) {
            // Set primary key value dari payload untuk sinkronisasi
            data[tablePrimaryKey] = primary_key_value
            console.info(`Syncing ${table} with master ID: ${tablePrimaryKey} = ${primary_key_value}`)
          } else {
            console.warn(`Primary key mapping not found for table: ${table}`)
          }
        }
        
        // Jika ada query_sql, gunakan raw query, jika tidak gunakan insert biasa
        if (query_sql) {
          result = await raw(query_sql)
        } else {
          // Ambil semua kolom untuk return value
          const columns = Object.keys(data)
          result = await insert(table, data, columns, false)
        }
        
        console.info(`Successfully created record in ${table}:`, result)
        break
        
      case 'update':
        // Untuk operasi update, butuh record_id dan primary_key
        if (!record_id || !primary_key || !data) {
          throw new Error('record_id, primary_key, dan data tidak boleh kosong untuk operasi update')
        }
        
        if (query_sql) {
          result = await raw(query_sql)
        } else {
          const where = { [primary_key]: record_id }
          const columns = Object.keys(data)
          result = await updated(table, where, data, columns)
        }
        
        console.info(`Successfully updated record in ${table}:`, result)
        break
        
      case 'delete':
        // Untuk operasi delete (soft delete), update is_delete = true
        if (!record_id || !primary_key) {
          throw new Error('record_id dan primary_key tidak boleh kosong untuk operasi delete')
        }
        
        if (query_sql) {
          result = await raw(query_sql)
        } else {
          const where = { [primary_key]: record_id }
          const deleteData = {
            is_delete: true,
            deleted_at: new Date().toISOString(),
            deleted_by: data?.deleted_by || null
          }
          const columns = Object.keys(deleteData)
          result = await updated(table, where, deleteData, columns)
        }
        
        console.info(`Successfully deleted record in ${table}:`, result)
        break
        
      default:
        throw new Error(`Method ${method} tidak didukung`)
    }
    
    // Log successful operation
    const logMessage = {
      operation_id: payload.operation_id || `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      database,
      table,
      method,
      record_id: record_id || (result && result.id) || null,
      status: 'success',
      result: result
    }
    
    logger('database-consumer.txt', 'database').write(`Success ${method}-${table}-${todayFormat('YYYY-MM-DD hh:mm:ss')}: ${JSON.stringify(logMessage)}\n`)
    
  } catch (error) {
    // Log error dan kirim alert
    const errorMessage = {
      operation_id: payload.operation_id || `op_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      database: payload.database,
      table: payload.table,
      method: payload.method,
      status: 'error',
      error: error.message,
      payload: payload
    }
    
    try {
      await sendAlert({
        job: `Database Consumer - ${payload.method} ${payload.table}`,
        error,
        exceptions: JSON.stringify(error),
        details: error.toString()
      })
    } catch (alertError) {
      console.error('Error sending alert:', alertError.message)
      // Continue execution even if alert fails
    }
    
    console.error('Error in database operation:', error)
    logger('database-consumer.txt', 'database').write(`Failed ${payload.method}-${payload.table}-${todayFormat('YYYY-MM-DD hh:mm:ss')}: ${JSON.stringify(errorMessage)}\n`)
    
    // Jangan close channel di sini, biarkan consumer tetap berjalan
    throw error
  }
}

/**
 * Inisialisasi Database Consumer Service
 */
const initDatabaseServices = async () => {
  const queueName = QUEUE.DATABASE_SSO // Nama queue untuk operasi database
  const { channel, connection } = await connectRabbitMQ()
  
  process.once('SIGINT', async () => {
    console.info('Got SIGINT, closing database consumer connection')
    await channel.close()
    await connection.close()
    process.exit(0)
  })

  try {
    // Assert queue dengan durability
    await channel.assertQueue(queueName, { 
      durable: true
    })
    
    // Set prefetch untuk mengontrol jumlah pesan yang diproses bersamaan
    await channel.prefetch(5)
    
    console.info(`Database consumer started, waiting for messages in queue: ${queueName}`)
    
    // Consume messages
    await channel.consume(
      queueName,
      async (msg) => {
        if (!msg) return
        
        console.info(`Processing database operation message ${msg?.fields?.consumerTag}`)
        
        try {
          const parseData = JSON.parse(msg.content.toString())
          
          // Validasi basic payload structure
          if (!parseData.database || !parseData.table || !parseData.method) {
            throw new Error('Invalid payload structure')
          }
          
          await methodExecution(parseData, channel)
          
          // Acknowledge message setelah berhasil diproses
          channel.ack(msg)
          
        } catch (error) {
          console.error('Error processing database operation:', error)
          
          // Log error
          logger('database-consumer.txt', 'database').write(`Error processing message-${todayFormat('YYYY-MM-DD hh:mm:ss')}: ${JSON.stringify(error)}\n`)
          
          // Reject message dan tidak requeue jika error parsing atau validasi
          if (error.message.includes('Invalid payload') || error.message.includes('JSON')) {
            console.error('Rejecting message due to invalid format')
            channel.nack(msg, false, false) // Don't requeue invalid messages
          } else {
            // Requeue untuk error database atau temporary issues
            console.error('Rejecting message with requeue')
            channel.nack(msg, false, true) // Requeue for retry
          }
        }
      },
      {
        noAck: false,
        consumerTag: `consumer_database_${queueName}`
      }
    )
    
  } catch (error) {
    console.error('Error initializing database consumer:', error)
    logger('database-consumer.txt', 'database').write(`Error initializing consumer-${todayFormat('YYYY-MM-DD hh:mm:ss')}: ${error} - ${error.toString()}\n`)
    throw error
  }
}

module.exports = {
  initDatabaseServices,
  methodExecution
}

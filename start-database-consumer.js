#!/usr/bin/env node

/**
 * Script untuk menjalankan Database Consumer secara standalone
 * Berguna untuk development dan testing
 */

require('dotenv').config()
const { initDatabaseServices } = require('./src/listeners/database_listener')
const { logger, logDateFormat, fullDateFormat } = require('./src/utils')

const startDatabaseConsumer = async () => {
  const fileName = `database-consumer-${logDateFormat()}.txt`
  
  console.log('🚀 Starting Database Consumer...')
  console.log('================================')
  console.log(`📅 Started at: ${fullDateFormat(new Date().toISOString())}`)
  console.log(`🔗 RabbitMQ URL: ${process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:9505'}`)
  console.log(`📊 Database: ${process.env.DB_HOST || 'localhost'}`)
  console.log('================================\n')

  try {
    // Log startup
    logger(fileName, 'database-consumer').write(`Database Consumer started at ${fullDateFormat(new Date().toISOString())}\n`)
    
    // Inisialisasi database consumer
    await initDatabaseServices()
    
    console.log('✅ Database Consumer is running and waiting for messages...')
    console.log('📝 Logs will be written to:', `logs/database-consumer/${fileName}`)
    console.log('🛑 Press Ctrl+C to stop the consumer\n')
    
    // Log successful start
    logger(fileName, 'database-consumer').write(`Database Consumer successfully initialized at ${fullDateFormat(new Date().toISOString())}\n`)
    
  } catch (error) {
    console.error('❌ Error starting Database Consumer:', error)
    logger(fileName, 'database-consumer').write(`Error starting Database Consumer at ${fullDateFormat(new Date().toISOString())}: ${error}\n`)
    process.exit(1)
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Received SIGINT. Gracefully shutting down Database Consumer...')
  const fileName = `database-consumer-${logDateFormat()}.txt`
  logger(fileName, 'database-consumer').write(`Database Consumer stopped at ${fullDateFormat(new Date().toISOString())}\n`)
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n🛑 Received SIGTERM. Gracefully shutting down Database Consumer...')
  const fileName = `database-consumer-${logDateFormat()}.txt`
  logger(fileName, 'database-consumer').write(`Database Consumer terminated at ${fullDateFormat(new Date().toISOString())}\n`)
  process.exit(0)
})

// Handle unhandled errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason)
  const fileName = `database-consumer-${logDateFormat()}.txt`
  logger(fileName, 'database-consumer').write(`Unhandled Rejection at ${fullDateFormat(new Date().toISOString())}: ${reason}\n`)
})

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error)
  const fileName = `database-consumer-${logDateFormat()}.txt`
  logger(fileName, 'database-consumer').write(`Uncaught Exception at ${fullDateFormat(new Date().toISOString())}: ${error}\n`)
  process.exit(1)
})

// Display help if requested
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Database Consumer - RabbitMQ Consumer for Database Operations

Usage: node start-database-consumer.js [options]

Options:
  --help, -h     Show this help message

Environment Variables:
  RABBITMQ_URL   RabbitMQ connection URL (default: amqp://guest:guest@localhost:9505)
  DB_HOST        Database host
  DB_PORT        Database port
  DB_USER        Database username
  DB_PASSWORD    Database password
  DB_NAME        Database name

Examples:
  node start-database-consumer.js
  RABBITMQ_URL=amqp://user:pass@localhost:5672 node start-database-consumer.js

Queue Information:
  Exchange: database-sso-exchange
  Queue: database_changes_queue_sso
  Routing: fanout

Supported Operations:
  - CREATE: Insert new records
  - UPDATE: Update existing records
  - DELETE: Soft delete records (set is_delete = true)

Payload Format:
  {
    "database": "gate_db",
    "table": "companies", 
    "method": "create|update|delete",
    "data": { ... },
    "query_sql": "optional SQL query",
    "record_id": "for update/delete",
    "primary_key": "primary key column name",
    "result": { ... },
    "timestamp": "ISO timestamp",
    "operation_id": "unique operation ID"
  }
  `)
  process.exit(0)
}

// Start the consumer
startDatabaseConsumer()

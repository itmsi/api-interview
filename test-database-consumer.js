const {
  publishCreateOperation,
  publishUpdateOperation,
  publishDeleteOperation
} = require('./src/utils/database_queue')

/**
 * Test script untuk database consumer
 * Mengirim sample data seperti payload yang diberikan user
 */
const testDatabaseConsumer = async () => {
  try {
    console.log('Testing Database Consumer...')
    console.log('================================')

    // Test 1: CREATE Operation (sesuai payload user)
    console.log('\n1. Testing CREATE operation...')
    const createPayload = {
      company_name: "IEL2",
      company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
      company_address: "string",
      company_email: "user@example.com",
      created_by: "15baf47d-4a61-4062-b230-ea2e6a76e503"
    }

    const createResult = await publishCreateOperation(
      'gate_db',
      'companies',
      createPayload,
      "INSERT INTO companies (company_name, company_parent_id, company_address, company_email, created_by) VALUES ('IEL2', '3eeffc21-1109-4bbc-a734-a223a73b6c89', 'string', 'user@example.com', '15baf47d-4a61-4062-b230-ea2e6a76e503')",
      {
        company_id: "7944defd-5801-48c6-88e0-319b21c93128",
        company_name: "IEL2",
        company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
        company_address: "string",
        company_email: "user@example.com",
        created_at: "2025-09-19T06:57:51.483Z",
        created_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        updated_at: null,
        updated_by: null,
        deleted_at: null,
        deleted_by: null,
        is_delete: false
      }
    )
    console.log('CREATE operation published:', createResult.operation_id)

    // Delay sebentar
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Test 2: UPDATE Operation (sesuai payload user)
    console.log('\n2. Testing UPDATE operation...')
    const updatePayload = {
      company_name: "IEL2",
      company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
      company_address: "string",
      company_email: "user@example.com",
      updated_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
      updated_at: "2025-09-19T07:04:23.604Z"
    }

    const updateResult = await publishUpdateOperation(
      'gate_db',
      'companies',
      updatePayload,
      '7944defd-5801-48c6-88e0-319b21c93128',
      'company_id',
      "UPDATE companies SET company_name = 'IEL2', company_parent_id = '3eeffc21-1109-4bbc-a734-a223a73b6c89', company_address = 'string', company_email = 'user@example.com', updated_by = '15baf47d-4a61-4062-b230-ea2e6a76e503', updated_at = '2025-09-19T07:04:23.604Z' WHERE company_id = '7944defd-5801-48c6-88e0-319b21c93128'",
      {
        company_id: "7944defd-5801-48c6-88e0-319b21c93128",
        company_name: "IEL2",
        company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
        company_address: "string",
        company_email: "user@example.com",
        created_at: "2025-09-19T06:57:51.483Z",
        created_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        updated_at: "2025-09-19T07:04:23.604Z",
        updated_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        deleted_at: null,
        deleted_by: null,
        is_delete: false
      }
    )
    console.log('UPDATE operation published:', updateResult.operation_id)

    // Delay sebentar
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Test 3: DELETE Operation (sesuai payload user)
    console.log('\n3. Testing DELETE operation...')
    const deletePayload = {
      is_delete: true,
      deleted_at: "2025-09-19T07:05:12.864Z",
      deleted_by: "15baf47d-4a61-4062-b230-ea2e6a76e503"
    }

    const deleteResult = await publishDeleteOperation(
      'gate_db',
      'companies',
      deletePayload,
      '7944defd-5801-48c6-88e0-319b21c93128',
      'company_id',
      "UPDATE companies SET is_delete = true, deleted_at = '2025-09-19T07:05:12.864Z', deleted_by = '15baf47d-4a61-4062-b230-ea2e6a76e503' WHERE company_id = '7944defd-5801-48c6-88e0-319b21c93128'",
      {
        company_id: "7944defd-5801-48c6-88e0-319b21c93128",
        company_name: "IEL2",
        company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
        company_address: "string",
        company_email: "user@example.com",
        created_at: "2025-09-19T06:57:51.483Z",
        created_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        updated_at: "2025-09-19T07:05:12.864Z",
        updated_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        deleted_at: "2025-09-19T07:05:12.864Z",
        deleted_by: "15baf47d-4a61-4062-b230-ea2e6a76e503",
        is_delete: true
      }
    )
    console.log('DELETE operation published:', deleteResult.operation_id)

    console.log('\n================================')
    console.log('All test operations published successfully!')
    console.log('Check the consumer logs to verify processing.')
    console.log('================================')

  } catch (error) {
    console.error('Error testing database consumer:', error)
    process.exit(1)
  }
}

// Test untuk operasi tanpa SQL query (menggunakan ORM)
const testWithoutSQL = async () => {
  try {
    console.log('\n\nTesting operations without SQL query (using ORM)...')
    console.log('====================================================')

    // Test CREATE tanpa SQL
    const createData = {
      company_name: "Test Company",
      company_parent_id: "3eeffc21-1109-4bbc-a734-a223a73b6c89",
      company_address: "Test Address",
      company_email: "test@example.com",
      created_by: "15baf47d-4a61-4062-b230-ea2e6a76e503"
    }

    const createOp = await publishCreateOperation('gate_db', 'companies', createData)
    console.log('CREATE (ORM) operation published:', createOp.operation_id)

    // Test UPDATE tanpa SQL
    const updateData = {
      company_name: "Updated Company",
      updated_by: "15baf47d-4a61-4062-b230-ea2e6a76e503"
    }

    const updateOp = await publishUpdateOperation(
      'gate_db',
      'companies',
      updateData,
      '7944defd-5801-48c6-88e0-319b21c93128',
      'company_id'
    )
    console.log('UPDATE (ORM) operation published:', updateOp.operation_id)

    // Test DELETE tanpa SQL
    const deleteData = {
      deleted_by: "15baf47d-4a61-4062-b230-ea2e6a76e503"
    }

    const deleteOp = await publishDeleteOperation(
      'gate_db',
      'companies',
      deleteData,
      '7944defd-5801-48c6-88e0-319b21c93128',
      'company_id'
    )
    console.log('DELETE (ORM) operation published:', deleteOp.operation_id)

    console.log('\nORM operations test completed!')

  } catch (error) {
    console.error('Error testing ORM operations:', error)
  }
}

// Jalankan test
const runTests = async () => {
  await testDatabaseConsumer()
  await testWithoutSQL()
  
  console.log('\n🎉 All tests completed!')
  console.log('💡 Make sure the consumer is running to process these messages.')
  console.log('📝 Check logs in logs/listener/ directory for processing results.')
  
  // Exit setelah beberapa detik untuk memastikan semua message terkirim
  setTimeout(() => {
    process.exit(0)
  }, 3000)
}

// Handle command line arguments
const args = process.argv.slice(2)
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
Usage: node test-database-consumer.js [options]

Options:
  --help, -h     Show this help message
  --sql-only     Test only operations with SQL queries
  --orm-only     Test only operations without SQL queries (ORM)

Examples:
  node test-database-consumer.js
  node test-database-consumer.js --sql-only
  node test-database-consumer.js --orm-only
  `)
  process.exit(0)
}

if (args.includes('--sql-only')) {
  testDatabaseConsumer()
} else if (args.includes('--orm-only')) {
  testWithoutSQL()
} else {
  runTests()
}

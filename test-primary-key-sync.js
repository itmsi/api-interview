const { publishCreateOperation } = require('./src/utils/database_queue');

async function testPrimaryKeySync() {
  try {
    console.log('Testing primary key synchronization with master data...');
    
    // Test 1: Create company dengan primary_key_value UUID yang valid
    const masterCompanyId = '12345678-1234-1234-1234-123456789012';
    
    const testCompanyData = {
      company_name: 'Master Sync Test Company',
      company_email: 'mastersync@company.com',
      company_address: 'Master Sync Test Address',
      created_by: null
      // created_at akan di-generate otomatis oleh database
    };

    console.log('1. Testing company creation with master ID sync...');
    console.log(`   Master ID: ${masterCompanyId}`);
    
    const result1 = await publishCreateOperation(
      'interview', 
      'companies', 
      testCompanyData, 
      null, // query_sql
      masterCompanyId // primary_key_value untuk sync
    );
    
    console.log('Published company with master ID sync:', result1.operation_id);
    
    // Wait for processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Test 2: Create candidate dengan primary_key_value UUID yang valid
    const masterCandidateId = '87654321-4321-4321-4321-210987654321';
    
    const testCandidateData = {
      candidate_name: 'Master Sync Test Candidate',
      candidate_email: 'candidatesync@test.com',
      company_id: '4295e5bd-36c2-49b0-9c29-dc970b29bd5e', // MSI company
      create_by: null
      // create_at akan di-generate otomatis oleh database
    };

    console.log('2. Testing candidate creation with master ID sync...');
    console.log(`   Master ID: ${masterCandidateId}`);
    
    const result2 = await publishCreateOperation(
      'interview', 
      'candidates', 
      testCandidateData, 
      null, // query_sql
      masterCandidateId // primary_key_value untuk sync
    );
    
    console.log('Published candidate with master ID sync:', result2.operation_id);
    
    console.log('\nCheck the database to verify:');
    console.log(`- Company should have company_id = '${masterCompanyId}'`);
    console.log(`- Candidate should have candidate_id = '${masterCandidateId}'`);
    console.log('\nCheck database consumer logs for sync messages.');
    
  } catch (error) {
    console.error('Error testing primary key sync:', error);
  }
  
  // Exit after test
  setTimeout(() => {
    console.log('\nTest completed. Check database and logs for sync results.');
    process.exit(0);
  }, 3000);
}

testPrimaryKeySync();

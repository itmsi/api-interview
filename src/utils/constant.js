require('dotenv').config();

module.exports = {
  // Pagination constants - digunakan di exception.js, pagination.js, standard_query.js
  LIMIT: 10,
  PAGE: 1,

  // HTTP status codes - digunakan di exception.js
  HTTP: {
    CREATED: 201,
    OK: 200,
    ACCEPTED: 202,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
  },

  // User roles - digunakan di middlewares/token.js dan modules/auth/postgre_repository.js
  ROLE: {
    ADMIN: 'Administrator',
    CUSTOMER_BUYER: 'Customer-Buyer',
    CLIENT_SELLER: 'Client-Seller',
    ONLY_CONDUCTOR: ['Coordinator', 'Admin Office', 'Branch Head', 'Conductor', 'Auction Officer'],
    ONLY_INSPECTION: ['Inspection', 'Inspector'],
    AUCTION: ['Coordinator', 'Admin Office', 'Branch Head', 'Conductor', 'Customer-Buyer', 'Auction Officer'],
    AUCTION_OFFICER: 'Auction Officer'
  },

  // Morgan logging format - digunakan di app.js
  MORGAN_FORMAT: {
    DEV: '[:date[clf]] :remote-addr :remote-user \x1b[36m:method \x1b[36m:url \x1b[33m:status \x1b[32m:response-time\x1b[36m(ms)\x1b[0m',
    PROD: '[:date[clf]] :remote-addr :remote-user :method :url :status :response-time(ms)'
  },

  // RabbitMQ exchanges - digunakan di database_queue.js, database_listener.js
  EXCHANGES: {
    INVENTORY: 'inventory',
    INSPECTION: 'inspection-step',
    AUCTION: 'auction',
    EMAIL: 'email',
    UPDATE_INV: 'update-status-inventory',
    PRINT_CATALOG: 'exchanges-print-catalog',
    IMAGE_KTP: 'exchanges-ktp-processing',
    PUBLISH_CATALOG: 'exchanges-publish-catalog',
    DATABASE_SSO: 'database-sso-exchange'
  },

  // RabbitMQ queues - digunakan di database_queue.js, database_listener.js, dan file queue lainnya
  QUEUE: {
    CAR_INV: 'car-inventory',
    BIKE_INV: 'bike-inventory',
    PRINT_CATALOG: 'queue-print-catalog',
    PUBLISH_CATALOG: 'queue-publish-catalog',
    IMAGE_KTP: 'queue-ktp-processing',
    DATABASE_SSO: 'database_changes_queue_sso'
  },

  // Transaction actions - digunakan di queue dan listener files
  ACTION_TRX: {
    INSERT: 'insert',
    UPDATE: 'update',
    DEL: 'delete',
    LOG: 'log',
    LOG_REPORT: 'log-report',
    INSPECTION_STEP: 'inspection-step'
  },

  // App information - digunakan di alert.js, debug/email.js
  APP_INFO: {
    LOGO: process?.env?.LOGO_URL,
    EMAIL_CS: process?.env?.EMAIL_CS ?? 'cs.universal@lelangmobilku.co.id',
    PHONE_CS: process?.env?.PHONE_CS ?? '0811-9009404',
    WEB_INFO: process?.env?.WEB_INFO,
    ONLINE_AUCTION: process?.env?.ONLINE_AUCTION,
    WEB_SELLER: process?.env?.WEB_SELLER ?? 'https://rubysa.my.id/'
  }
}

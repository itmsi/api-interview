const { logger, logDateFormat, fullDateFormat } = require('../utils')
const { initEmailServices } = require('./email_listener')
const { initDatabaseServices } = require('./database_listener')

const initListener = async () => {
  const fileName = `listener-${logDateFormat()}.txt`
  try {
    console.info('Listener is working waiting for message')
    await initEmailServices()
    await initDatabaseServices()
    logger(fileName, 'listener').write(`Listener is working waiting for message ${fullDateFormat(new Date().toISOString())} \n`)
  } catch (error) {
    console.info('Listener is not working with error', error)
    logger(fileName, 'listener').write(`Listener is not working with error ${fullDateFormat(new Date().toISOString())} ${error}\n`)
  }
}

module.exports = {
  initListener
}
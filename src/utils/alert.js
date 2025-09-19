const axios = require('axios');
const mail = require('./mail')
const { APP_INFO } = require('./constant')

const sendAlert = async (rows) => {
  const data = {
    ...rows,
    ...APP_INFO
  }

  let template = 'mail/alert_job'
  let subject = `Alert Error Job ${process.env.APP_NAME} || ${process.env.NODE_ENV} ${process.env.APP_ENV}`

  if (rows?.alert_type === 'exception') {
    template = 'mail/exception'
    subject = `Alert Exception ${process.env.APP_NAME} || ${process.env.NODE_ENV} ${process.env.APP_ENV}`
  } else if (rows?.alert_type === 'exception-url') {
    template = 'mail/url'
    subject = `Alert Exception ${process.env.APP_NAME} || ${process.env.NODE_ENV} ${process.env.APP_ENV}`
  }
  // Check if MAIL_ALERT_LIST is defined before sending email
  if (!process.env.MAIL_ALERT_LIST) {
    console.warn('MAIL_ALERT_LIST not configured, skipping email alert')
    return { status: 'skipped', message: 'MAIL_ALERT_LIST not configured' }
  }

  const status = await mail.init()
    .to(process.env.MAIL_ALERT_LIST.split(','))
    .subject(subject)
    .html(template, { data })
    .send()

  return status
}

const sendAlertSlack = async (rows) => {
  const data = {
    ...rows,
    ...APP_INFO
  };
  return 'captured-not-sent-to-slack';//sementara di hide dulu
};

module.exports = {
  sendAlert,
  sendAlertSlack
}

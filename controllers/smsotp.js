import TrezSMSClient from '@/utils/Trez'

const smsuser = process.env.SMSUSER
const smspass = process.env.SMSPASS
const client = new TrezSMSClient(smsuser, smspass)

function sendSMS(userNumber) {
  console.log('message sent to ', userNumber)
  client
    .autoSendCode(userNumber, 'karbakar.ir')
    .then(messageId => {
      console.log('Sent Message ID: ' + messageId)
    })
    .catch(error => console.log('sms sendig catch a problem', error))
}

function SMSOtpvalidator(userNumber, SMSCode) {
  return new Promise((resolve, reject) => {
    client
      .checkCode(userNumber, SMSCode)
      .then(isValid => {
        console.log('isValid => ', isValid)
        resolve(isValid)
      })
      .catch(error => {
        console.log(error)
        reject(error)
      })
  })
}

export { sendSMS, SMSOtpvalidator }

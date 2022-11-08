const admin = require('firebase-admin')
// const { UserRecord } = require('firebase-admin/lib/auth/user-record')
const serviceAccount = require('./dukindroid-firebase-test-firebase-adminsdk-fwngu-6b6f69859f.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dukindroid-firebase-test.firebaseio.com'
})

module.exports = admin.auth()

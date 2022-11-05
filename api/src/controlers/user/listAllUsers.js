const admin = require('firebase-admin')
// const { UserRecord } = require('firebase-admin/lib/auth/user-record')
const serviceAccount = require('./dukindroid-firebase-test-firebase-adminsdk-fwngu-6b6f69859f.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dukindroid-firebase-test.firebaseio.com'
})
const myUsers = []
const auth = admin.auth()

const listAllUsers = (nextPageToken) => {
  // List batch of users, 10 at a time.
  const myUsers = []
  auth.listUsers(10, nextPageToken).then((listUsersResult) => {
    listUsersResult.users.forEach((userRecord) => {
      // myUsers.push(userRecord.email)
      // console.log(JSON.stringify(userRecord))
      const { photoURL, displayName, email, uid } = userRecord
      const obj = {
        photoURL,
        displayName,
        email,
        uid
      }
      console.dir(JSON.stringify(obj))
      // console.log(`${(photoURL) ? photoURL : 'sin imagen'} ${uid} ${(displayName) ? displayName + ' ' + email : email}`)
      myUsers.push(obj)
    })
    if (listUsersResult.pageToken) {
      // List next batch of users.
      listAllUsers(listUsersResult.pageToken)
    }
    return myUsers
  }).catch((error) => {
    console.log('Error listing users:', error)
  })
}

module.exports = listAllUsers

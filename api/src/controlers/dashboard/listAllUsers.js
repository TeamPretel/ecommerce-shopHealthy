const auth = require('./initFAdmin')

const listAllUsers = async (nextPageToken) => {
  // List batch of users, 1000 at a time.
  const listUsersResult = await auth.listUsers(1000, nextPageToken)
  const myUsers = []
  listUsersResult.users.forEach((userRecord) => {
    const { photoURL, displayName, email, metadata, customClaims, tokensValidAfterTime, uid } = userRecord
    // console.dir(metadata.creationTime)
    // console.log(userRecord.creationTime)
    const obj = {
      uid,
      photoURL,
      displayName,
      email,
      created: metadata.creationTime,
      role: (customClaims !== undefined) ? customClaims.role : 'Regular',
      tokensValidAfterTime
    }
    myUsers.push(obj)
  })
  return myUsers
// console.log(myUsers)
// if (listUsersResult.pageToken) {
//   // List next batch of users.
//   listAllUsers(listUsersResult.pageToken)
// }
// })
// .catch((error) => {
//   console.log('Error listing users:', error)
// })
}

module.exports = listAllUsers

/*
// List batch of users, 10 at a time.
  const myUsers = []
  await auth.listUsers(1000, nextPageToken).then((listUsersResult) => {
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
    // console.log(myUsers)
    return myUsers
  }).catch((error) => {
    console.log('Error listing users:', error)
  })
*/

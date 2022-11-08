const auth = require('./initFAdmin')

const setUserRole = async (email, role) => {
  const myUser = await auth.getUserByEmail(email)
  console.log(`uid: ${myUser.uid} Rol: ${role}`)
  auth.setCustomUserClaims(myUser.uid, { role: 'admin' })
  const newUser = await auth.getUserByEmail(email)
  const newJson = JSON.stringify(newUser)
  console.log(`uid: ${JSON.stringify(newUser)} Rol: ${newJson.customClaims}`)
  // .then(() => {
  // The new custom claims will propagate to the user's ID token the
  // next time a new one is issued.
  // })
}

module.exports = setUserRole

const auth = require('./initFAdmin')

const deleteUser = async (email) => {
  // TODO: AGREGAR TRY CATCH!!!!
  const myUser = await auth.getUserByEmail(email)
  auth.deleteUser(myUser.uid)
}

module.exports = deleteUser

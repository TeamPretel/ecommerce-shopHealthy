const auth = require('./initFAdmin')

const deleteUser = async (email) => {
  try {
    const myUser = await auth.getUserByEmail(email)
    auth.deleteUser(myUser.uid)
  } catch (error) {
    throw Error(`Fallas al borrar a ${email}: ${error}.`)
  }
}

module.exports = deleteUser

const auth = require('./initFAdmin')

const createUser = async (newUserInfo) => {
  console.log('Crear al usuario: ' + JSON.stringify(newUserInfo))
  try {
    const newUser = await auth.createUser(newUserInfo)
    return newUser.uid
  } catch (error) {
    return Error(`Fallas al crear a ${newUserInfo.email}: ${error}.`)
  }
}

module.exports = createUser

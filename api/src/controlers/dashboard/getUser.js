const auth = require('./initFAdmin')

const getUser = async (email) => {
  try {
    // debugger
    console.log('Buscar a ' + email)
    const found = await auth.getUser(email)
    if (!found) {
      throw Error('No se encontró')
    } else {
      return found
    }
  } catch (error) {
    return Error(`Fallas al traer a ${email}: ${error}.`)
  }
}

module.exports = getUser

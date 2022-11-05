const { SUPER_ADMIN, ADMIN, REGULAR, GUEST } = require('./roles')

const setUserRole = async (user, role) => {
  switch (role) {
    case SUPER_ADMIN:
      // Agregar logica acá
      return
    case ADMIN:
      // Y acá
      return
    case REGULAR:
      // También acá
      return
    case GUEST:
      // Y ya mínimo aquí.
      return
    default:
      throw Error({ message: `Valor inesperado: ${role}, en setUserRole` })
  }
}

module.exports = setUserRole

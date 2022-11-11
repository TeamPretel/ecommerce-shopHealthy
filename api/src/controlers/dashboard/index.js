const listAllUsers = require('./listAllUsers')
const setUserRole = require('./setUserRole')
const deleteUser = require('./deleteUser')
const createUser = require('./createUser')
const updateUser = require('./updateUser')
const getUser = require('./getUser')

module.exports = {
  listAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  setUserRole
}

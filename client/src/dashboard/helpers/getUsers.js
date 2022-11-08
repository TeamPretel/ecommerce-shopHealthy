import axios from 'axios'
// const axios = require('axios').default
// var json = await axios.get("127.0.0.1:3001/tresmiluno/dashboard");
// json.data

export const getUsers = async () => {
  const allUsers = await (await fetch("http://127.0.0.1:3001/tresmiluno/dashboard")).json()
  console.dir(allUsers)
  return allUsers
};

// const datos = []
// (
//   async () => {
//     datos = await getUsers()
//     // console.log(JSON.stringify(datos))
//   }
// )()

// const users = getUsers()

// export default users
// default module.default = datos;

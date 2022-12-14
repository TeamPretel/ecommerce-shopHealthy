import { type } from "../../types/index"

const initialState = {
  nombre: "user",
  mail:'',
  logged: false,
  uid: '',
  adminId: '7BR9KLQrvcVRvazx1gfEZYyaujz2',
  isAdmin:false,
  apellido:'',
  direccion:'',
  codPostal:0,
  telefono:0,
  dni:0,
  img:'',
  usuarios:[]
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case type.login:
      return {
        ...state,
        nombre: action.payload.nombre? action.payload.nombre : 'user' ,
        logged: true,
        mail: action.payload.mail,
        uid: action.payload.uid || state.uid ,
        isAdmin: (state.adminId === action.payload.uid)?true:false,
        apellido: action.payload.apellido,
        direccion: action.payload.direccion,
        dni: action.payload.dni,
        telefono: action.payload.telefono,
        codPostal: action.payload.codPostal,
        img: action.payload.img
      };

    case type.logout:
      return {
        nombre: "",
        mail:'',
        logged: false,
        uid: '',
        adminId: '7BR9KLQrvcVRvazx1gfEZYyaujz2',
        isAdmin:false,
        apellido:'',
        direccion:'',
        codPostal:0,
        telefono:0,
        dni:0,
        usuarios: state.usuarios,
        img: ''
      };
    case'LOAD_USERS':
      return {
        ...state,
        usuarios: action.payload
      }
    case 'SET_IMG':
      return {
        ...state,
        img: action.payload
      }
    

    default:
      return state;
  }
};

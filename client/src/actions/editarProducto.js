import axios from "axios";

export function editarProducto(data, id){
  return async function (dispatch) {
    let json = await axios.put(`https://healthyback.onrender.com/tresmiluno/producto/admin/${id}`,data);
    console.log(json, 'back')
    return dispatch({ type:'MODIFICAR_PRODUCTO', payload:json});
    }
  }


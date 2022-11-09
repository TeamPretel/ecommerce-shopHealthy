import axios from "axios";

export function editarProducto(data, id){
  return async function (dispatch) {
    let json = await axios.put(`https://henryhealthy.shop/tresmiluno/producto/admin/${id}`,data);
    return dispatch({ type:'MODIFICAR_PRODUCTO', payload:json});
    }
  }


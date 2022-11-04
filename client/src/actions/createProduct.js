import axios from "axios";

export function createProduct(name){
  return async function (dispatch) {
    var json = await axios.post("https://henryhealthy.shop/tresmiluno/producto/admin/crear",name);
    return dispatch({ type:'CREATE_PRODUCT', payload:json});
    }
  }

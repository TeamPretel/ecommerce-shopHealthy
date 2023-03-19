import axios from "axios";

export function createProduct(){
  return async function (dispatch) {
    var json = await axios.post("https://healthyback.onrender.com/tresmiluno/crear",);
    return dispatch({ type:'CREATE_REVIEW', payload:json});
    }
  }

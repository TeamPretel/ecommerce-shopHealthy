import axios from 'axios';

export const postContactoMensaje = (info) => {
    return async function (dispatch){

        try{
            var json = await axios.post('https://henryhealthy.shop/tresmiluno/usuario/consulta',info)
            return dispatch({ type: 'POST_CONTACTO_MENSAJE', payload: json })
            

        }catch(error){
                console.log(error)
        }        
    }
}; 
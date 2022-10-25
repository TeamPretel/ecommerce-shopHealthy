import axios from 'axios';

export const postContactoMensaje = (info) => {
    return async function (dispatch){

        try{
            var json = await axios.post('http://localhost:3001/tresmiluno/usuario/consulta',info)
            return dispatch({ type: 'POST_CONTACTO_MENSAJE', payload: json })
            

        }catch(error){
                alert(error.response.data)
        }        
    }
}; 
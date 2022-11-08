import axios from 'axios';

export const payMercadoPago = (info) => {
    console.log(info,'esto es el action')
    return async function (dispatch){

        try{
            var json = await axios.post('https://henryhealthy.shop/tresmiluno/compra/pago',info)
            
            console.log(json.data.init_point,'esto es un acyion')
            
            return dispatch({ type: 'PAY_MERCADO_PAGO', payload: json.data })
            

        }catch(error){
                alert(error.response.data)
        }        
    }
}; 
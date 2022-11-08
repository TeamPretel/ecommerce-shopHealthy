import axios from 'axios';

export const PaidMercadoPago = (info) => {
    console.log(info,'esto es el action')
    return async function (dispatch){

        try{
            var json = await axios.post('https://henryhealthy.shop/tresmiluno/compra/pago',info)

            console.log(json.data.init_point,'esto es un action')

            return dispatch({ type: 'PAID_MERCADO_PAGO', payload: json.data })


        }catch(error){
                alert(error.response.data)
        }
    }
    
};

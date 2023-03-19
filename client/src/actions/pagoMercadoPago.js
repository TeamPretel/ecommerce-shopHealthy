import axios from 'axios';

export const PaidMercadoPago = (info) => async (dispatch) => {
        
        try{
            console.log('entra pero hasta ahi nomas')

            dispatch({type:'SET_ISLOADING_MERCADO_FALSE'})
            var json = await axios.post('https://healthyback.onrender.com/tresmiluno/compra/pago',info)
            console.log(json.data.init_point,'ESTA ES LA ACTION.')
            
            dispatch({ type: 'PAID_MERCADO_PAGO', payload: json.data })
            dispatch({type:'SET_ISLOADING_MERCADO_TRUE'})
            

        }catch(error){
                console.log(error)
        }
    
    
};

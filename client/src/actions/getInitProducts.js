import { getAllProducts } from "../helpers/index";

export const initProducts = ()=>{

    return async ( dispath)=>{
        dispath({type: 'FETCH_INIT_PRODUCTS'})
        try {
            const allProducts = await getAllProducts();
            dispath({
                type: 'SUCCESS_FETCH_INIT_PRODUCTS',
                payload: {data: allProducts, cat: 'All'},
            })
        } catch (error) {
            dispath({
                type: 'ERROR_FETCH_INIT_PRODUCTS',
                payload: error
            })
            console.error(error.message);
        }

    }
}
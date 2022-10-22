
const initialState = {
    products: [],
    allProducts: [],
    isLoading: null,
    error: null,
    categ: null,
    categName: ['TENTACION SALUDABLE','ALACENA SALUDABLE','ESTILO DE VIDA','BEBIDAS'],
    setBanner: true
}
export const catalogReducer = (state= initialState, action)=>{
    switch (action.type) {
        case 'FETCH_INIT_PRODUCTS':
            return {
                ...state,
                isLoading: true
            };
        case 'SUCCESS_FETCH_INIT_PRODUCTS':
            return{
                ...state,
                products: action.payload.data,
                allProducts: action.payload.data,
                isLoading: false,
                categ:action.payload.cat,
                setBanner: true
            }
        
        case 'ERROR_FETCH_INIT_PRODUCTS':
            return{
                ...state,
                error: action.payload,
                products:[],
                isLoading: false
            }
        case 'SET_ISLOADING_TRUE':
            return{
                ...state,
                isLoading: true
            }   
        case 'SET_ISLOADING_FALSE':
            return{
                ...state,
                isLoading: false
            }
        case 'FILTER_BY_CATEGORY':
            return{
                ...state,
                products: action.payload.data,
                categ: action.payload.cat,
                setBanner: false
            }
        case 'RESET_CATEG_NAME':
            return{
                ...state,
                categName: action.payload,
                products: allProducts
            }
        default:
            return state;
    }
}
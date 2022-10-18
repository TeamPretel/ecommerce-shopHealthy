
const initialState = {
    products: [],
    allProducts: [],
    isLoading: null,
    error: null,
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
                products: action.payload,
                allProducts: action.payload,
                isLoading: false
            }
        
        case 'ERROR_FETCH_INIT_PRODUCTS':
            return{
                ...state,
                error: action.payload,
                products:[],
                isLoading: false
            }
        default:
            return state;
    }
}
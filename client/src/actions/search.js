export const generalSearch = string => (dispatch, getState) => {
    const {allProducts} = getState().catalogReducer;
    const result = allProducts.filter( el => {if (el.nombre.toLowerCase().includes(string.toLowerCase())) return el} );
    console.log(result)
    dispatch({
        type: 'SEARCH', 
        payload: {data: result, search:`resultado de la busqueda "${string}"`},
        
    })
}


export const filterByCateg = (categName) => (dispatch, getState) =>{
    const {allProducts} = getState().catalogReducer;
    const filteredProducts = allProducts.filter(el => el.categoria.find(ele => ele.nombre.toLowerCase() === categName ));

    dispatch( {type: 'FILTER_BY_CATEGORY', payload: {data:filteredProducts, cat: categName}});
}

export const resetCateg = () => (dispatch) =>{
    dispatch({type: 'RESET_CATEG_NAME', payload:['TENTACION SALUDABLE','ALACENA SALUDABLE','ESTILO DE VIDA','BEBIDAS']})
}
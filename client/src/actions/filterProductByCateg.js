

export const filterByCateg = categName => (dispatch, getState) =>{
    const {allProducts} = getState().catalogReducer;
    const filtered = allProducts.filter(el => el.categoria.find(ele => ele.nombre.toLowerCase() === categName ));
    // dispatch( {type: 'ADD'})
    console.log(filtered)
    dispatch( {type: 'FILTER_BY_CATEGORY', payload: {data:filtered, cat: categName}});
}

export const resetCateg = () => (dispatch) =>{
    dispatch({type: 'RESET_CATEG_NAME', payload:['TENTACION SALUDABLE','ALACENA SALUDABLE','ESTILO DE VIDA','BEBIDAS']})
}

export const addNestedFilter = categName => (dispatch, getState) =>{
    if(categName === null) return;
    const { filteredProducts, nestedFilter, allProducts } = getState().catalogReducer;
    let dataToFilter = filteredProducts;
    if ( filteredProducts.length < 1 ) dataToFilter = allProducts;
    
    let filtered = nestedFilter.concat( dataToFilter.filter( el => el.categoria.find( categ => categ.nombre.toLowerCase() === categName.toLowerCase())));
    
    // dispatch( {type: 'ADD_NESTED_FILTER', payload: { data:filtered, cat: categName } });
}
export const removeNestedFilter = categName => (dispatch, getState) =>{
    // if(categName === null) return;
    const { nestedFilter, filteredProducts, allProducts } = getState().catalogReducer;
    let filtered = nestedFilter.filter( el => el.categoria.filter( categ => !categ.nombre.toLowerCase() === categName.toLowerCase() ) );
    // let map =    ed.filter(el => map[el.id] ? false : map[el.id] = true);

    let dataToShow = filtered;
    let newNestedFilter = filtered;

    if ( dataToShow.length < 1 ) {
        dataToShow = filteredProducts;
        newNestedFilter = [];
    }
    if ( filteredProducts.length < 1 ) dataToShow = allProducts;


    // dispatch( {type: 'REMOVE_FILTER', payload: { data: dataToShow, newNested: newNestedFilter, cat: categName }});
}
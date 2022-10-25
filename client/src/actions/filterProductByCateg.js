

export const filterByCateg = categName => (dispatch, getState) =>{
    const {allProducts} = getState().catalogReducer;
    const filtered = allProducts.filter(el => el.categoria.find(ele => ele.nombre.toLowerCase() === categName.toLowerCase() ));
    console.log(filtered)
    dispatch( {type: 'FILTER_BY_CATEGORY', payload: {data:filtered, cat: categName}});
}

export const addNestedFilter = categName => (dispatch, getState) =>{
    if(categName === null) return;
    const { filteredProducts, nestedFilter, allProducts } = getState().catalogReducer;
    let dataToFilter = filteredProducts;
    if ( filteredProducts.length < 1 ) dataToFilter = allProducts;
    
    let filtered = nestedFilter.concat( dataToFilter.filter( el => el.categoria.find( categ => categ.nombre.toLowerCase() === categName.toLowerCase())));
    
    dispatch( {type: 'ADD_NESTED_FILTER', payload: { data:filtered, cat: categName } });
}
export const removeNestedFilter = categName => (dispatch, getState) =>{
    // if(categName === null) return;
    const { nestedFilter, filteredProducts, allProducts } = getState().catalogReducer;
    let filtered = nestedFilter.filter( el => {
                                                let isValid = true;
                                                el.categoria.map( categ => {
                                                    if (categ.nombre.toLowerCase() !== categName.toLowerCase()) isValid = false;
                                                } );
                                                if ( isValid ) return el;

    });
    let map ={}
    let maped = filtered.filter(el => map[el.id] ? false : map[el.id] = true);
    console.log(maped)
    let dataToShow = maped;
    let newNestedFilter = maped;

    if ( dataToShow.length < 1 ) {
        dataToShow = filteredProducts;
        newNestedFilter = [];
    }
    else if ( dataToShow.length < 1 && filteredProducts.length < 1 ) dataToShow = allProducts;


    dispatch( {type: 'REMOVE_FILTER', payload: { data: dataToShow, newNested: newNestedFilter, cat: categName }});
}
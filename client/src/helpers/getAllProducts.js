export const getAllProducts = async()=>{

    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/productos')).json();
    return allProducts;

    // const allProducts = await (await fetch('http://31.220.49.30:3001/productos')).json();
    //const allProducts = await (await fetch('http://localhost:3001/productos')).json();
   // return allProducts.sort( (a,b) => (a['nombre'] > b['nombre'] ? 1 : a['nombre'] < b['nombre'] ? -1 : 0));

}
export const getAllProducts = async()=>{
    const allProducts = await (await fetch('http://31.220.49.30:3001/productos')).json();
    return allProducts;
}
export const getProductById = async(id)=>{
    const url = `http://31.220.49.30:3001/productos/${id}`
    const product = await (await fetch(url)).json();
    return product;
}
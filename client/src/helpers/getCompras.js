export const getCompras = async(id)=>{

    const url = `https://healthyback.onrender.com/tresmiluno/venta/${id}`

    const products = await (await fetch(url)).json();
    return products;
}
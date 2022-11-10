export const getCompras = async(id)=>{

    const url = `https://henryhealthy.shop/tresmiluno/venta/${id}`

    const products = await (await fetch(url)).json();
    return products;
}
export const getAllProducts = async()=>{
    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/productos')).json();
    return allProducts;
}
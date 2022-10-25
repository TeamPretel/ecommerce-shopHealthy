export const getProductById = async(id)=>{
    const url = `https://back.dkndrd.com/tresmiluno/producto/${id}`
    const product = await (await fetch(url)).json();
    const result = {...product, img: product.img.slice(26)}
    return result;
}
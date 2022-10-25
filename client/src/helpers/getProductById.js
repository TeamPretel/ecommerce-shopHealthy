export const getProductById = async(id)=>{
<<<<<<< HEAD
    const url = `https://back.dkndrd.com/tresmiluno/productos/${id}`
=======
    const url = `https://back.dkndrd.com/tresmiluno/producto/${id}`
>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
    const product = await (await fetch(url)).json();
    const result = {...product, img: product.img.slice(26)}
    return result;
}
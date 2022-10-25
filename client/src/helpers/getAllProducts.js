export const getAllProducts = async()=>{
<<<<<<< HEAD
    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/producto')).json();
=======
    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/productos')).json();
>>>>>>> origin/ramajavo
    return allProducts;
}
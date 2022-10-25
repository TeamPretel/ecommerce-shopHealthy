import {marcas} from './marcasPrueba'

export const getAllProducts = async()=>{
<<<<<<< HEAD
<<<<<<< HEAD
    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/producto')).json();
=======
    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/productos')).json();
>>>>>>> origin/ramajavo
    return allProducts;
=======

    const allProducts = await (await fetch('https://back.dkndrd.com/tresmiluno/producto')).json();

    const productsMarcas = allProducts.map( el => {return {...el, marcaId: marcas.find(ele=>el.marcaId == ele.id)}});
    // const allProducts = await (await fetch('http://31.220.49.30:3001/productos')).json();
    //const allProducts = await (await fetch('http://localhost:3001/productos')).json();
    return productsMarcas.sort( (a,b) => (a['nombre'] > b['nombre'] ? 1 : a['nombre'] < b['nombre'] ? -1 : 0));

>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
}
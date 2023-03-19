import {marcas} from './marcasPrueba'

export const getAllProducts = async()=>{

    const allProducts = await (await fetch('https://healthyback.onrender.com/tresmiluno/producto', {
        mode: 'no-cors',
        credentials: 'include'
    })).json();

    const productsMarcas = allProducts.map( el => {return {...el, marcaId: marcas.find(ele=>el.marcaId == ele.id)}});
    // const allProducts = await (await fetch('http://31.220.49.30:3001/productos')).json();
    //const allProducts = await (await fetch('http://localhost:3001/productos')).json();
    return productsMarcas.sort( (a,b) => (a['nombre'] > b['nombre'] ? 1 : a['nombre'] < b['nombre'] ? -1 : 0));

}
export const getUsuarios = async()=>{

    const url = 'https://henryhealthy.shop/tresmiluno/usuario/usuarios'

    const usuarios = await (await fetch(url)).json();
    
    return usuarios;

}
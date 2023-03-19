export const getUsuarios = async()=>{

    const url = 'https://healthyback.onrender.com/tresmiluno/usuario/usuarios'

    const usuarios = await (await fetch(url)).json();
    
    return usuarios;

}
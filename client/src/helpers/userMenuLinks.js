
  export const usuarioLogged = (nombre = 'usuario')=>{
    const nombreToShow = nombre.split(" ")[0];
    return [
      {
        label: 'Mi perfil',
        link: `/usuario/${nombreToShow}/preferencias`
      },
      {
        label: `Lista de deseos`,
        link: `/usuario/${nombreToShow}/lista-de-deseos`
      },{
        label: `Compras`,
        link: `/usuario/${nombreToShow}/mis_compras`
      },
    ]
  }  
  export const admin =[
    {
      label: 'Mi perfil',
      link: '/admin/nombre'
    },
    {
      label: 'Lista de deseos',
      link: '/admin/nombre/lista-de-deseos'
    },
    {
      label: 'Dashboard',
      link: '/admin/nombre/dashboard'
    },
    {
      label: 'Administracion de productos',
      link: '/admin/nombre/administracion'
    },
  ]

  export const usuarioLogged = (nombre = 'usuario')=>{
    const nombreToShow = nombre.split(" ")[0];
    return [
      {
        label: 'Mi perfil',
        link: `/usuario/${nombreToShow}/perfil`
      },
      // {
      //   label: `Lista de deseos`,
      //   link: `/usuario/${nombreToShow}/lista-de-deseos`
      // },
      {
        label: `Compras`,
        link: `/usuario/${nombreToShow}/mis_compras`
      },
    ]
  }  
  export const admin = (nombre = 'usuario')=>{
    const nombreToShow = nombre.split(" ")[0];
    return [
      {
        label: 'Mi perfil',
        link: `/usuario/${nombreToShow}/perfil`
      },
  
      {
        label: 'Dashboard',
        link: `/admin/dashboard/app`
      },
    ]
  }  
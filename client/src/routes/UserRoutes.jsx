import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header_comp } from '../components/Header'
import { Preferencias, Review, Shopping, User } from '../pages'
import { EditarUsuario } from '../pages/EditUsuario'
import { MisCompras } from '../pages/MisCompras'
import { Perfil } from '../pages/Perfil'

export const UserRoutes = () => {
  return (
    <div>
        <Header_comp />
        <Routes>
          <Route index element={<Perfil />} />
          {/* <Route path="/:nombre/comprar" element={<Shopping />} /> */}
          <Route path="/:nombre/mis_compras" element={<MisCompras />} />
          <Route path="/:nombre/usuario" element={<User />} />
          <Route path="/:nombre/preferencias" element={<Preferencias />} />
          <Route path="/:nombre/perfil" element={<Perfil />} />
          <Route path="/:nombre/perfil/editar" element={<EditarUsuario />} />
          <Route path="/:nombre/review" element={<Review />} />
        </Routes>
    </div>
  )
}

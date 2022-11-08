import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Header_comp } from '../components/Header'
import { Preferencias, Review, Shopping, User } from '../pages'
import { MisCompras } from '../pages/MisCompras'

export const UserRoutes = () => {
  return (
    <div>
        <Header_comp />
        <Routes>
          <Route index element={<Shopping />} />
          <Route path="/:nombre/comprar" element={<Shopping />} />
          <Route path="/:nombre/mis_compras" element={<MisCompras />} />
          <Route path="/:nombre/usuario" element={<User />} />
          <Route path="/:nombre/preferencias" element={<Preferencias />} />
          <Route path="/:nombre/review" element={<Review />} />
        </Routes>
    </div>
  )
}

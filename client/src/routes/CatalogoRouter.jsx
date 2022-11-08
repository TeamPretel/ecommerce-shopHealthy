import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { CartFlotingButton } from '../components/CartFlotingButton'
import { NavBar } from '../components/NavBar'
import { Home, ProductDetail } from '../pages'

export const CatalogoRouter = () => {
  return (
    <div>
        <NavBar />
        <CartFlotingButton/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path=":id" element={<ProductDetail />} />
        </Routes>
    </div>
  )
}

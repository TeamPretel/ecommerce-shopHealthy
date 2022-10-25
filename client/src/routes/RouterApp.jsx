import Search from "@mui/icons-material/Search";
import { Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import {
  Admin,
  Contact,
  Home,
  LandingPage,
  Login,
  ProductDetail,
  Register,
  Shopping,
  User,
  CrearProducto,
} from "../pages/index";

export const RouterApp = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/catalogo" element={<Home />} />
        <Route path="/catalogo/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/comprar" element={<Shopping />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/producto" element={<CrearProducto />} />
      </Routes>
    </>
  );
};

//home || detalles de producto|| carrito de compras || login || registro||contacto|| panel de usuario || panel de administrador ||

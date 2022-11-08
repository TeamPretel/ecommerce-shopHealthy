import Search from "@mui/icons-material/Search";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "../auth/ProtectRoutes";
import { NavBar } from "../components/NavBar";
import  {DashBoardApp}  from '../dashboard/DashBoardApp';
import RouterDashBoard from "../dashboard/routes";
import {
  Admin,
  Contact,
  Home,
  
  Login,
  ProductDetail,
  Register,
  Shopping,
  User,
  CrearProducto,
  Preferencias,
} from "../pages/index";
import NotFound404 from "../pages/NotFound404";
import { CatalogoRouter } from "./CatalogoRouter";
import { UserRoutes } from "./UserRoutes";
import { useContext } from 'react';
import { AuthContext } from "../auth/AuthContext";

export const RouterApp = () => {
  const {user} = useContext(AuthContext)
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute isAllowed={user.logged} />} >
          <Route path="/usuario/*" element={<UserRoutes />} />
        </Route>
        <Route element={<ProtectedRoute isAllowed={user.logged && user.isAdmin} />} >
          <Route path="/admin/*" element={<RouterDashBoard />} />
        </Route>
        <Route path="/" element={<Navigate to='/catalogo' />} />
        <Route path="/catalogo/*" element={<CatalogoRouter />} />
        <Route path="/acceso" element={<Login />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/registro" element={<Register />} />
        <Route path="/producto" element={<CrearProducto />} />
        <Route path="/no_encontrado" element={<NotFound404/>}/>
        <Route path="/*" element={<NotFound404 />} />
      </Routes>
    </>
  );
};

//home || detalles de producto|| carrito de compras || login || registro||contacto|| panel de usuario || panel de administrador ||

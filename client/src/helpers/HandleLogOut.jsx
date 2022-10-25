import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { type } from '../../types/index'
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React from 'react'
import { Typography } from "@mui/material";
import {getAuth, signOut} from 'firebase/auth';
import firebaseApp from '../credenciales';
const auth= getAuth(firebaseApp);

function handleLogOut() {

    const { user,dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const HandleLogout = (e) => {
        e.preventDefault();
        dispatch({ type: type.logout})
        signOut(auth)
        navigate('/catalogo', { 
            replace: true
        })
        }
    
        
    return (
            <Typography
                onClick={HandleLogout}
                sx={{ my: 2, color: "white", display: "block" }}
                component={RouterLink}
            >
                Cerrar Sesión
            </Typography>
)
}

export default handleLogOut









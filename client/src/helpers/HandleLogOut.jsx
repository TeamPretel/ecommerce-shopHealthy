import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { type } from '../../types/index'
import { useNavigate, Link as RouterLink } from "react-router-dom";
import React from 'react'
import { Typography } from "@mui/material";
import {getAuth, signOut} from 'firebase/auth';
import firebaseApp from '../credenciales';
import Swal from 'sweetalert2'

const auth= getAuth(firebaseApp);

function handleLogOut() {

    const { user,dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const HandleLogout = (e) => {
        e.preventDefault();
        dispatch({ type: type.logout})
        signOut(auth)
        localStorage.setItem("cart", []);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Hasta luego',
            showConfirmButton: false,
            timer: 1500
          });
        navigate('/catalogo', { 
            replace: true
        })
        }
    
        
    return (
            <Typography
                onClick={HandleLogout}
                sx={{ my: 0, color: '#64B98B', 
                      fontFamily: 'roboto', textDecoration:'none', 
                      "&:hover":{color:'tomato', fontWeight:600} }}
                component={RouterLink}
            >
                Cerrar Sesión
            </Typography>
)
}

export default handleLogOut









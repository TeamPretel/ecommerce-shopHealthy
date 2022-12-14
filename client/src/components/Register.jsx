import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Home, Preferencias } from '../pages';
import{Link as RouterLink} from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContext";
import { type } from "../../types";
import firebaseApp from '../credenciales'
import { useForm, Controller } from 'react-hook-form';


import {getAuth, createUserWithEmailAndPassword, signInWithRedirect,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
const auth= getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();
import Swal from 'sweetalert2'
import validator from 'validator'
import { FormularioPreferencias } from './FormularioPreferencias';
import { Stack } from '@mui/system';
import { Footer_comp } from './Footer';
import axios from 'axios';
import { getUsuarios } from '../helpers/getUsuarios';
var emailRegex = new RegExp("^([A-Za-z]|[0-9])+$")


function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href={<Home />}>
        Henry Proyecto Grupal
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export const Register_comp = () => {

  const { handleSubmit, formState:{errors}, control, } = useForm();

  const { dispatch, user } = useContext(AuthContext);

  const [loadRegister, setLoadRegister] = useState(false)
  
  let navigate = useNavigate();

  const onSubmit = async (d) => {
    // console.log(email,password,'esto viene de los estados...')
      const correo= d.mail
      const contraseña= d.password
      console.log(d)
      let newData = {...d, codPostal:parseInt(d.codPostal), telefono:parseInt(d.telefono), isAdmin:false}
      console.log(newData)
      
      try {
          setLoadRegister(true);
          const usuario = await createUserWithEmailAndPassword(auth,correo,contraseña)
          console.log('DATOS USUARIO FIREBASE...')
          console.log(usuario)
          newData = {...newData, uid: usuario.user.uid}
          console.log(usuario.user.uid)
          console.log(newData)
          const action = {
            type: type.login,
            payload: {
              nombre: newData.nombre,
              apellido: newData.apellido,
              mail: usuario.user.email,
              direccion: newData.direccion,
              codPostal: newData.codPostal,
              telefono: newData.telefono,
              uid: usuario.user.uid,
              dni: newData.id
            }
          }
          dispatch(action)
          // localStorage.setItem('user',JSON.stringify(user))
          const backMesage = await axios.post('https://henryhealthy.shop/tresmiluno/usuario/crear',newData );
          console.log(backMesage)
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Registrado con Exito! ya falta menos 😋!',
            showConfirmButton: false,
            timer: 1000
          })
          setLoadRegister(false)
          navigate('/catalogo')
      } catch (error) {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Ya estas registrado',
          showConfirmButton: false,
          timer: 2000
        })
        setLoadRegister(false)
      }
    
    
    
  };

  const handleSubmitGoogle =  async  (e) => {

    try {
        signInWithPopup(auth, googleProvider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;

          const userGoogle = result.user;

          if(user.usuarios.find( el=> el.uid == userGoogle.uid)) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Ya estas registrado',
              showConfirmButton: false,
              timer: 2000
            });
            return
          }

          const action = {
            type: type.login,
            payload: {
              nombre: userGoogle.displayName? userGoogle.displayName.toLocaleLowerCase() : '',
              mail: userGoogle.email,
              uid: userGoogle.uid
            }
          }
          dispatch(action)

          navigate(`/usuario/user/preferencias`)
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          
          // The AuthCredential type that was used.
          //const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });      

    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ya estas registrado',
        showConfirmButton: false,
        timer: 2000
      })
    }

  };



  return (
    <>
      {
        !loadRegister 
            ?
        <Container component="main" sx={{p:{xs:0, md:5}, width:{sx:'100%', md:'60%'},}} >
            <Avatar sx={{ m: '5px auto',}}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" sx={{ m: '5px auto',textAlign:'center',pb:10 }} >
              Registro
            </Typography>

          <FormularioPreferencias control={control} errors={errors} Controller={Controller} />

            <Stack direction={{xs:'column', md:'row'}} spacing={2} >
              <Button
                onClick={handleSubmit(d=>onSubmit(d))}
                variant="contained"
                sx={{ width:{xs:'100%', md:'50%'},}}
              >
                Registrarse
              </Button>

              <Button
                onClick={handleSubmitGoogle} 
                variant="contained"
                sx={{ width:{xs:'100%', md:'50%'},}}
              >
              Registrate con Google
              </Button>
            </Stack>

            <Grid container justifyContent="flex-end">
                <Link component={RouterLink} to = '/acceso' variant="body2" sx={{pr:2, pt:1}} >
                  Ya tenes una cuenta? Has click aquí
                </Link>
            </Grid>
        {/* <Copyright /> */}
      </Container>
      :<Typography> Espere por favor </Typography>
      }
    </>
  );
};

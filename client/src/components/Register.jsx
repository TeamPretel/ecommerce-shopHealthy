import * as React from 'react';
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
import { Home } from '../pages';
import{Link as RouterLink} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { type } from "../../types";
import firebaseApp from '../credenciales'
import {getAuth, createUserWithEmailAndPassword, signInWithRedirect,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
const auth= getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href={<Home/>}>
      Henry Proyecto Grupal 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export const Register_comp = () =>{
  const {dispatch} = useContext(AuthContext); 
  let navigate = useNavigate();

  const handleSubmit =  async  (e) => {
    e.preventDefault();
    const correo= e.target.email.value
    const contraseña= e.target.password.value
    console.log(correo,contraseña)
    
    const usuario = await createUserWithEmailAndPassword(auth,correo,contraseña)
    console.log(usuario)

    const action = {
      type: type.login,
      payload: {
        name: usuario.user.email
      }
    }
    dispatch(action)
    console.log(action)
    alert('EXITO, falta componente MATERIAL UI')
    
    navigate('/catalogo')


  };

  const handleSubmitGoogle =  async  (e) => {
    signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      console.log(token, 'token....')
      console.log(result , 'resultado...de google.')
      // The signed-in user info.
      const user = result.user;
      // ...
      console.log(user, 'Usuario.')
    }).then( navigate('/catalogo')
    )
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

    // const result = await getRedirectResult(auth);
    // console.log(result)
    // if (result) {
    //   // This is the signed-in user
    //   const user = result.user;
    //   // This gives you a Facebook Access Token.
    //   const credential = provider.credentialFromResult(auth, result);
    //   const token = credential.accessToken;
    // }

    // const action = {
    //   type: type.login,
    //   payload: {
    //     name: usuario.user.email
    //   }
    // }
    // dispatch(action)
    // console.log(action)
    alert('EXITO, falta componente MATERIAL UI')
   

  };










  return (
      <Container component="main" maxWidth="xs" sx={{marginTop:"100px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid> */}
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid> */}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quiero recibir ofertas y novedades via email."
                />
              </Grid> 
            </Grid>
            <Button
            onClick={handleSubmitGoogle} 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Registrate con Google
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarse
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to = '/login' variant="body2">
                  Ya tenes una cuenta? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
  );
}
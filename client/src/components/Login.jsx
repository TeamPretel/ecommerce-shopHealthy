// import { AuthContext } from "../auth/AuthContext";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Home, Register } from "../pages";
import { Link as RouterLink } from "react-router-dom";
import firebaseApp from '../credenciales'
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
<<<<<<< HEAD
// import { useContext } from "react";
=======

import { useContext } from "react";
>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
=======

import { useContext } from "react";
>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
import { AuthContext } from "../auth/AuthContext";
import {getAuth, createUserWithEmailAndPassword, signInWithRedirect,GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
import { type } from "../../types";
const auth= getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider();

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
=======

>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
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


export const Login_comp =  () => {
  const {dispatch} = useContext(AuthContext); 
  // console.log(user)
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();    
    const correo= e.target.email.value
    const contraseña= e.target.password.value
    // console.log(correo,contraseña)
    const usuario = await signInWithEmailAndPassword(auth,correo,contraseña)

    const action = {
      type: type.login,
      payload: {
        name: usuario.user.email
      }
    }
    dispatch(action)
    console.log(action)
    // console.log(usuario)
    // let valor = true;
    // updateState(valor)
    // console.log(logeado, 'estado en el Login')
    
    navigate('/producto')
    
    // const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
  };

<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
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
      const action = {
        type: type.login,
        payload: {
          name: user.email
        }
      }
      dispatch(action)
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

  
    // console.log(action)
    alert('EXITO, falta componente MATERIAL UI')
   

  };



<<<<<<< HEAD
>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
=======
>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
  return (
      <Container component="main" maxWidth="xs" sx={{marginTop:"100px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Iniciar Sesión
            </Button>

<<<<<<< HEAD
<<<<<<< HEAD
            <Button onClick={() => signInWithRedirect(auth, googleProvider)} 
=======

            <Button onClick={handleSubmitGoogle} 
>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
            type="submit" fullWidth variant="contained" to='/catalogo' sx={{ mt: 1 }} >
             Inicia Sesión con Google
=======

<<<<<<< HEAD
            <Button onClick={handleSubmitGoogle} 
            type="submit" fullWidth variant="contained" to='/catalogo' sx={{ mt: 1 }} >
             Inicia Sesión con Google

>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
=======
>>>>>>> 70a1947cc1e80c4f7895339109536c501dcfe02d
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Olvidaste el password?
                </Link>
              </Grid>
              <Grid item>
                <Link component={RouterLink} to="/registro" variant="body2">
                  {"No tenes cuenta? Registrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
  );
};

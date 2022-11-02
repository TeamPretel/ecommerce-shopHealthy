import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import MarkunreadMailboxIcon from "@mui/icons-material/MarkunreadMailbox";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import {Footer_comp} from "./Footer";

import { postContactoMensaje } from '../actions/contactoMail'
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export const Contact_comp = () => {
  const[titulo, setTitulo]=React.useState('')
  const[leyenda, setLeyenda]=React.useState('')
  const[errorTitulo, setErrorTitulo]=React.useState(false)
  var emailRegex = new RegExp("^([A-Za-z]|[0-9])+$")
  let navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    if(!errorTitulo){
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        comment: data.get("comment"),
      });
  
      const info = {
        nombre: data.get("firstname"),
        email: data.get("email"),
        mensaje: data.get("comment"),
      }
  
      dispatch(postContactoMensaje(info))
      
        Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu mensaje ha sido enviado con Exito!',
        showConfirmButton: false,
        timer: 2500
      })
  
        setTimeout(function(){
          navigate('/catalogo') 
        }, 3000);
  
    }else{
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Oopssss....!',
        text:'Por favor complete el formulario.'
      });
    }
    

 

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="md" sx={{marginTop:"100px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <MarkunreadMailboxIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Contacto
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  onChange={(e)=>{setTitulo(e.target.value);
                  if(titulo.length >25){
                    setErrorTitulo(true)
                    setLeyenda('Nombre no puede contener mas de 25 caracteres.')
                  }else{
                    setErrorTitulo(false)
                    setLeyenda('')
                  }
                  }}
                  error={errorTitulo}
                  helperText={leyenda}
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  onChange={(e)=>{setTitulo(e.target.value);
                    if(emailRegex.test(titulo)){
                    setErrorTitulo(true)
                    setLeyenda('Email no valido')
                  }else{
                    setErrorTitulo(false)
                    setLeyenda('')
                  }}}
                  error={errorTitulo}
                  helperText={leyenda}
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  onChange={(e)=>{setTitulo(e.target.value);
                     if(titulo.length < 10 && titulo.length > 500){
                    setErrorTitulo(true)
                    setLeyenda('Escribe al menos 5 palabras')
                  }else{
                    setErrorTitulo(false)
                    setLeyenda('')
                  }
                }}
                  error={errorTitulo}
                  helperText={leyenda}
                  name="comment"
                  label="Mensaje..."
                  type="comment"
                  id="comment"
                />
              </Grid>
            </Grid>
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item></Grid>
            </Grid>
          </Box>
        </Box>
        <Footer_comp/>
      </Container>
  );
}
}

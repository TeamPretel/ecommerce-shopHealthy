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

import { postContactoMensaje } from '../actions/contactoMail'
import { useDispatch } from 'react-redux';


export const Contact_comp = () => {

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      comment: data.get("comment"),
    });

    const info = {
      email: data.get("email"),
      mensaje: data.get("comment"),
    }

    dispatch(postContactoMensaje(info))
    
  };

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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
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
                  id="firstName"
                  label="Nombre"
                  autoFocus
                />
              </Grid>

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
                  fullWidth
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
      </Container>
  );
};

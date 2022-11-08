import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from '@mui/material';

export const FormCarrito = ()=> {


  const { handleSubmit, formState:{errors}, control, } = useForm();


  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de envio
      </Typography>
      <form>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="nombre"
            defaultValue={'nombre'}
            control={control}
            rules={{ required: true, maxLength:50,pattern:/^([a-z,A-Z])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.nombre?.type === 'required' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">El nombre es requerido</Alert>}
        {errors.nombre?.type === 'maxLength' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">Maximo 50 caracteres </Alert>}
        {errors.nombre?.type === 'maxLength' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">Los numeros y caracteres especiales no son permitidos </Alert>}
          
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="apellido"
            defaultValue={'apellido'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Apellido"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        <Grid item xs={12}>
        <Controller 
            name="direccion"
            defaultValue={'direccion'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Direccion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        <Grid item xs={12}>
        <Controller 
            name="email"
            defaultValue={'email'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Email"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>

        <Grid item xs={12} sm={6}>
        <Controller 
            name="ciudad"
            defaultValue={'ciudad'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Ciudad"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="otro"
            defaultValue={'otro'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="otro"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="stado"
            defaultValue={'stado'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Estado/Provincia/Region"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="codPostal"
            defaultValue={'codPostal'}
            control={control}
            rules={{ required: true, maxLength:30 }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Código Postal"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>

      </Grid>
      </form>
    </React.Fragment>
  );
}
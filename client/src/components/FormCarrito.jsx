import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from '@mui/material';
import { AuthContext } from '../auth/AuthContext';

export const FormCarrito = ({errors, control, handleSubmit, onSubmit})=> {
  const {dispatch, user} = React.useContext(AuthContext); 

  return (

    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de envio
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="nombre"
            defaultValue={user.nombre || ''}
            control={control}
            rules={{ required: true, maxLength:50,pattern:/^([a-z,A-Z,\s])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Nombre"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.nombre?.type === 'required' &&  <Alert sx={{ p:0, mb:2}} severity="error">El nombre es requerido</Alert>}
        {errors.nombre?.type === 'maxLength' &&  <Alert sx={{ p:0, mb:2}} severity="error">Maximo 30 caracteres </Alert>}
        {errors.nombre?.type === 'pattern' &&  <Alert sx={{ p:0, mb:2}} severity="error">No numeros o caracteres especiales por favor</Alert>}
          
        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="apellido"
            defaultValue={user.apellido || ''}
            control={control}
            rules={{ required: true, maxLength:30,pattern:/^([a-z,A-Z,\s])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Apellido"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.apellido?.type === 'required' &&  <Alert sx={{ p:0, mb:2}} severity="error">El apellido es requerido</Alert>}
        {errors.apellido?.type === 'maxLength' &&  <Alert sx={{ p:0, mb:2}} severity="error">Maximo 30 caracteres </Alert>}
        {errors.apellido?.type === 'pattern' &&  <Alert sx={{ p:0, mb:2}} severity="error">No numeros o caracteres especiales por favor</Alert>}
        </Grid>
        <Grid item xs={12}>
        <Controller 
            name="direccion"
            defaultValue={user.direccion || ''}
            control={control}
            rules={{ required: true, }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Direccion"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.direccion?.type === 'required' &&  <Alert sx={{ p:0, mb:2}} severity="error">El apellido es requerido</Alert>}

        </Grid>
        <Grid item xs={12}>
        <Controller 
            name="email"
            defaultValue={user.mail || ''}
            control={control}
            rules={{ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  }}
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
        {errors.email?.type === 'required' &&  <Alert sx={{height:'50px', width:'100%',ml:2 }} severity="error">El email es requerido</Alert>}
        {errors.email?.type === 'pattern' &&  <Alert sx={{height:'50px',width:'100%' }} severity="error">Ingresa un email valido por favor </Alert>}
        
        {/* <Grid item xs={12} sm={6}>
        <Controller 
            name="ciudad"
            defaultValue={'ciudad'}
            control={control}
            rules={{ required: true, maxLength:30, pattern:/^([a-z,A-Z])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Ciudad"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.ciudad?.type === 'required' &&  <Alert sx={{ p:0, mb:2}} severity="error">el nombre de la ciudad es requerida</Alert>}
        {errors.ciudad?.type === 'maxLength' &&  <Alert sx={{ p:0, mb:2}} severity="error">Maximo 30 caracteres </Alert>}
        {errors.apellido?.type === 'pattern' &&  <Alert sx={{ p:0, mb:2}} severity="error">Los numeros y caracteres especiales no son permitidos </Alert>}
        
        </Grid> */}
        <Grid item xs={12} sm={6}>
        <Controller 
            name="id"
            defaultValue={user.dni || ''}
            control={control}
            rules={{ required: true, maxLength:10, pattern:/^([0-9])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="DNI"
                                        fullWidth
                                        disabled
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.id?.type === 'required' &&  <Alert sx={{ p:0, mb:2}} severity="error">El DNI es requerido</Alert>}
        {errors.id?.type === 'maxLength' &&  <Alert sx={{ p:0, mb:2}} severity="error">Maximo 10 caracteres </Alert>}
        {errors.id?.type === 'pattern' &&  <Alert sx={{ p:0, mb:2}} severity="error">Solo numero por favor</Alert>}

        </Grid>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="codPostal"
            defaultValue={user.codPostal || ''}
            control={control}
            rules={{ required: true, min:1001, max:9431, pattern:/^([0-9])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="Código Postal"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        {errors.codPostal?.type === 'required' &&  <Alert sx={{ p:0}} severity="error">El Codigo Postal es requerido</Alert>}
        {errors.codPostal?.type === 'min' &&  <Alert sx={{ p:0}} severity="error">Codigo postal invalido</Alert>}
        {errors.codPostal?.type === 'max' &&  <Alert sx={{ p:0}} severity="error">Codigo postal invalido</Alert>}
        {errors.codPostal?.type === 'pattern' &&  <Alert sx={{ p:0}} severity="error">Solo numeros</Alert>}

        </Grid>

      </Grid>

    </React.Fragment>
  );
}
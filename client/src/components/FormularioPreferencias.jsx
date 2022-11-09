
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Alert } from '@mui/material';

export const FormularioPreferencias = (  {Controller, control, errors} ) => {

  return (
    <>
      <Container sx={{mb:3}}>

        <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="nombre"
            defaultValue={''}
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
            defaultValue={''}
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
            defaultValue={''}
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
        <Grid item xs={6}>
        <Controller 
            name="mail"
            defaultValue={''}
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
        {errors.mail?.type === 'required' &&  <Alert sx={{height:'50px', width:'100%',ml:2 }} severity="error">El email es requerido</Alert>}
        {errors.mail?.type === 'pattern' &&  <Alert sx={{height:'50px',width:'100%' }} severity="error">Ingresa un email valido por favor </Alert>}
        <Grid item xs={6}>
        <Controller 
            name="telefono"
            defaultValue={''}
            control={control}
            rules={{ required: true, pattern: /^([0-9])*$/  }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="telefono"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        {errors.telefono?.type === 'required' &&  <Alert sx={{height:'50px', width:'100%',ml:2 }} severity="error">El Telefono es requerido</Alert>}
        {errors.telefono?.type === 'pattern' &&  <Alert sx={{height:'50px',width:'100%' }} severity="error">Solo numero por favor</Alert>}
        <Grid item xs={12}>
        <Controller 
            name="password"
            defaultValue={''}
            control={control}
            rules={{ required: true, pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/  }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        name='password'
                                        type='password'
                                        label="Password"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />}
                
        />
        </Grid>
        {errors.password?.type === 'required' &&  <Alert sx={{height:'50px', width:'100%',ml:2 }} severity="error">El password es requerido</Alert>}
        {errors.password?.type === 'pattern' &&  <Alert sx={{height:'50px',width:'100%' }} severity="error">Escribe una clave bien fuerte 💪😉, mas de  8 caracteres, 1 minuscula, 1 mayuscula, 1 número, 1 simbolo</Alert>}
        
        
        <Grid item xs={12} sm={6}>
        <Controller 
            name="id"
            defaultValue={''}
            control={control}
            rules={{ required: true, maxLength:10, pattern:/^([0-9])*$/ }}
            render={({ field }) => <TextField
                                        {...field}
                                        required
                                        label="DNI"
                                        fullWidth
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
            defaultValue={''}
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
      </Container>
    </>
  );
};

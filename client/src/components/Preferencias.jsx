import { useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2'
import { Alert, capitalize } from '@mui/material';
import axios from 'axios';
import { type } from "../../types";
import { useDispatch } from 'react-redux';
import { useContext } from 'react';
import { AuthContext } from '../auth/AuthContext';


export const Preferencias_comp = () => {

  const { handleSubmit, formState:{errors}, control, } = useForm();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);
  const onSubmit = async(d)=>{
    console.log(d)
    const newData = {...d, codPostal:parseInt(d.codPostal), telefono:parseInt(d.telefono), isAdmin:false, uid:user.uid}
    const action = {
      type: type.login,
      payload: {
        nombre: newData.nombre,
        apellido: newData.apellido,
        mail: newData.mail,
        direccion: newData.direccion,
        codPostal: newData.codPostal,
        telefono: newData.telefono,
        dni: newData.id
      }
    }
    dispatch(action)
    
    try {
      const backMesage = await axios.post('https://henryhealthy.shop/tresmiluno/usuario/crear',newData );
      console.log(backMesage)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registrado con exito 😋!',
        showConfirmButton: false,
        timer: 1000
      })
      navigate('/catalogo')
    } catch (error) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'DNI ya existe!',
        showConfirmButton: false,
        timer: 1000
      })

    }
  }

  return (
    <>
      <Container component="main" sx={{ marginTop: '100px', width:'60%', alignItems:'center' }}>
          <Avatar sx={{bgcolor: 'secondary.main', m:'0 auto' }}>
            <AccountCircleIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{textAlign:'center'}} >
            Perfil
          </Typography>
          <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
        <Controller 
            name="nombre"
            defaultValue={capitalize(user?.nombre.split(' ')[0])}
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
            defaultValue={user?.nombre.split(' ')[1]? capitalize(user?.nombre.split(' ')[1]):''}
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
            defaultValue={user.mail}
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
      <Grid item xs={12} sx={{display:'flex', m:2, alignItems:'center', justifyContent:'center'  }} >
          <Button
            sx={{width:'40%'}}
            variant='contained'
            type='submit'
            onClick={handleSubmit(d=>onSubmit(d))}
            
          >
            Guardar
          </Button>

      </Grid>
      </Container>
    </>
  );
};

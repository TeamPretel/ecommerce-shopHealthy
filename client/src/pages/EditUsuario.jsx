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
import { Alert, Box, capitalize, CardMedia, IconButton, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { type } from "../../types";
import { useDispatch } from 'react-redux';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../auth/AuthContext';
import { useState } from 'react';
import { getUsuarios } from '../helpers/getUsuarios';
import defaultUser from '../assets/default-user.png';
import PhotoCamera from '@mui/icons-material/PhotoCamera';




export const EditarUsuario = () => {

  const [load, setLoad] = useState(false);
  const [imgLoad, setImgLoad] = useState(false);
  const [image, setImage] = useState('');
  const { handleSubmit, formState:{errors}, control, } = useForm();
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const uploadImage = async(e) =>{
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "hs_users");
    setImgLoad(true);
    const res = await fetch(
        'https://api.cloudinary.com/v1_1/dw8jw0zhx/image/upload',
        {
            method:"POST",
            body:data
        }
    )
    const file = await res.json();
    console.log(file.secure_url)
    console.log(file.secure_url.slice(81))
    setImage(file.secure_url);
    setImgLoad(false);
}

  useEffect(() => {
    const getuser = async()=> {
      const result = await getUsuarios();
      dispatch({type:'LOAD_USERS', payload:result})
    }
    getuser();

  },[load])

  const onSubmit = async(d)=>{
    console.log(d)
    const newData = {...d,id: parseInt(d.id), codPostal:parseInt(d.codPostal), telefono:parseInt(d.telefono), isAdmin:false, img:image.slice(81) }
    setLoad(true)
    const resBack = await axios.put(`https://healthyback.onrender.com/tresmiluno/usuario/modificar/${newData.id}`, newData)
    console.log(resBack)
    const action = {
      type: type.login,
      payload: {
        nombre: newData.nombre,
        apellido: newData.apellido,
        mail: newData.mail,
        direccion: newData.direccion,
        codPostal: newData.codPostal,
        telefono: newData.telefono,
        uid: newData.uid,
        dni: newData.id,
        img:image.slice(81)
        
      }
    }
    dispatch(action);
    setLoad(false)
    navigate(`/usuario/${newData.nombre}/perfil`)
  }

  return (
    <>
      <Container component="main" sx={{ marginTop: '100px', width:{xs:'90%',md:'60%'}, alignItems:'center' }}>
        {!load
          ?<>
          <Grid container spacing={3} sx={{display:'grid', gridTemplateColumns:{md:'1fr 1fr',xs:'1fr'}}} >
          <Grid item sx={{ gridColumn:1, gridRow:'span 2', position:'relative', display:'grid', justifyContent:'center', alignItems:'center', }}  mb={1} >
            <Box>
                        {
                          !imgLoad?
                            <CardMedia 
                            component='img'
                            image={image || defaultUser}
                            sx={{height:200, width:200}}
                            alt={user.nombre}
                            />
                            :<Skeleton sx={{zIndex:200, height:250, width:250,}} />
                        }
                        <IconButton color="primary" aria-label="upload picture" component="label" sx={{
                            zIndex: 100,
                            top: 2,
                            left: 'center',
                            position: 'absolute',
                            textTransform: 'uppercase',
                            }}>
                            <input hidden accept="image/*" type="file" name='file' onChange={uploadImage} />
                            <PhotoCamera fontSize='large'/>
                        </IconButton>
              </Box>            
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12} >
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
              name="mail"
              defaultValue={user.mail || ''}
              control={control}
              rules={{ required: true, pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  }}
              render={({ field }) => <TextField
                                          {...field}
                                          required
                                          label="Email"
                                          fullWidth
                                          disabled
                                          autoComplete="given-name"
                                          variant="standard"
                                      />}
                  
          />
          </Grid>
          {errors.mail?.type === 'required' &&  <Alert sx={{height:'50px', width:'100%',ml:2 }} severity="error">El email es requerido</Alert>}
          {errors.mail?.type === 'pattern' &&  <Alert sx={{height:'50px',width:'100%' }} severity="error">Ingresa un email valido por favor </Alert>}
          
          <Grid item xs={12}>
          <Controller 
              name="telefono"
              defaultValue={user.telefono || ''}
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
              name="id"
              defaultValue={ user.dni || ''}
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
          <Grid item xs={12}>
          <Controller 
              name="codPostal"
              defaultValue={ user.codPostal || ''}
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
              disabled={imgLoad}
              
            >
              Guardar
            </Button>

        </Grid>
        </>
        :<Typography variant='h5' >Espere por favor...</Typography>
        }
      </Container>
    </>
  );
};

import { Button, Container, Divider, Grid, IconButton, Typography } from '@mui/material'
import { Stack } from '@mui/system';
import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

export const Perfil = () => {

    const {dispatch, user} = useContext(AuthContext); 
    console.log(user)
    const navigate = useNavigate();
  return (
    <Container sx={{width:{xs:'90%', md:'70%'}}} >
        <Grid container sx={{boxShadow:15, p:2,  }} >
            <Grid item xs={12}  >
                {/* <Typography variant='body2' sx={{pt:2, pl:2, opacity:'80%'}}>
                    Usuario:
                </Typography> */}
                <Typography variant='h5' sx={{p:1.5}} >
                    {`${user.nombre} ${user.apellido}`  }
                </Typography>
            </Grid>

            <Divider sx={{border:'2px solid black', width:'100%'}} />

            <Grid item xs={12} >
                <Typography  variant='body2' sx={{ opacity:'80%',pt:2, color:t=>t.palette.primary.dark }} > Datos personales: </Typography>
            </Grid>
            <Grid item xs={12} md={6}  >
                <Stack direction='row' spacing={2} py={2} >
                    <Typography variant='body2' sx={{ opacity:'80%',}} > Email: </Typography>
                    <Typography variant='body1' sx={{fontWeight:700}} > {user.mail} </Typography>
                </Stack>
                <Stack direction='row' spacing={2} py={2} >
                    <Typography variant='body2' sx={{ opacity:'80%',}}> Telefono: </Typography>
                    <Typography variant='body1' sx={{fontWeight:700}} > {user.telefono} </Typography>
                </Stack>
                <Stack direction='row' spacing={2} py={2} >
                    <Typography variant='body2' sx={{ opacity:'80%',}}> DNI: </Typography>
                    <Typography variant='body1' sx={{fontWeight:700}} > {user.dni} </Typography>
                </Stack>
            </Grid>
            <Grid item xs={12} md={6} >
                <Stack direction='row' spacing={2} py={2} >
                    <Typography variant='body2' sx={{ opacity:'80%',}}> Direccion: </Typography>
                    <Typography variant='body1' sx={{fontWeight:700}} > {user.direccion} </Typography>
                </Stack>
                <Stack direction='row' spacing={2} py={2} >
                    <Typography variant='body2' sx={{ opacity:'80%',}}> Código Postal: </Typography>
                    <Typography variant='body1' sx={{fontWeight:700}} > {user.codPostal} </Typography>
                </Stack>
            </Grid>
        </Grid>
        <Grid container sx={{boxShadow:15, p:2, mt:2 }}  >

            <Grid item xs={12} md={6} sx={{alignItems:'center', justifyContent:'center', display:'flex', }} >
                <Button variant='contained' onClick={()=>navigate(`/usuario/${user.nombre}/mis_compras`)} startIcon={<ShoppingBagOutlinedIcon/>}>
                    Ir a mis compras
                </Button>
            </Grid>

            <Grid item xs={12} md={6} sx={{alignItems:'center', justifyContent:'center', display:'flex',}} >
                <Button variant='contained' startIcon={<EditOutlinedIcon />} onClick={()=>navigate('editar')} >
                    Editar Perfil
                </Button>
            </Grid>

        </Grid>

    </Container>
  )
}

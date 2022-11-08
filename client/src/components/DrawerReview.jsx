import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { CardMedia, Divider, Grid, Rating, Stack, TextField } from '@mui/material';
import { useState } from 'react';

const drawerBleeding = 10;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor:
    theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export const DrawerReview = ({toggleDrawer, open, setOpen, nombre, img, id, compareId}) => {
//   const { window } = props;

  // This is used only for the example
//   const container = window !== undefined ? () => window().document.body : undefined;
const [value, setValue] = useState(0);

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height:`calc(60% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      {/* <Box sx={{ textAlign: 'center', pt: 1 }}>
        <Button onClick={toggleDrawer(true)}>Open</Button>
      </Box> */}
      <SwipeableDrawer
        // container={container}
        anchor="bottom"
        open={open && id == compareId }
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller sx={{mt:1}} onClick={()=>setOpen(false)} />

        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          <Grid container sx={{boxShadow:15, borderRadius:'8px', my:5 }}>

            <Grid item xs={12}  >
                <Typography variant="body1" sx={{ py:2, pl:3, fontWeight:700, fontSize:'1rem'}} >{ `NOS ENCANTARIA CONOCER TU OPINIÓN ACERCA DE ${nombre.toUpperCase()} `}</Typography>
            </Grid>

            <Grid item xs={12} >
                <Divider variant="middle" color='black' sx={{mb:2}} />

            </Grid>

            <Grid item xs={12} md={2} sx={{display:'flex', justifyContent:'center'}} >
                <CardMedia
                component="img"
                image={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${img}`||<Skeleton height={194}/>}
                alt={'nombre'}
                sx={{width:'auto', height:{xs:'130px', md:'190px'} }}
                />

            </Grid>

            <Grid item xs={12} md={6} sx={{display:'flex', alignItems:'center'}} >
                <TextField
                    sx={{width:'90%',}}
                    multiline
                    rows={3}
                    label='Escribe tu comentario por favor'
                />
            </Grid>

            <Grid item xs={12} md={4} sx={{alignItems:'center'}} >
                <Stack spacing={1} sx={{m:'8px 15px', alignContent:'center'}} >
                    <Rating 
                        sx={{m:'10px auto'}}
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                        setValue(newValue);
                        }}
                
                    />
                    <Button variant="contained" > Guardar </Button>
                </Stack>
            </Grid>
        </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}




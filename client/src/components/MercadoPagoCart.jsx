import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import MercadoLogo from '../assets/mercadopago.png'


export const MercadoPagoCart = ()=> {
  
  return (
    <Box sx={{ maxWidth: 345, bgcolor:'transparent' }}>
      <Box>
        <CardMedia
          component="img"
          height="140"
          image={MercadoLogo}
          alt="green iguana"
          
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            Paga más rápido con Mercado Pago
          </Typography>
          <Typography variant="body1" >
          <DoneIcon sx={{color: t=>t.palette.primary.main , fontSize:'large', mr:1}}  />
            Pago seguro
          </Typography>
          <Typography variant="body1" >
          <DoneIcon sx={{color: t=>t.palette.primary.main , fontSize:'large', mr:1}} />
            Sin carga de datos
          </Typography>
          <Typography variant="body1" >
          <DoneIcon sx={{color: t=>t.palette.primary.main , fontSize:'large', mr:1}} />
            Cuotas disponibles 
          </Typography>
        </CardContent>
      </Box>
    </Box>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Footer_comp } from '../components/Footer';
import { Grid, Typography, Box, Container, Stack, Button, CardMedia, Skeleton } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { UNSAFE_DataStaticRouterContext, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initProducts } from '../actions/getInitProducts';
import { fCurrency } from '../dashboard/utils/formatNumber';
import { TYPES } from '../actions/ShoppingCartActions';
import { useState } from 'react';
import { Contador } from '../components/Contador';
import { MercadoPagoCart } from '../components/MercadoPagoCart';
import ShieldIcon from '@mui/icons-material/Shield';
import { Preferencias_comp } from '../components/Preferencias';
import { FormCarrito } from '../components/FormCarrito';
import { PaidMercadoPago } from '../actions/pagoMercadoPago';

let info =  {
  "items": [
    {
      "id": "1234",
      "title": "Alfajor de milanesa de soja",
      "description": "Ya probaste el chiquito ...ahora proba el triple sabor",
      "category_id": "1",
      "quantity": 3,
      "currency_id": "ARS",
      "unit_price": 5000.00
    }
  ],
  "payer": {
    "name": "Chirango WachiNigth",
    "surname": "El chambo",
    "email": "elchapo@gmail.com",
    "identification": {
      "type": "DNI",
      "number": "12345678"
    }
  }
}

export const Shopping = ()=> {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);
  
  const {cart, isLoading, subtotal, cartInfo} = useSelector( s=>s.catalogReducer )
  useEffect(() => {
    dispatch({type:TYPES.TOTAL_AMOUNT})
  }, [cart, dispatch])
  
  const onSubmit = (e,d)=>{
    console.log(info, 'INFO DE LA ORDEN')
    e.preventDefault()
    dispatch(PaidMercadoPago(info))
    
    setTimeout(function(){
      window.open(`${cartInfo.init_point}`, '_blank')
  }, 2000);
  
  }

  return (
    <>
      <Container sx={{ minWidth:'90%'}} >
      <Box>
        <Button startIcon={<ChevronLeftIcon/>} onClick={()=>navigate(-1)}  > Volver a la tienda</Button>
        <Typography variant='subtitle2' sx={{fontSize:25, my:2}} > Finaliza tu compra </Typography>
        <Typography variant='body2' sx={{fontSize:15, mb:6}} > <WarningIcon sx={{fontSize:'small', mt:-0.4, mr:1}} /> Completá el formulario y luego revisá que tu pedido sea correcto. </Typography>

      </Box>
      <Grid container spacing={2} >
        <Grid item xs={8} >
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead  >
                {/* <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Detalles
                  </TableCell>
                  <TableCell align="right">Precio</TableCell>
                </TableRow> */}
                <TableRow >
                  <TableCell sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}}>Desc</TableCell>
                  <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} >img</TableCell>
                  <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} >Unidades</TableCell>
                  <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} >Precio Unitario</TableCell>
                  <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} >SubTotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                {
                  isLoading
                      ? 
                      <>
                      <TableRow >{/* esto es solo carga no le metas mucho cerebro.. son solo skeletons */}
                        <TableCell> <Skeleton variant="rounded" width={210} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell > <Skeleton variant="rounded" width={210} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                      </TableRow>
                      <TableRow >
                        <TableCell><Skeleton variant="rounded" width={210} height={60} /></TableCell>
                        <TableCell > <Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                        <TableCell ><Skeleton variant="rounded" width={100} height={60} /></TableCell>
                      </TableRow>
                      </>
                      :
                  cart.map((row) => (
                  <TableRow key={ row.id }>
                    <TableCell>{ row.nombre }</TableCell>
                    <TableCell sx={{maxHeight:'100px'}} > <img width="100px" src={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${row.img}`} alt={ row.nombre } /></TableCell>
                    <TableCell align="right" sx={{textAlign:'center'}} > 
                                                <Stack sx={{p:0,}} >
                                                  <Contador defaultValue={row.quantity} id={row.id} maxValue={row.stock} />
                                                  <Typography variant='body2' sx={{p:0, m:0, opacity:'60%' }} >{`En stock: ${row.stock}` }</Typography> 
                                                </Stack>
                    </TableCell>
                    <TableCell align="right" sx={{textAlign:'center'}} >{fCurrency(row.precio)}</TableCell>
                    <TableCell align="right" sx={{textAlign:'center'}} >{fCurrency(row.precio * row.quantity)}</TableCell>
                  </TableRow>
                ))
                }

                <TableRow sx={{bgcolor:t=>t.palette.primary.light}} >
                  <TableCell rowSpan={4} />
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell align="right" sx={{textAlign:'center'}} >{fCurrency(subtotal) }</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={4} >
            <Stack  spacing={4} sx={{justifyContent:'center', alingItems:'center', display:'flex', }} >
              <MercadoPagoCart />
              <Button
                startIcon={<ShieldIcon/>}
                variant='contained'
                onClick={onSubmit}
                
              >
                {`Total a pagar ${fCurrency(subtotal)} `}
              </Button>
              <Typography variant='body2' sx={{fontSize:'0.75rem', opacity:'70%'}} > Al confirmar tu compra, te redirigiremos a tu cuenta de Mercado Pago </Typography>
            </Stack>
        </Grid>
        <Grid item xs={8} >
          <FormCarrito />
        </Grid>
      </Grid>


      </Container>
    
    <Footer_comp/>
    </>
  );
}
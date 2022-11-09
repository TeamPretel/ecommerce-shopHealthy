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
import { useForm, Controller } from 'react-hook-form';
import { PaidMercadoPago } from '../actions/pagoMercadoPago';
import { PaiadTable } from '../components/PaidTable';


export const Shopping = ()=> {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { handleSubmit, formState:{errors}, control, } = useForm();
  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);
  
  const {cart, isLoading, subtotal, cartInfo, mercadoLoad} = useSelector( s=>s.catalogReducer )

  useEffect(() => {
    dispatch({type:TYPES.TOTAL_AMOUNT})
  }, [cart, dispatch])
  
 
  const onSubmit = (data)=>{
   let newData = {...data, id:parseInt(data.id), codPostal: parseInt(data.codPostal) }
    // console.log('console log data del onsubmit',newData);

    let itemsToMercado = cart.map( producto=>(
      {
          "id": String(producto.id),
          "title": String(producto.nombre),
          "description": String(producto.descripcion),
          "category_id": String(newData.id),
          "quantity": producto.quantity,
          "currency_id":"ARS",
          "unit_price": producto.precio
      }

  ))

        let info =  {
            "items": itemsToMercado,
            "payer": {
              "name": newData.nombre,
              "surname": newData.apellido,
              "email": newData.email,
              "identification": {
              "type": "DNI",
              "number": String(newData.id)
            }
          }
        } 
    console.log( 'DATA QUE SE DESPACHA...') 
    // info = JSON.stringify(info)
    console.log(info) 

    dispatch(PaidMercadoPago(info))
    
  }

useEffect(() => {
  if (mercadoLoad) {
    window.open(`${cartInfo.init_point}`, '_blank');
    dispatch({type:'SET_ISLOADING_MERCADO_FALSE'});
    dispatch({type:TYPES.CLEAR_CART})
    navigate('/catalogo',{ replace: true })
  }
}, [dispatch, cartInfo]);

  
  return (
    <>
      <Container sx={{ minWidth:'90%'}} >
      <Box>
        <Button startIcon={<ChevronLeftIcon/>} onClick={()=>navigate(-1)}  > Volver</Button>
        <Typography variant='subtitle2' sx={{fontSize:25, my:2}} > Finaliza tu compra </Typography>
        <Typography variant='body2' sx={{fontSize:15, mb:6}} > <WarningIcon sx={{fontSize:'small', mt:-0.4, mr:1}} /> Completá el formulario y luego revisá que tu pedido sea correcto. </Typography>

      </Box>
      <Grid container spacing={2} >
        <Grid item sx={{ display:{ xs:'none', md:'flex'} }} xs={12} >
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead  >
                <TableRow >
                  <TableCell sx={{textAlign:'right',bgcolor:t=>t.palette.primary.main, color:'white'}}>Desc</TableCell>
                  <TableCell align="right" sx={{textAlign:'center',bgcolor:t=>t.palette.primary.main, color:'white'}} ></TableCell>
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
        
        <Grid item sx={{ display:{ xs:'flex', md:'none'} }} xs={12} > 
            <PaiadTable cart={cart} isLoading={isLoading} subtotal={subtotal} />
        </Grid>

        <Grid item xs={12} md={8} >
          <FormCarrito errors={errors} control={control} handleSubmit={handleSubmit} onSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12} md={4} >
            <Stack  spacing={4} sx={{justifyContent:'center', alingItems:'center', display:'flex', }} >
              <MercadoPagoCart />
              <Button
                startIcon={<ShieldIcon/>}
                variant='contained'
                type='submit'
                onClick={handleSubmit(d=>onSubmit(d))}
                
              >
                {`Pagar ${fCurrency(subtotal)} `}
              </Button>
              <Typography variant='body2' sx={{fontSize:'0.75rem', opacity:'70%'}} > Al confirmar tu compra, te redirigiremos a tu cuenta de Mercado Pago </Typography>
            </Stack>
        </Grid>
      </Grid>


      </Container>
    
    <Footer_comp/>
    </>
  );
}
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
import { redirect, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { initProducts } from '../actions/getInitProducts';
import { fCurrency } from '../dashboard/utils/formatNumber';
import { TYPES } from '../actions/ShoppingCartActions';
import { payMercadoPago } from '../actions/payCart';
// const TAX_RATE = 0.07;

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty, unit) {
  return qty * unit;
}

let payInfo =  {
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

// const invoiceSubtotal = subtotal(rows);
// // const invoiceTaxes = TAX_RATE * invoiceSubtotal;
// const invoiceTotal = 0 + invoiceSubtotal;

export const Shopping = ()=> {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);

  const {cart, isLoading, subtotal,cartInfo} = useSelector( s=>s.catalogReducer )
 console.log(cartInfo, 'SHOPINNNNNN')
  useEffect(() => {
    dispatch({type:TYPES.TOTAL_AMOUNT})
  }, [cart, dispatch])
  
  const handlersubmitMP=(e)=>{
    e.preventDefault()
    dispatch(payMercadoPago(payInfo))
    console.log(cartInfo, 'estamos en el handler')
    window.open(`${cartInfo.init_point}`, '_blank').then(r=>r.navigate('/catalogo'))
    
  }

  return (
    <>
      <Container>
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
                    <TableCell align="right" sx={{textAlign:'center'}} >{row.quantity}</TableCell>
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
            <Stack  spacing={3} >
              <Typography sx={{border:'1px solid black'}} >stack1</Typography>
              <Typography sx={{border:'1px solid black'}} >stack2</Typography>
              <Typography sx={{border:'1px solid black'}} >stack2</Typography>
              <Typography sx={{border:'1px solid black'}} >stack2</Typography>
            </Stack>
        </Grid>
      </Grid>


      </Container>
      <a href={`${cartInfo.init_point}`} target='_blank'>pagar</a>
    <button onClick={handlersubmitMP}>iniciar pago</button>
    <Footer_comp/>
    </>
  );
}
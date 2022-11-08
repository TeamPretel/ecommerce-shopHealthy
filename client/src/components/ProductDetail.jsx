
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NotFound from '../assets/notFount.jpg'

import { Box, Button, Divider, Grid, Skeleton,capitalize,TextField, Stack, Rating } from "@mui/material";
import { RatingProduct } from "./RatingProduct";
import { Contador } from './Contador';

import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../helpers/getProductById";
import Page404 from "../dashboard/pages/Page404";
import NotFound404 from "../pages/NotFound404";
import Producto404 from "../pages/Producto404";
import {TYPES} from '../actions/ShoppingCartActions.js'


export const ProductDetail_comp = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const { isLoading,cart } = useSelector((state) => state.catalogReducer);
  const navigate = useNavigate()

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "SET_ISLOADING_TRUE" });
      try {
        const productAux = await getProductById(id);
        setProduct(productAux);
      } catch (error) {
        console.log("cayo el bendito back otra vez!");
        setError(true)
      }
      return dispatch({ type: "SET_ISLOADING_FALSE" });
    };
    getProduct();
  }, [id, dispatch, navigate]);
    
  const { nombre, precio, img, stock, descripcion } = product;

  const hadleAddCart = e =>{
    e.preventDefault(); 
    console.log(id)
    console.log(cart)
    if(!cart.length || !cart.find(el => el.id == parseInt(id) ) || cart.find(el => el.id == parseInt(id) ).quantity < stock) dispatch({type: TYPES.ADD_TO_CART, payload: {id:parseInt(id),}})
  }
  
  if (error) return <Producto404 />

  return (
  <Box sx={{alignItems:'center', justifyContent:'center', display: 'flex', }}>
    
    <Grid container 
          spacing={2} 
          sx={{ alignItems:'center', justifyContent:'space-between', mt:'70px', width:'70%',  }} >
      <Grid item xs={12} md={7} sx={{alignItems:'center', justifyContent:'center',}} >
        <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}} >
          {!isLoading? <CardMedia  
          component="img" 
          sx={{width:'auto', maxHeight:{xs:"300px", md:'400px', xl:"450px", margin:'0 auto'}}} 
          src={!`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${img}`?NotFound:`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${img}`} 
          alt={nombre}/> : <Skeleton variant="rectangular" width={'350px'} height={'350px'} /> }
        </Box>
      </Grid>
      <Grid item xs={12} md={5} sx={{justifyContent:'center', alignItems:'center', mt:{xs:1, md:10} }}>
        {!isLoading?
          <Typography sx={{fontSize:{xs:15,md:25}, textAlign:'center'}}
            variant="body2"
            color="text.primary"
            textTransform="uppercase"            
            fontWeight="bold"       
          >
            {nombre}
          </Typography>: <Skeleton height={'100px'} /> 
        }

          <Divider sx={{border:'1px solid black', my:2}} />
          {
            !isLoading
              ?<Typography
              variant="body2"
              color="text.primary"
              textTransform="capitalize"            
              >
                {descripcion}
              </Typography>
              :<Skeleton height={'150px'} />
          }
          {!isLoading?
          <Typography
            variant="body1"
            color="text.primary"
            textAlign="center"
            sx={{ fontWeight: 600, marginTop: 1, fontSize:25 }}
          >
            {precio + " $"}
          </Typography>: <Skeleton height={'65px'}/> 
        }
        <Divider/>
        <RatingProduct sx={{alignItems: "center"}}/>
        <Divider/>
        <Typography>
          <CreditCardIcon color="secondary" sx={{ fontSize: 24, ml:{md:2, xs:0} }} /> Aceptamos tarjetas todas las tarjetas.
        </Typography>
        <Typography>
          <AddShoppingCartIcon color="secondary" sx={{ fontSize: 24, ml:{md:2, xs:0} }} /> Aceptamos pagos en efectivo.
        </Typography>
        <Typography>
          <DeliveryDiningIcon color="secondary" sx={{ fontSize: 24, ml:{md:2, xs:0} }} /> Lo llevamos a la puerta de tu casa.
        </Typography>
        <Typography>
          <Inventory2OutlinedIcon color="secondary" sx={{ fontSize: 24, ml:{md:2, xs:0} }} /> {`En stock: ${stock} udds`}
        </Typography>
        <Box sx={{display:'flex', justifyContent:'center', alingItems:'center',py:3}}>
          <Button 
            variant="contained" 
            sx={{margin:"5px auto",width:'80%', mb:1}} 
            startIcon={<AddShoppingCartIcon />}
            onClick={hadleAddCart}
            >
              <Typography  sx={{fontSize:13.5}} >Agregar al carrito</Typography>
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12} >

        <Grid container sx={{boxShadow:15, borderRadius:'8px', my:5 }}>

            <Grid item xs={12}  >
                <Typography variant="body1" sx={{ py:2, pl:3, fontWeight:700, fontSize:'1rem'}} > user:asdas </Typography>
            </Grid>

            <Grid item xs={12} >
                <Divider variant="middle" color='black' sx={{mb:2}} />

            </Grid>

            <Grid item xs={12} md={2} sx={{display:'flex', justifyContent:'center'}} >
                <CardMedia
                component="img"
                image={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/DEMETER-EL-PAMPA-ORGANICO-NUECES-PECAN-ORGANICAS-500G.jpg`||<Skeleton height={194}/>}
                alt={'nombre'}
                sx={{width:'auto', height:{xs:'130px', md:'190px'} }}
                />

            </Grid>

            <Grid item xs={12} md={6} sx={{display:'flex',pt:2, justifyContent:'center'}} >
                <Typography
                variant='body2'
                sx={{opacity:'90%'}}
                >
                  un reviews de algina persona
                </Typography>
            </Grid>

            <Grid item xs={12} md={4} sx={{alignItems:'center'}} >
                <Stack spacing={1} sx={{m:'8px 15px', alignContent:'center'}} >
                    <Rating 
                        sx={{m:'10px auto'}}
                        name="simple-controlled"
                        value={5}
                        readOnly
                
                    />
                    
                </Stack>
            </Grid>
            </Grid>

        </Grid>
  
    </Grid>
    </Box>
  );
};

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NotFound from '../assets/notFount.jpg'

import { Box, Button, Divider, Grid, Skeleton } from "@mui/material";
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


export const ProductDetail_comp = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null)

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.catalogReducer);
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
  
  if (error) return <Producto404 />

  return (
  <Box sx={{alignItems:'center', justifyContent:'center', display: 'flex', }}>
    
    <Grid container 
          spacing={2} 
          sx={{ alignItems:'center', justifyContent:'space-between', mt:'70px', width:'65%',  }} >
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
        {!isLoading?<Typography sx={{fontSize:{xs:15,md:25}, textAlign:'center'}}
          variant="body2"
          color="text.primary"
          textTransform="uppercase"            
          fontWeight="bold"       
        >
          {nombre}
          

        
        </Typography>: <Skeleton height={'150px'} /> }
        
        <Typography>
          {descripcion}
        </Typography>
        
        <Divider sx={{border:'1px solid black', my:2}} />
        {!isLoading?<Typography
          variant="body1"
          color="text.primary"
          textAlign="center"
          sx={{ fontWeight: 600, marginTop: 1, fontSize:25 }}
        >
          {precio + " $"}
        </Typography>: <Skeleton height={'65px'}/> }
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
        <Box sx={{ my:3, justifyContent:'center', alignItems:'certer', display:'flex' }}>
          <Contador  sx={{marginTop:4}}  />
        </Box>
      </Grid>
  
    </Grid>
    </Box>
  );
};

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import NotFound from '../assets/notFount.jpg'

import { Box, Button, Divider, Grid, Skeleton,capitalize,TextField, Stack, Rating, Alert, AlertTitle } from "@mui/material";
import { RatingProduct } from "./RatingProduct";
import { Contador } from './Contador';

import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../helpers/getProductById";
import { getReviewById } from "../helpers/getReviewsById.js";
import Page404 from "../dashboard/pages/Page404";
import NotFound404 from "../pages/NotFound404";
import Producto404 from "../pages/Producto404";
import {TYPES} from '../actions/ShoppingCartActions.js'
import { AuthContext } from "../auth/AuthContext";


export const ProductDetail_comp = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [review, setReview] = useState([])
  const [reviewLoad, setReviewLoad] = useState(true);
  const [revErr, setRevErr] = useState(null);
  const [rating, setRating] = useState(0);
  const { user } = useContext(AuthContext);

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
        setError(true)
      }
      return dispatch({ type: "SET_ISLOADING_FALSE" });
    };
    getProduct();
  }, [id, dispatch, navigate]);

  useEffect(() => {
    const getReview = async ()=>{
      try {
        const getReview = await getReviewById(id);
        setReview(getReview);
      } catch (error) {
        setRevErr(true)
      }
    }
    getReview()
  }, [id])

  useEffect(() => {
    if (review.length){
      let suma = review.reduce(  (acc, current) => acc + current.puntaje, 0 )
      console.log(suma)
      const promedio = Math.round(suma / review.length);
      setRating(promedio)
    }
  }, [review])
  

    
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
        <RatingProduct value={rating} sx={{alignItems: "center"}}/>
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
          <Inventory2OutlinedIcon color="secondary" sx={{ fontSize: 24, ml:{md:2, xs:0} }} /> {`En stock: ${stock} u.`}
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

        {
        
        review.length
          ?review.map( rev=>(

          <Grid key={rev.id} container sx={{boxShadow:15, borderRadius:'8px',my:2}}>

            <Grid item xs={12}  >
                <Typography variant="body1" sx={{ py:2, pl:3, fontWeight:700, fontSize:'1rem'}} > { user.usuarios?.find(el=>el.id==rev.usuarioId)?.nombre || rev.usuarioId } </Typography>
            </Grid>

            <Grid item xs={12} >
                <Divider variant="middle" color='black' sx={{mb:2}} />

            </Grid>
            <Grid item xs={12} md={6} sx={{pl:4}} >
              <Stack spacing={1} sx={{mb:4}}>
                  <Typography
                  variant='body2'
                  sx={{fontWeight:700}}
                  >
                    {capitalize(rev.titulo)}
                  </Typography>
                  <Typography
                  variant='body2'
                  sx={{opacity:'90%'}}
                  >
                    {capitalize(rev.comentario)}
                  </Typography>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4} sx={{alignItems:'center'}} >
                <Stack spacing={1} sx={{alignContent:'center'}} >
                    <Rating 
                        sx={{m:'10px auto'}}
                        name="simple-controlled"
                        value={rev.puntaje}
                        readOnly
                
                    />
                    
                </Stack>
            </Grid>

          </Grid>

          
        ) )
        :<Alert severity="info" sx={{my:8}} >
          <AlertTitle>Comentarios</AlertTitle>
          Aun no existen comentarios para este producto
        </Alert>
      }

        </Grid>
  
    </Grid>
    </Box>
  );
};
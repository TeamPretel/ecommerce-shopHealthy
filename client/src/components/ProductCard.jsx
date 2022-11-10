import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Alert, Box, Button, Skeleton,} from '@mui/material';
import { RatingProduct } from './RatingProduct';
import {Link as RouterLink} from 'react-router-dom'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useDispatch, useSelector} from 'react-redux';
import { TYPES } from '../actions/ShoppingCartActions'
import Label from '../dashboard/components/label'


export const ProductCard = ({imgCard, prodName, prodPrice,id, stock, activo})=> {

  const {allProducts, cart} = useSelector( s => s.catalogReducer)
  const dispatch = useDispatch();

  const hadleAddCart = e =>{
    e.preventDefault(); 
    if(!cart.length || !cart.find(el => el.id == parseInt(id) ) || cart.find(el => el.id == parseInt(id) ).quantity < stock) dispatch({type: TYPES.ADD_TO_CART, payload: {id:id, precio:prodPrice}})
  }
  return (
    <>
    <Card sx={{ width: 345,  boxShadow:15, pt:4 }}  >
      <Box component={RouterLink} to={`/catalogo/${id}`} >
        {stock < 5 && <Label
          variant="filled"
          color='error'
          sx={{
            zIndex: 9,
            top: 16,
            right: 16,
            position: 'absolute',
            
          }}
        >
          {`Apurate, queda solo ${stock} !`}
        </Label>}
          {<CardMedia
            component="img"
            height="194"
            image={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${imgCard}`||<Skeleton height={194}/>}
            alt={prodName}
            sx={{width:194, margin:"0 auto"}}
          /> }
      </Box>
      <CardContent>
            {/* <RatingProduct sx={{alingItems:"center"}} /> */}
            <Typography sx={{height:'50px'}} variant="body2" color="text.primary" textTransform="uppercase" fontWeight="bold">
                {prodName}
            </Typography>
            <Typography variant="body1" color="text.primary" textAlign='center' sx={{fontWeight:600, margin: "10px 0"}} >
                {prodPrice+'$'}
            </Typography>
            <Box sx={{display:'flex', justifyContent:'center', alingItems:'center',}}>
            {activo?<Button 
              variant="outlined" 
              sx={{margin:"5px auto",width:'80%', mb:1}} 
              startIcon={<AddShoppingCartIcon />}
              onClick={hadleAddCart}
              >
                <Typography  sx={{fontSize:13.5}} >Agregar al carrito</Typography>
            </Button>
                :<Alert severity="info" >No disponible por el momento</Alert>}
            </Box>
      </CardContent>
      
    </Card>
    </>
  );
}

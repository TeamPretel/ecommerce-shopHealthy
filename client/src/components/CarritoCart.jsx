import { Card, CardMedia, Skeleton, Box, Container, Typography,Grid, capitalize, IconButton, Button } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { fCurrency } from '../dashboard/utils/formatNumber';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useDispatch, } from 'react-redux';
import {TYPES} from '../actions/ShoppingCartActions'
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
const CarritoCart = ({ imgCard, name, price, quantity, id, stock }) => {
  
  const dispatch = useDispatch();

  const delFromCart = (id,all=false)=>{
    if(all){
        dispatch({type:TYPES.REMOVE_ALL_FROM_CART, payload:id})
    }else{
        dispatch({type:TYPES.REMOVE_ONE_FROM_CART, payload:id})
    }
}
  const addFromCart = ()=>{
    if (quantity < stock ) dispatch({type: TYPES.ADD_TO_CART, payload: {id:id}})
}



  return (
    <>
      <IconButton onClick={()=>delFromCart(id, true) } sx={{position:'absolute', zIndex:200, color:t=>t.palette.error.main }} >
          <DeleteRoundedIcon />
      </IconButton>
      <Grid container spacing={0} 
        sx={{ p:2, m:'5px 2px', bgcolor:'#F4F6F8', borderRadius:2, boxShadow:7,  display: 'flex', alignItems:'center', }}>
        <Grid item xs={3}  >
          <Box  component={RouterLink} to={`/catalogo/${id}`}   >
            {
              <CardMedia
                component="img"
                height="90"
                
                image={`https://dkndrd.com/pf-healthyShop/${imgCard}` || <Skeleton height={90} />}
                alt={name}
                
              />
            }
          </Box>
        </Grid>
        <Grid item xs={8} sx={{display:'flex',pl:1.5, alignItems:'center',}} >
          <Stack>
            <Typography  sx={{color:'black', fontSize:{xs:'14px',md:'16px'}, fontWeight:900,}}>{capitalize(name)}</Typography>
            <Typography  sx={{color:'black', fontSize:{xs:'13px',md:'14px'},}}>{`${fCurrency(price)} x ${quantity} = ${fCurrency( price * quantity )}`}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={1}  >
          <Stack>
            <IconButton onClick={()=>addFromCart() } sx={{right:6}} >
                <AddCircleOutlinedIcon sx={{color:t=>t.palette.primary.main}} />
            </IconButton>
            <IconButton onClick={()=>delFromCart(id) } sx={{right:6}} >
                <RemoveIcon />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default CarritoCart;

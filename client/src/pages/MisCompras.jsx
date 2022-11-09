import { CardMedia, Grid, Typography, Stack,Container, Button, Divider, Box, Skeleton, capitalize, Rating } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { initProducts } from "../actions/getInitProducts";
import ShopProductCard from "../dashboard/sections/@dashboard/products/ProductCard"
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import { Link as RouterLink } from "react-router-dom";
import { DrawerReview } from "../components/DrawerReview";
import { fCurrency } from "../dashboard/utils/formatNumber";

export const MisCompras = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initProducts())
      }, [dispatch]);

    const [open, setOpen] = useState (false);
    const [id, setId] = useState('');
    const [value, setValue] = useState(4);



    const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    };
    const setOptions = (id)=>{
        setOpen(true);
        setId(id)
    }

    let {products} = useSelector(s=>s.catalogReducer)

    products = products.slice(85)

  return (
    <Container sx={{pb:5}} >
        <Box sx={{ textAlign:'center'}} >
            <Typography variant="h3" sx={{color: t=>t.palette.primary.dark}} > 
            <ShoppingBagOutlinedIcon sx={{mt:-1,mr:2}}  />
            Mis Compras
            </Typography>
        </Box>
        {products.map(el=>(
        
        <div key={el.id}>
        <Grid container sx={{boxShadow:15, borderRadius:'8px', my:2, pb:3 }}>

            <Grid item xs={6}  >
                <Typography variant="h5" sx={{ py:2, pl:3}} >Estado: <Typography variant="body1" display='inline' >entregado</Typography>  </Typography>
            </Grid>

            <Grid item xs={6}  >
                <Typography variant="h5" sx={{ py:2}} >Fecha de envio: <Typography variant="body1" display='inline' >25/85/5</Typography></Typography>
            </Grid>
            <Grid item xs={12} >
                <Divider variant="middle" color='black' sx={{mb:2}} />

            </Grid>

            <Grid item xs={12} md={2} sx={{display:'flex', alignItems:'center', justifyContent:'center'}} >
                <CardMedia
                component="img"
                height="194"
                image={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${el.img}`||<Skeleton height={194}/>}
                alt={'nombre'}
                sx={{width:'auto', height:'140px' }}
                />

            </Grid>

            <Grid item xs={12} md={6} sx={{m:'auto'}} >
                <Stack spacing={1} sx={{display:'flex', alignItems:'center', justifyContent:'center'}} >
                    <Typography sx={{px:1, fontWeight:700 }} >{ capitalize(el.nombre )}</Typography>
                    <Typography variant="body1" sx={{px:1, opacity:'85%', m:'0 auto' }} >{ capitalize(el.marca.nombre)}</Typography>
                    <Typography variant="body1" sx={{px:1, opacity:'85%' }} > { ` ${fCurrency(el.precio)} x ${2} ` } </Typography>
                    <Rating 
                        sx={{m:'10px auto'}}
                        name="simple-controlled"
                        value={value}
                        readOnly                
                    />

                </Stack>
            </Grid>

            <Grid item xs={12} md={4} sx={{alignItems:'center'}} >
                <Stack spacing={1} sx={{m:'auto 15px', alignContent:'center'}} >
                    <Typography variant="body1" sx={{fontWeight:700}} >{`Total -> ${fCurrency(el.precio *2 )}`}</Typography>
                    <Button onClick={()=>{setOptions(el.id)}} variant="contained" > Calificar </Button>
                </Stack>
            </Grid>
        </Grid>
        <DrawerReview id={id} compareId={el.id} nombre={el.nombre} img={el.img} toggleDrawer={toggleDrawer} open={open} setOpen={setOpen} />
        </div>
    ))}
    </Container>
  )
}

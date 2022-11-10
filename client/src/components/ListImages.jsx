
import Grid from '@mui/material/Grid';
import { ProductCard } from './ProductCard';

export const ListImages = ({data})=> {
  return (
    <Grid container spacing={2} 
          sx={{ justifyContent:'space-around', alignItems:'center', display:'flex',}} >
        {data?.currentData().map(el=>(
            
            <Grid item key={el.id} sm={6} xs={12} lg={4} sx={{ justifyContent:'space-around', alignItems:'center', display:'flex', }} >
                <ProductCard 
                  imgCard={el.img} 
                  prodName={el.nombre} 
                  prodPrice={el.precio} 
                  id={el.id} 
                  stock = {el.stock}
                  activo={el.activo}
                />
            </Grid >
          
        ))}
    </Grid>
  )
}

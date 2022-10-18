
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ProductCard } from './ProductCard';

export const ListImages = ({data})=> {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} >
                {data?.currentData().map(el=>(
                    <Grid key={el.id} item sm={6} xs={12} lg={4} >
                        <ProductCard imgCard={el.img} prodName={el.nombre} prodPrice={el.precio} id={el.id} />
                    </Grid >
                ))}
        </Grid>
    </Box>
  )
}

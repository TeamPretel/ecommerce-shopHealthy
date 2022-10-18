import { Button, Grid, TextField, Typography,} from "@mui/material";
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export const Contador = () => {

    const [count, setCount] = useState(0);
    const handleChange = e =>{
        if(e.target.value >=0)setCount(e.target.value)
    }
  return (
    <Grid container spacing={0}>
        <Grid item xs={4} sx={{justifyContent:'space-around'}}>
            <Button onClick={() => (count >=1)&&setCount((count) => count - 1)}>
            <RemoveIcon/>
            </Button>
        </Grid>
        <Grid item xs={4} >
            <TextField
                sx={{width:"35px"}}
                hiddenLabel
                id="filled-hidden-label-small"
                variant="standard"
                size="small"
                placeholder='> 0'
                value={count}
                type='number' 
                InputProps={{
                    inputProps: { 
                        max: 100, min: 0 
                    }
                }}
                onChange={handleChange}
                
            />
            
        </Grid>
        <Grid item xs={4}>
            <Button onClick={() => setCount((count) => count + 1)}>
            <AddIcon/>
            </Button>
        </Grid>
        <Button variant="outlined" sx={{margin:"15px auto"}} startIcon={<AddShoppingCartIcon />}>
            <Typography >Agregar al carrito</Typography>
        </Button>
    </Grid>
  )
}

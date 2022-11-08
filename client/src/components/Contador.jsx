import { Button, Grid, TextField, Typography, Box} from "@mui/material";
import { useState } from "react"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {useDispatch} from 'react-redux';
import {TYPES} from '../actions/ShoppingCartActions.js'
import { useEffect } from "react";

export const Contador = ({defaultValue, id, maxValue}) => {

    const dispatch = useDispatch()
    const [count, setCount] = useState(defaultValue || 1 );

    const handleChange = e =>{
        if(e.target.value >=0 && e.target.value <= maxValue )setCount(e.target.value)

    }

    useEffect( () => {
        dispatch({type: 'CUSTOM_ADD', payload:{quantity: count, id:id }})
        dispatch({type: TYPES.TOTAL_AMOUNT})
    }, [count, dispatch])
    
    

  return (
    <Box sx={{width:'200px'}} >
    
    <Grid container spacing={0} x={{justifyContent:'center', alingItems:'center',}} >
        <Grid item xs={4} sx={{justifyContent:'center'}}>
            <Button onClick={() => (parseInt(count) > 1 ) && setCount(parseInt(count) - 1)} sx={{textAlign:'center'}} >
            <RemoveIcon/>
            </Button>
        </Grid>
        <Grid item xs={4} x={{ textAlign:'center', alignItems:'center', justifyContent:'center', display:'flex'}}>
            <TextField
                sx={{width:1, textAlign:'center', alignItems:'center', padding:0,}}
                hiddenLabel
                id="filled-hidden-label-small"
                variant="outlined"
                size="small"

                placeholder='0'
                value={count}
                InputProps={{
                    // endAdornment: <InputAdornment position="start">u.</InputAdornment>,
                    inputProps: { 
                        max: 100, min: 1,
                        
                    },
                    sx: {
                        "& input": {
                            textAlign: "center"
                        }
                    }
                }}
                onChange={handleChange}
                
                
            />
            
        </Grid>
        <Grid item xs={4}>
            <Button onClick={() => {if (parseInt(count)<maxValue) setCount(parseInt(count) + 1); else if(!count) setCount(1) }} sx={{textAlign:'center'}}>
            <AddIcon/>
            </Button>
        </Grid>
    </Grid>
    </Box>
  )
}

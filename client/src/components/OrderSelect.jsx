import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ButtonGroup, capitalize, IconButton } from '@mui/material';
import { useOrder } from '../Hooks/useOrder';
import { Stack } from '@mui/system';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDispatch } from 'react-redux';
import { orderAsc, orderDesc } from '../actions/order';


export const OrderSelect = ({setPage})=> {

const { keyToOrder, order, setOrder, onChangeFilterType, onChangeOrderKey,} = useOrder(setPage);
const dispatch = useDispatch();
const keys = ['nombre', 'precio'];

  return (
    <div>
        <Stack direction='row' m={5}>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 110 }} >
                <InputLabel id="demo-simple-select-standard-label">Ordenar por:</InputLabel>
                <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={keyToOrder}
                onChange={onChangeOrderKey}
                label={keyToOrder}
                >

                { keys.map( el => <MenuItem key={el} value={el}  sx={{backgroundColor:'transparent'}} >{ capitalize(el) }</MenuItem> ) }
                
                </Select>
            </FormControl>

            <ButtonGroup 
            orientation="vertical"
            aria-label="vertical contained button group"
            variant="contained"
            sx={{padding:0,height:35,mt:3, boxShadow:'none'}}
            >
                <IconButton  sx={{ width:"20px", height:"10px", margin:0, color:order?'#64B98B':'black'}} onClick={ ()=> {setOrder(true); dispatch(orderAsc(keyToOrder))}}>
                    <KeyboardArrowUpIcon />
                </IconButton>
                <IconButton  sx={{ width:"20px", height:"10px", margin:0,color:!order?'#64B98B':'black'}} onClick={ ()=> {setOrder(false);dispatch(orderDesc(keyToOrder))}}>
                    <KeyboardArrowDownIcon />
                </IconButton>
            </ButtonGroup>

        </Stack>
      
    </div>
  );
}

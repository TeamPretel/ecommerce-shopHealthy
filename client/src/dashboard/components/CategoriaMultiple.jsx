import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { categorias } from '../../helpers/categoriasPrueba';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { InputLabel, OutlinedInput } from '@mui/material';



const StyledSelect = styled(Select)(({ theme }) => ({
    border: 'none',
    color: 'white',
    marginTop: 11,
    backgroundColor:'none',
    "&:hover":{
    backgroundColor:'none',
    border:'none',
    },
    "&::before":{
    backgroundColor:'none',
    border:'none',
    },
    "&::after":{
    backgroundColor:'none',
    border:'none',
    }

  }));

  const ITEM_HEIGHT = 60;
  const ITEM_PADDING_TOP = 0;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

export const CategoriaMultiple = ()=> {

  const [categoriaCheckBox, setCategoriaCheckBox] = useState([]);
  const [len, setLen] = useState(1);
  const [valueUnchecked, setValueUnchecked] = useState([]);
  const [checked, setChecked] = useState({check: null, unCheck: null});
   

  const handleChangeMultiple = (event) => { 
    const {target: { value }} = event;
    const valueLen = value.length;
    const unchecked = valueUnchecked.filter(el => !value.includes(el)).join('')

    if (valueLen > len) {setChecked({check: value[value.length-1], unCheck: null});}
    else setChecked({check: null, unCheck: unchecked});
    setLen(value.length);
    setValueUnchecked(value); 
    setCategoriaCheckBox(
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">categoria</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={categoriaCheckBox}
          onChange={handleChangeMultiple}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categorias.map(el => (
            <MenuItem key={el.id} value={el.nombre}>
              <Checkbox checked={categoriaCheckBox.indexOf(el.nombre) > -1} />
              <ListItemText primary={el.nombre} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

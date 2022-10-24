import queryString from 'query-string';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {categorias} from '../helpers/categoriasPrueba'
import { useDispatch, useSelector } from 'react-redux';
import { addNestedFilter, filterByCateg, removeNestedFilter } from '../actions/filterProductByCateg';
import {  useLocation, useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Menu } from '@mui/material';



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

export const FilterSelect = ({categTitle})=> {

  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse( location.search );
  const dispatch = useDispatch();

  let categGroup ={
    'TENTACION SALUDABLE':[2,3,4,5,6],
    'alacena saludable':[1,7,8,9,10,11],
    'estilo de vida':[17,18,19,20],
    'bebidas':[12,13,14,15,16]
  }
  let nestedFilter = ['estilo de vida'];

  const [categoriaCheckBox, setCategoriaCheckBox] = useState([categTitle]);
  const [categoria, setCategoria] = useState(categTitle);
  const [subCategoria, setSubCategoria] = useState([]);
  const [len, setLen] = useState(1);
  const [valueUnchecked, setValueUnchecked] = useState([]);
  const [checked, setChecked] = useState({check: null, unCheck: null});
  
  useEffect(() => {
    const getCategs = ()=>{
      let categToShow = []
      for (const categ in categGroup) {
        if (categTitle.toLowerCase() === categ.toLocaleLowerCase()) categToShow = categGroup[categ].map(el=> {
          let index = 0;
          if(categorias.find((ele, i) => {index = i; return ele.id == el})) return {nombre:categorias[index].nombre, id: categorias[index].id}
        });;
      }
      setSubCategoria( categToShow );
    }
    getCategs()
  }, [])
  
  
  const handleChange = (event) => {
    if (event.target.value.toLocaleLowerCase() !== categTitle.toLocaleLowerCase()) dispatch(filterByCateg(event.target.value));
    navigate(`/catalogo`);
    setCategoria(event.target.value);
    setCategoria(categTitle)
  };

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


  useEffect(() => {
    console.log(checked)
    if (checked.check) dispatch(addNestedFilter(checked.check));
    else if (checked.unCheck) dispatch(removeNestedFilter(checked.unCheck))
  }, [dispatch, checked])
  

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        {
          (nestedFilter.find( el => el.toLocaleLowerCase() !== categTitle.toLocaleLowerCase()))
                ?
            <StyledSelect
              value={categoria}
              onChange={handleChange}
              variant='standard'
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value={categTitle}>
                <Typography 
                          textAlign="center"                    
                          sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
                          >{categTitle}</Typography>
              </MenuItem>
              {
                subCategoria?.map( el=> (<MenuItem  key={el.id} value={el.nombre}>
                  <Typography 
                    textAlign="center"                    
                    sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
                    >{el.nombre.toUpperCase()}
                  </Typography>
                </MenuItem>))
              }
            </StyledSelect>
                :
            <StyledSelect
              variant='standard'
              multiple
              value={categoriaCheckBox}
              sx={{fontSize:"0.875rem"}}
              defaultValue={categTitle}
              renderValue={() => categTitle}
              onChange={handleChangeMultiple}
              MenuProps={MenuProps}
              // inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={categTitle} disabled >
                <Typography 
                    textAlign="center"                    
                    sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
                    >{categTitle}</Typography>
              </MenuItem>
            {subCategoria?.map(el => (
              <MenuItem key={el.id} value={el.nombre}  >
                <Checkbox checked={categoriaCheckBox.indexOf(el.nombre) > -1} />
                <ListItemText primary={el.nombre} />
              </MenuItem>
            ))}
          </StyledSelect>


        }
        
      </FormControl>
    </div>
  );
}

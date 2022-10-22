import * as React from 'react';
import queryString from 'query-string';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {categorias} from '../helpers/categoriasPrueba'
import { useDispatch, useSelector } from 'react-redux';
import { filterByCateg } from '../actions/filterProductByCateg';
import {  useLocation, useNavigate } from "react-router-dom";



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

export const FilterSelect = ({categTitle})=> {

  let categGroup ={
    'TENTACION SALUDABLE':[2,3,4,5,6],
    'alacena saludable':[1,7,8,9,10,11],
    'estilo de vida':[17,18,19,20],
    'bebidas':[12,13,14,15,16]
  }
  
  
  const [categoria, setCategoria] = React.useState(categTitle);
  



  const navigate = useNavigate();
  const location = useLocation();

  const { q = '' } = queryString.parse( location.search );



  const dispatch = useDispatch();
  
  const getCategs = ()=>{
    let categIds = []
    for (const categ in categGroup) {
      if (categTitle.toLowerCase() === categ.toLocaleLowerCase()) categIds = categGroup[categ];
    }
    
    let names = categIds?.map(el=> {
      let index = 0;
      if(categorias.find((ele, i) => {index = i; return ele.id == el})) return {nombre:categorias[index].nombre, id: categorias[index].id}
    });
    return names;
  }
  //TODO: arreglar useefect para evitar re-renderizados
  
  const handleChange = (event) => {
    if (event.target.value.toLocaleLowerCase() !== categTitle.toLocaleLowerCase()) dispatch(filterByCateg(event.target.value));
    navigate(`/catalogo`);
    setCategoria(event.target.value);
    setCategoria(categTitle)
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
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
            getCategs()?.map( el=> (<MenuItem  key={el.id} value={el.nombre}>
              <Typography 
            textAlign="center"                    
            sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
            >{el.nombre.toUpperCase()}</Typography></MenuItem>))
          }
        </StyledSelect>
        
      </FormControl>
    </div>
  );
}

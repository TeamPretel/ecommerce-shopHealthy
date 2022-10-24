import { Box, Button, FormControlLabel, FormGroup, Grid, IconButton, Menu, MenuItem, Tooltip, } from "@mui/material";
import queryString from 'query-string';
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {categorias} from '../helpers/categoriasPrueba';
import Checkbox from '@mui/material/Checkbox';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Stack } from "@mui/system";
import Typography from '@mui/material/Typography';
import { filterByCateg } from "../actions/filterProductByCateg";



export const Filters = ({categTitle, handleCloseNavMenu}) => {

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

    const [subCategoria, setSubCategoria] = useState([]); 
    const [checked, setChecked] = useState(true);  
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };
      const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
      };
    
    
      const handleCloseUserMenu = () => {
        setAnchorElUser(null);
      };
    const [anchorElNav, setAnchorElNav] = useState (null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    useEffect(() => {
        const getCategs = ()=>{
          let categToShow = []
          for (const categ in categGroup) {
            if (categTitle.toLowerCase() === categ.toLocaleLowerCase()) categToShow = categGroup[categ].map(el=> {
              let index = 0;
              if(categorias.find((ele, i) => {index = i; return ele.id == el})) return {nombre:categorias[index].nombre, id: categorias[index].id}
            });
          }
          setSubCategoria( categToShow );
        }
        getCategs()
      }, [])

      const handleChange = (event) => {
        dispatch(filterByCateg(event.target.innerText));
        navigate(`/catalogo`);
      };

  return (
    <>
            <MenuItem  onClick={handleOpenUserMenu} sx={{ fontSize:"0.873rem", color:'white',cursor:'pointer',display:'block' }}>
            {categTitle}
            </MenuItem>
        <Menu
              sx={{ mt: '45px', }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >  
            {
                (nestedFilter.find( el => el.toLocaleLowerCase() !== categTitle.toLocaleLowerCase()))
                ?
                <Stack direccion='colum' >
                    {
                        subCategoria.map( (el, i) =>(
                            <Button 
                                value={el.nombre}
                                onClick={handleChange}
                                key={i}
                                sx={{textDecoration:'none', color:'inherit', my:-0.3, justifyContent:'left'}}
                            > <Typography sx={{fontSize:'0.875rem', textAlign:'left', }} >{el.nombre.toUpperCase()}</Typography> 
                            </Button>
                        ))
                    }
                </Stack>
                :
                <Stack direccion='colum' >
                    {
                        subCategoria.map( el =>(
                        <FormGroup key={el.id}>
                            <FormControlLabel sx={{p:1,my:-1, py:0.3}} control={<Checkbox checked={checked} onChange={handleChange} sx={{fontSize:"0.2rem"}} />} label={el.nombre} />
                        </FormGroup>))
                    }
                </Stack>
            }

        </Menu>
    </>
//     <MenuItem>
//         {/* <Checkbox checked={checked} onChange={handleChange} /> */}
//         {/* {
//           (nestedFilter.find( el => el.toLocaleLowerCase() !== categTitle.toLocaleLowerCase()))
//                 ?
//            subCategoria?.map( el=> (
//             <Checkbox checked={checked} onChange={handleChange} />
//             ))
//                 :
//             <StyledSelect
//               variant='standard'
//               multiple
//               value={categoriaCheckBox}
//               sx={{fontSize:"0.875rem"}}
//               defaultValue={categTitle}
//               renderValue={() => categTitle}
//               onChange={handleChangeMultiple}
//               MenuProps={MenuProps}
//               // inputProps={{ 'aria-label': 'Without label' }}
//           >
//             <MenuItem value={categTitle} disabled >
//                 <Typography 
//                     textAlign="center"                    
//                     sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
//                     >{categTitle}</Typography>
//               </MenuItem>
//             {subCategoria?.map(el => (
//               <MenuItem key={el.id} value={el.nombre}  >
//                 <Checkbox checked={categoriaCheckBox.indexOf(el.nombre) > -1} />
//                 <ListItemText primary={el.nombre} />
//               </MenuItem>
//             ))}
//           </StyledSelect>


//     //     } */}

    
//     {/* // </MenuItem> */}
//   {/* ) */}
)}

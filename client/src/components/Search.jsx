import * as React from 'react';
import { styled, } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, capitalize, IconButton, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { generalSearch } from '../actions/search';
import { useNavigate } from 'react-router-dom';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  margin:0,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  '&:hover': {
    backgroundColor: 'white',
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: '300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(0),
    width: '500px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const SearchBar = ()=> {
    const [anchorEl, setAnchorEl] = useState(null);
    const {allProducts} = useSelector(state => state.catalogReducer);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
    const hadleInputChange = e =>{
      console.log(e.target.value)
      e.target.value && setSearch(e.target.value)
    }
    const handleChangeAutoComplete = e =>{
      const id = e.target.innerHTML.match(/(#[\d]+)/g).join().slice(1);
      navigate(`/catalogo/${id}`)
      
    }
    const handleClickButton = () =>{
      console.log(search)
      dispatch(generalSearch(search))
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{top:{xs:55, md:68}, height:75, alignItems:'center', justifyContent:'center' }}>
        <Toolbar  >
          <Search >
            {/* <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper> */}
            {/* <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            /> */}
             <Autocomplete
                freeSolo
                id="searchBar-ecomerce"
                disableClearable
                sx={{paddingLeft:0, }}
                value={search}
                options={allProducts.map( el => `${el.nombre} de -> ${el.marcaId.nombre} #${el.id}`.toLocaleUpperCase())}
                onInputChange={hadleInputChange}
                onChange={handleChangeAutoComplete}
                renderInput={(params) => (
                  <TextField
                    sx={{ border: 'transparent', }}
                    {...params}
                    
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                    onClick={e=>console.log(e)}
                  />
                )}
              />
          </Search>
          <IconButton onClick={handleClickButton}>
            <SearchIcon />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

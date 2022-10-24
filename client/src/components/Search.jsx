import * as React from 'react';
import { styled, } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';

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
  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{top:{xs:55, md:68} }}>
        <Toolbar sx={{margin:'0 auto'}} >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>

        </Toolbar>
      </AppBar>
    </Box>
  );
}

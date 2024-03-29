import { Avatar, Box, Grid, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { FilterAcordion } from './FilterAcordion';
import logo from '../assets/logo.png';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderAsc, orderDesc } from '../actions/order';


export const NavMobile = () => {
    
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
    setAnchorElNav(null);
    };
    const dispatch = useDispatch();
    const {categName} = useSelector(s=>s.catalogReducer)

  return (
    <Grid container sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <Grid item xs={6}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                sx={{mt:'7px'}}
              >
                <MenuIcon />
              </IconButton>

            </Grid>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "center",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },

              }}
            >
              
                <MenuItem onClick={handleCloseNavMenu}>
                  <Box
                    component={RouterLink}
                    onClick={()=> { dispatch({type:'RESET_CATALOG'});}}
                    to='/catalogo'
                    sx={{textDecoration:'none', color:'inherit'}}

                  >
                    <Typography 
                      textAlign="center"
                      sx={{fontWeight:600}}
                      >CATÁLOGO
                    </Typography>
                  </Box>
                </MenuItem>
                {
                  categName.map( (el,i)=>(
                      <FilterAcordion  categTitle={el} key={i} id={i} handleCloseNavMenu={handleCloseNavMenu} />   
                  ) )
                }

                <MenuItem onClick={handleCloseNavMenu}>
                <Box
                    component={RouterLink}
                    to='/contacto'
                    sx={{textDecoration:'none', color:'inherit'}}

                  >
                    <Typography 
                      textAlign="center"
                      sx={{fontWeight:600}}
                      >CONTÁCTO
                    </Typography>
                  </Box>
                </MenuItem>      
              

            </Menu>
            <Grid item xs={5}>

              <IconButton component={RouterLink} to="/" >
                <Avatar
                  alt="logo"
                  src={logo}
                  sx={{ display: { xs: "flex", md: "none", },}}
                />
              </IconButton>
            </Grid>
          </Grid>
  )
}

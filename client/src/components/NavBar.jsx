// import { AuthContext } from "../auth/AuthContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useState, useContext } from 'react';
import logo from '../assets/logo.png';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useNavigate} from 'react-router-dom';
import { FilterAcordion} from './FilterAcordion';
import { FilterSelect } from './FilterSelect';
import { useDispatch, useSelector } from 'react-redux';
import HandleLogout from '../helpers/HandleLogOut'
// import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { type } from '../../types/index'
import firebaseApp from '../credenciales'
import {getAuth, signOut} from 'firebase/auth'
const auth= getAuth(firebaseApp)
console.dir(auth)
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export const NavBar = () => {
  const { estadoGlobal, manejarUsuario } = useContext(AuthContext)

  console.dir(estadoGlobal)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [logeado, setLogeado] = useState(false)
  const {user} = useContext(AuthContext)
  const navigate = useNavigate();


  const dispatch = useDispatch();

  const { categName } = useSelector((state) => state.catalogReducer);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton component={RouterLink} to="/">
            <Avatar
              alt="logo"
              src={logo}
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HEALTHY FOOD
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
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
                <Typography
                  textAlign="center"
                  component={RouterLink}
                  sx={{ textDecoration: "none", color: "inherit" }}
                  to="catalogo"
                  onClick={() => dispatch({ type: "RESET_CATEG_NAME" })}
                  replace={true}
                >
                  Catálogo
                </Typography>
              </MenuItem>

              <FilterAcordion />

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  component={RouterLink}
                  sx={{ textDecoration: "none", color: "inherit" }}
                  to="contacto"
                >
                  Contacto
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <IconButton component={RouterLink} to="/">
            <Avatar
              alt="logo"
              src={logo}
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
          </IconButton>
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            HEALTHY FOOD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => dispatch({ type: "RESET_CATEG_NAME" })}
              sx={{ my: 2, color: "white", display: "block" }}
              component={RouterLink}
              to="catalogo"
            >
              Catálogo
            </Button>

              {categName.map((el, i)=> <FilterSelect key={i} categTitle={el} />) }
              
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to='contacto'
              >
                Contacto
              </Button>
              
              {console.log(user)}
              { user.logged? 
              // <Button 
              //   onClick={() => console.log(signOut(auth))}
              //   sx={{ my: 2, color: 'white', display: 'block' }}
              //   component={RouterLink}
              //   to='catalogo'
              // >Cerrar sesión
              // </Button>
              <HandleLogout/>
              :
              <Button 
                sx={{ my: 2, color: 'white', display: 'block' }}
                component={RouterLink}
                to={'login'}
              >Iniciar sesión
              </Button>
                }
          </Box>

          {/* <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

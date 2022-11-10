import { IconButton, Menu, Tooltip, Box, Button, MenuItem, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HandleLogout from '../helpers/HandleLogOut';
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { usuarioLogged, admin } from "../helpers/userMenuLinks";

export const NavUserMenu = ({user}) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0, position:'relative' }}>
        <Tooltip title={(!user.logged)? 'Iniciar Sesión': 'Mi perfil'}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr:2}}>
                <AccountCircleIcon sx={{m:0, ml:2}} />
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
        {
          (!user.logged)
            ? <Button 
            component={RouterLink}
            sx={{textDecoration:'none', color: '#64B98B',"&:hover":{color:'#57AF57' } }}
            to='/acceso'
            > Iniciar sesión
            </Button>

            :(user.logged && user.uid == user.adminId)?
            <Box>
            {admin(user.nombre).map( (el, i) => (
            <MenuItem key={i} onClick={handleCloseUserMenu} component={RouterLink} to={el.link} >
                <Typography 
                sx={{textDecoration:'none', color: '#64B98B',"&:hover":{color:'#64B98B' } }}

                >
                {el.label}
                </Typography>
            </MenuItem>
            ))}
            <MenuItem onClick={handleCloseUserMenu}>
                <HandleLogout />
            </MenuItem>
          </Box>

            :

            <Box>
            {usuarioLogged(user.nombre).map( (el, i) => (
            <MenuItem key={i} onClick={handleCloseUserMenu} component={RouterLink} to={el.link} >
                <Typography 
                sx={{textDecoration:'none', color: '#64B98B',"&:hover":{color:'#64B98B' } }}

                >
                {el.label}
                </Typography>
            </MenuItem>
            ))}
            <MenuItem onClick={handleCloseUserMenu}>
                <HandleLogout />
            </MenuItem>
          </Box>

        }
        </Menu>
    </Box> 
  )
}

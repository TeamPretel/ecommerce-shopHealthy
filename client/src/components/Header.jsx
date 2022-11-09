import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { IconButton, Link } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from 'react-router-dom';

export const Header_comp = (props) => {
  const navigate = useNavigate()
  return (
    <React.Fragment>

      <AppBar>
        <Toolbar>
          <IconButton onClick={()=>navigate(-1)} >
            <ChevronLeftIcon />
          </IconButton>
          <Link href="/catalogo" color="inherit" underline="none">
            <Typography variant="h6" component="div">
              Healty Food
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}></Box>
      </Container>
    </React.Fragment>
  );
};
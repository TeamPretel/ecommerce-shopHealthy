import { Helmet } from 'react-helmet-async';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Box, Avatar } from '@mui/material';
import { Stack } from '@mui/system';
import Logo from '../assets/logo.png'

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Producto404() {
  return (
    <>
      <Helmet>
        <title> 404 | Producto no existe </title>
      </Helmet>

      <Container >
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            ¡Producto no encontrado!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
          Lo sentimos, no pudimos encontrar el producto que estás buscando. ¿Quizás has escrito mal la URL?.
          </Typography>

          <Box
            component="img"
            src="/src/dashboard/assets/illustration_404.svg"
            sx={{ height: 150, mx: 'auto', my: { xs: 5, sm: 6 } }}
          />
        <Stack direction='row' spacing={3}>
          <Button to="/catalogo" size="large" variant="contained" component={RouterLink} sx={{bgcolor:'#637381', '&:hover':{bgcolor:'#637381', color:'black' }}} >
            Regresar 👉 Catálogo
          </Button>
        </Stack>
        </StyledContent>
      </Container>
    </>
  );
}

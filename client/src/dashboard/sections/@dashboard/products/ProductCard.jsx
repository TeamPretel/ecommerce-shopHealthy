import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack, capitalize, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };

export default function ShopProductCard({ product }) {
  const { img, nombre, precio,id, activo} = product;
  const navigate = useNavigate()

  return (
    <Card sx={{boxShadow:15}} >
      <Box sx={{ pt: '100%', position: 'relative' }}>
        
          {!activo && <Label
            variant="filled"
            color={(activo !== true && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {'inactivo'}
          </Label>}
        
        <StyledProductImg alt={nombre} src={`https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${img}`} />
      </Box>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Link color="inherit" underline="hover"> */}
          <Typography variant="subtitle2" noWrap>
            {capitalize(nombre)}
          </Typography>
        {/* </Link> */}

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Button variant='contained' onClick={()=>navigate(`/admin/dashboard/products/${id}`) } >Editar</Button>
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {/* {priceSale && fCurrency(priceSale)} */}
            </Typography>
            &nbsp;
            {fCurrency(precio)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '80%',
  height: '80%',
  objectFit: 'cover',
});

// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };

export default function MiniProductCard({ product }) {
  const { name, cover, price, colors, status, priceSale } = product;

  return (
    <Card>
      <Box sx={{pb:0, position: 'relative', display:'flex', justifyContent:'center', borderRadius:'2px', }}>
        <StyledProductImg alt={name} src={cover} sx={{borderRadius:'3px'}} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link color="inherit" underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

      </Stack>
    </Card>
  );
}

// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import Iconify from '../../../components/iconify';
import { ProductCard } from '../products';
import MiniProductCard from '../products/MiniProductCard';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, color = 'primary', sx,top, ...other }) {
  return (
    <Card
      sx={{
        py: 2,
        textAlign: 'center',
        color: (theme) => theme.palette.common.black,
        bgcolor: (theme) => theme.palette.grey,
        boxShadow: 10,
        ...sx,
      }}
      {...other}
    >
      <Typography sx={{color: (theme) => theme.palette.primary.dark}} variant='h4'>{`Top ${top}`}</Typography>
      {/* <StyledIcon
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Iconify icon={icon} width={24} height={24} />
      </StyledIcon> */}
      <MiniProductCard product={ {id: 2,
        cover: `https://dkndrd.com/pf-healthyShop/DEMETER-EL-PAMPA-ORGANICO-NUECES-PECAN-ORGANICAS-500G.jpg`,
        name: 'NUECES ORGÁNICAS 500GR',
        price: '',
        priceSale: '',
        colors:[],
        status: '',
}} />
      <Typography variant="h3">{fShortenNumber(total)}</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
    </Card>
  );
}

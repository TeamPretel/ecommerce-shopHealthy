// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/src/dashboard/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/admin/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'usuarios',
    path: '/admin/dashboard/user',
    icon: icon('ic_user'),
  },
  {
    title: 'productos',
    path: '/admin/dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'ventas',
    path: '/admin/dashboard/ventas',
    icon: icon('ic_prod'),
  },
];

export default navConfig;

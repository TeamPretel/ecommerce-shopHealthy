import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import EditarProducto from './pages/EditarProducto';

// ----------------------------------------------------------------------

export default function RouterDashBoard() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/dashboard/app" />},
        { path: '/dashboard/app', element: <DashboardAppPage /> },
        { path: '/dashboard/user', element: <UserPage /> },
        { path: '/dashboard/products', element: <ProductsPage /> },
        { path: '/dashboard/products/:id', element: <EditarProducto /> },
      ],
    },
    // {
    //   path: 'login',
    //   element: <LoginPage />,
    // },
    // {
    //   element: <SimpleLayout />,
    //   children: [
    //     { element: <Navigate to="/admin/dashboard/app" />, index: true },
    //     // { path: '404', element: <Page404 /> },
    //     // { path: '*', element: <Navigate to="/admin/404" /> },
    //   ],
    // },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}

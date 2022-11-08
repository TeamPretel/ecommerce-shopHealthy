import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import { useDispatch, useSelector } from 'react-redux';
import { initProducts } from '../../actions/getInitProducts';
// mock
// import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {

  const dispatch = useDispatch()

  const [openFilter, setOpenFilter] = useState(false);

  const {allProducts} = useSelector(s => s.catalogReducer)

  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <Helmet>
        <title> Dashboard: Productos </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        {/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <ProductSort />
          </Stack>
        </Stack> */}

        <ProductList products={allProducts} />
        {/* <ProductCartWidget /> */}
      </Container>
    </>
  );
}

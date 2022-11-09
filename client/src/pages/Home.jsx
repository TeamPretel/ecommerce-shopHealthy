import { ListImages } from '../components/ListImages'
import { Helmet } from 'react-helmet-async';

import { Box, CardMedia, Container, Divider, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {usePagination} from "../hooks/usePagination";
import Banner from '../assets/banner.png'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector,} from 'react-redux'
import { initProducts } from '../actions/getInitProducts';
import { ActionAlerts } from '../components/AlertCategoria';
import { OrderSelect } from '../components/OrderSelect';

export const Home = () => {

  const { products, allProducts, categ, setBanner, categAlert } = useSelector(state=> state.catalogReducer)
  const dispatch = useDispatch();
  let dataToShow = [];
  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);

  if(categ === 'All') dataToShow= allProducts;

  else dataToShow = products;

  const count = Math.ceil(dataToShow.length / PER_PAGE);
  const _DATA = usePagination(dataToShow, PER_PAGE);

  const handleChangePage = (e, p) => {
    if (p ==0) p=1;
    setPage(p);
    
    _DATA.jump(p);
  };

  useEffect(() => {
    if (_DATA.currentPage == 0) {_DATA.setCurrentPage(1);}
    if(page < 1) setPage(1)
    if(page > count ) {setPage(1);_DATA.jump(1);}
  }, [_DATA.currentPage, _DATA.setCurrentPage, page, setPage, count])

  return (
    <>
    <Helmet>
      <title> Healthy Shop | Catalogo </title>
    </Helmet>
    <Container sx={{marginTop:'1px'}} >
        { setBanner? <Box sx={{display:'flex', justifyContent:'center', alignItems:'center',mt:14}}>
          <CardMedia
            component="img"
            image={Banner}
            alt="Portada"
            height='400'
          />
        </Box> : <ActionAlerts categoria={categ}/> 
        }
        {

        }

        <OrderSelect setPage={setPage} jump={_DATA.jump} />

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems:'center', justifyContent:'center' }}>
          <ListImages data={_DATA}/>
        </Box>

        <Box  sx={{width:'98%',justifyContent:'center', alignItems:'center', display:'flex', my:4}}>
          <Pagination
          sx={{margin:'0 auto'}}
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChangePage}
        />
        {/* <CartFlotingButton /> */}
        </Box>
    </Container>
    </>
  )
}
import { ListImages } from '../components/ListImages'
import { Box, CardMedia, Container, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {usePagination} from "../hooks/usePagination";
import Banner from '../assets/banner.png'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector,} from 'react-redux'
import { initProducts } from '../actions/getInitProducts';
import { ShoppingCartBadge } from '../components/ShoppingCardBadge';
import { ActionAlerts } from '../components/AlertCategoria';
import { OrderSelect } from '../components/OrderSelect';

export const Home = () => {

  const {products, allProducts, categ, setBanner} = useSelector(state=> state.catalogReducer)
  const dispatch = useDispatch();
  let dataToShow = [];
  let [page, setPage] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);


  if(categ === 'All') dataToShow= allProducts;
  else dataToShow = products

  const count = Math.ceil(dataToShow.length / PER_PAGE);
  const _DATA = usePagination(dataToShow, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <Container sx={{marginTop:'1px'}} >
        { setBanner? <Box sx={{margin:'90px 0 25px'}}>
          <CardMedia
            component="img"
            image={Banner}
            alt="Portada"
            height='400'
          />
        </Box> : <ActionAlerts categoria={categ}/> }
        <OrderSelect setPage={setPage}/>
        <ListImages data={_DATA}/>
        <Grid container sx={{width:'98%',justifyContent:'center', margin:'30px 0'}}>
          <Pagination
          sx={{margin:'0 auto'}}
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
        {/* <ShoppingCartBadge position='fixed'/> */}
        </Grid>
    </Container>
  )
}
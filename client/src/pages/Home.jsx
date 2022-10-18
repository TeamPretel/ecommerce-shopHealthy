import { ListImages } from '../components/ListImages'
import { Box, CardMedia, Container, Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import {usePagination} from "../Hooks/usePagination";
import Banner from '../assets/banner.jpg'
import { useState, useEffect } from 'react';
import {useDispatch, useSelector,} from 'react-redux'
import { initProducts } from '../actions/getInitProducts';

export const Home = () => {

  const {allProducts} = useSelector(state=>{console.log(state); return state.catalogReducer})
  const dispatch = useDispatch();

  let [page, setPage] = useState(1);
  const PER_PAGE = 9;
  useEffect(() => {
    dispatch(initProducts())
  }, [dispatch]);

  const count = Math.ceil(allProducts.length / PER_PAGE);
  const _DATA = usePagination(allProducts, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  return (
    <Container sx={{marginTop:'30px'}} >
        <Box sx={{margin:'90px 0 25px', marginRight:4}}>
          <CardMedia
            component="img"
            image={Banner}
            alt="Paella dish"
          />
        </Box>
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
        </Grid>
    </Container>
  )
}
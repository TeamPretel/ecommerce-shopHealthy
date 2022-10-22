import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, Skeleton } from '@mui/material';
import { RatingProduct } from './RatingProduct';
import {Link as RouterLink} from 'react-router-dom'
import { Contador } from './Contador';


export const ProductCard = ({imgCard, prodName, prodPrice,id})=> {

  return (
    <Card sx={{ width: 345, height:450, }} >
      <Box component={RouterLink} to={`/catalogo/${id}`} >
      <CardMedia
        component="img"
        height="194"
        image={`https://dkndrd.com/pf-healthyShop/${imgCard}`}
        alt={prodName}
        sx={{width:194, margin:"0 auto"}}
      /> 
      </Box>
      <CardContent>
        <RatingProduct sx={{alingItems:"center"}} />
        <Typography variant="body2" color="text.primary" textTransform="uppercase" fontWeight="bold">
          {prodName}
        </Typography>
        <Typography variant="body1" color="text.primary" textAlign='center' sx={{fontWeight:600, margin: "20px 0"}} >
          {prodPrice+'$'}
        </Typography>
        <Contador sx={{marginTop:4}}  />
      </CardContent>
      
    </Card>
  );
}

import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import { Box, Button, Divider, Grid, Skeleton } from "@mui/material";
import { RatingProduct } from "./RatingProduct";
import { Contador } from './Contador';

import CreditCardIcon from "@mui/icons-material/CreditCard";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../helpers/getProductById";


export const ProductDetail_comp = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.catalogReducer);

  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "SET_ISLOADING_TRUE" });
      try {
        const productAux = await getProductById(id);
        dispatch({ type: "SET_ISLOADING_FALSE" });
        setProduct(productAux);
      } catch (error) {
        console.log("cayo el bendito back otra vez!");
      }
    };
    getProduct();
  }, [id, dispatch, navigate]);
  
  // if(!isLoading) return <Skeleton/>
  
<<<<<<< HEAD
  const { nombre, precio, img:coso } = product;
=======
  const { nombre, precio, img } = product;
>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
  

  return (
    <Grid container >
      <Grid sx={{ margin: "150px auto", display: "flex" }}>
<<<<<<< HEAD
        <CardMedia  component="img" sx={{height:"500px"}} image={`https://${coso}`} alt={nombre}/>
=======
        <CardMedia  component="img" sx={{height:"500px"}} image={`https://dkndrd.com/pf-healthyShop/${img}`} alt={nombre}/>
>>>>>>> d700cc4ea0da4328823679ecce3e6e009c6a4c11
        <Grid sx={{ margin: "150px auto", display: "column" }}>
          <Typography sx={{fontSize:30}}
            variant="body2"
            color="text.primary"
            textTransform="uppercase"            
            fontWeight="bold"       
          >
            {nombre}
            
          </Typography>
          <Divider/>
          <Typography
            variant="body1"
            color="text.primary"
            textAlign="center"
            sx={{ fontWeight: 600, marginTop: 1, fontSize:25 }}
          >
            {precio + " $"}
          </Typography>
          <Divider/>
          <RatingProduct sx={{alignItems: "center"}}/>
          <Divider/>
          <Typography>
            <CreditCardIcon color="secondary" sx={{ fontSize: 24 }} /> Aceptamos
            tarjetas todas las tarjetas.
          </Typography>
          <Typography>
            <AddShoppingCartIcon color="secondary" sx={{ fontSize: 24 }} />
            Aceptamos pagos en efectivo.
          </Typography>
          <Typography>
            <DeliveryDiningIcon color="secondary" sx={{ fontSize: 24 }} /> Lo
            llevamos a la puerta de tu casa.
          </Typography>
          <Contador  sx={{marginTop:4}}  />
        </Grid>
      </Grid>
    </Grid>
  );
};

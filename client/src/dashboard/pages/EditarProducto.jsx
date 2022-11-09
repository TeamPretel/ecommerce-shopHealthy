import React from 'react';
import { Box, Card, Typography, Stack, Button, TextField, Alert, InputLabel, FormControl, Select, MenuItem, Skeleton, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { styled,alpha } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
// utils
// components
import Label from '../components/label';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../helpers/getProductById';
import { useForm, Controller } from "react-hook-form";
import { editarProducto } from '../../actions/editarProducto';


// ----------------------------------------------------------------------
import { categorias } from '../../helpers/categoriasPrueba';

const ITEM_HEIGHT = 60;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const StyledProductImg = styled('img')({
  top: 20,
  width: '60%',
  objectFit: 'cover',
  position: 'absolute',
});
const RedditTextField = styled(React.forwardRef((props, ref) => (
    <TextField ref={ref} InputProps={{ disableUnderline: true }} {...props} />
  )))(({ theme }) => ({
    '& .MuiFilledInput-root': {
      border: '1px solid #e2e2e1',

      overflow: 'hidden',
      borderRadius: 4,
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      '&:hover': {
        backgroundColor: 'transparent',
      },
      '&.Mui-focused': {
        backgroundColor: 'transparent',
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
// ----------------------------------------------------------------------

// ShopProductCard.propTypes = {
//   product: PropTypes.object,
// };

export default function EditarProducto() {

  const { id } = useParams();
  const [product, setProduct] = useState ({});
  const [image, setImage] = useState('');
  const [load, setLoad] = useState(null);

  const dispatch = useDispatch ();

  const navigate = useNavigate ();

  useEffect(() => {
    const getProduct = async () => {
      dispatch({ type: "SET_ISLOADING_TRUE" });
      try {
        const productAux = await getProductById(id);
        setProduct(productAux);
      } catch (error) {
        console.log("cayo el bendito back otra vez!");
      }
      return dispatch({ type: "SET_ISLOADING_FALSE" });
    };
    getProduct();
  }, [id, dispatch, navigate]);
    
  const { nombre, precio, img, stock, activo, descripcion, marca, categoria } = product;
  const { handleSubmit, formState:{errors}, control, } = useForm();
  const [check, setCheck] = useState(activo)


  const onSubmit = (data)=>{
    
    let dataToPut = {...data}
    if (image) dataToPut = {...data, imagen: image.slice(83), precio: parseInt(precio) }
    dispatch(editarProducto(dataToPut, id))
    navigate('/admin/dashboard/products', {replace:true})

  }

  const uploadImage = async(e) =>{
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ykaylnwx");
    setLoad(true);
    const res = await fetch(
        'https://api.cloudinary.com/v1_1/dw8jw0zhx/image/upload',
        {
            method:"POST",
            body:data
        }
    )
    const file = await res.json();
    console.log(file.secure_url)
    setImage(file.secure_url);
    setLoad(false);
}


  if(!nombre) return <Typography variant='h3' m='0 auto' >Cargando...</Typography>

  return (
    <>
      <Card sx={{boxShadow:15, width:{xs:'100%',md:'60%'}, m:'0 auto'}} >
      <Box sx={{ pt: '70%', position: 'relative', display:'flex', justifyContent:'center', alignItems:'center'}}>
        
          {!activo && <Label
            variant="filled"
            color={(activo !== true && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {'inactivo'}
          </Label>}

            
          <IconButton color="primary" aria-label="upload picture" component="label" sx={{
              zIndex: 90,
              top: 16,
              left: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}>
            <input hidden accept="image/*" type="file" name='file' onChange={uploadImage} />
            <PhotoCamera fontSize='large'/>
          </IconButton>
                
        {!load? <StyledProductImg alt={nombre} src={image || `https://res.cloudinary.com/dw8jw0zhx/image/upload/v1667676017/healthy_shop_default/${img}`} />: <Skeleton sx={{zIndex:100, height:"140%", width:"80%", top:-60, position: 'absolute',}} />}
      </Box>
        <form onSubmit={handleSubmit(d=>onSubmit(d))}>
        <Stack spacing={1} sx={{m:2}} >
                <Controller 
                    name="nombre"
                    defaultValue={nombre}
                    control={control}
                    rules={{ required: true, maxLength:100 }}
                    render={({ field }) => <RedditTextField
                                            label="Nombre*"
                                            id="precio"
                                            variant="filled"
                                            style={{ marginTop: 11 }}
                                            {...field}
                                        />}
                
                />
                {errors?.nombre?.type === 'required' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">El nombre es requerido</Alert>}
                {errors?.nombre?.type === 'maxLength' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">Maximo 100 caracteres </Alert>}
                <Controller 
                    name="precio"
                    control={control}
                    rules={{ required: true, min:1, max:10000, pattern:/^([0-9])*$/ }}
                    defaultValue={precio}
                    render={({ field }) => <RedditTextField
                                            label="Precio (arg)*"
                                            id="precio"
                                            variant="filled"
                                            style={{ marginTop: 11 }}
                                            {...field}
                                        />}
                
                />
                {errors?.precio?.type === 'required' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">El precio es requerido</Alert>}
                {errors?.precio?.type === 'min' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">El precio mínimo es 1 </Alert>}
                {errors?.precio?.type === 'max' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">El precio máximo es 10000 </Alert>}
                {errors?.precio?.type === 'pattern' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">Solo números son validos </Alert>}
                <Controller 
                    name="marca"
                    control={control}
                    rules={{ required: true, maxLength:20 }}
                    defaultValue={marca?.nombre||''}
                    render={({ field }) => <RedditTextField
                                            label="Marca*"
                                            id="marca"
                                            variant="filled"
                                            style={{ marginTop: 11 }}
                                            {...field}
                                        />}
                
                />
                {errors.marca?.type === 'required' &&  <Alert sx={{height:'40px', p:0, m:0}} severity="error">El nombre de la marca es requerido</Alert>}
                {errors.marca?.type === 'maxLength' &&  <Alert sx={{height:'40px', p:0, m:0}} severity="error">Maximo 20 caracteres </Alert>}
                <Controller 
                    name="descripcion"
                    control={control}
                    rules={{maxLength:300 }}
                    defaultValue={descripcion}
                    render={({ field }) => <RedditTextField
                                            label="Descripcion*"
                                            multiline
                                            id="descripcion"
                                            variant="filled"
                                            style={{ marginTop: 11 }}
                                            {...field}
                                        />}
                
                />
                {errors?.nombre?.type === 'maxLength' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">Maximo 300 caracteres </Alert>}
                <Controller 
                    name="stock"
                    control={control}
                    rules={{ required: true, min:1, max:500, pattern:/^([0-9])*$/ }}
                    defaultValue={stock}
                    render={({ field }) => <RedditTextField
                                            label="Stock*"
                                            id="stock"
                                            variant="filled"
                                            style={{ marginTop: 11 }}
                                            {...field}
                                        />}
                
                />
                {errors?.stock?.type === 'required' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">El stock es requerido</Alert>}
                {errors?.stock?.type === 'min' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">El stock mínimo es 1 </Alert>}
                {errors?.stock?.type === 'max' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">El stock máximo es 500 </Alert>}
                {errors?.stock?.type === 'pattern' &&  <Alert sx={{height:'25px', p:0, mb:2}} severity="error">Solo números son validos </Alert>}
                <Controller 
                    name="categoria"
                    control={control}
                    defaultValue={categoria[0]?.nombre||''}
                    rules={{maxLength:30, required:true}}
                    render={({ field }) => (
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Categoria*</InputLabel>
                        <Select
                        {...field}
                        MenuProps={MenuProps}
                        label="Categoria"
                        
                      >
                        {categorias.map(el=>(
                            <MenuItem key={el.id} value={el.nombre}>
                            {el.nombre}
                          </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                      
                      
                      )}
                />
                {errors?.categoria?.type === 'required' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">La categoria 1 es requerida</Alert>}
                {errors?.categoria?.type === 'length' &&  <Alert sx={{height:'40px', p:0, mb:2}} severity="error">Maximo 30 caracteres </Alert>}
                
                <Controller 
                    name="categoriaDos"
                    control={control}
                    defaultValue={categoria[1]?.nombre || ''}
                    render={({ field }) => (
                        <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Categoria 2</InputLabel>
                        <Select
                        {...field}
                        MenuProps={MenuProps}
                        label="Categoria"
                        
                      >
                        <MenuItem value="">
                            <em>Ninguno</em>
                        </MenuItem>
                        {categorias.map(el=>(
                            <MenuItem key={el.id} value={el.nombre}>
                            {el.nombre}
                          </MenuItem>
                        ))}
                    </Select>
                    </FormControl>
                      
                      )}
                />
                    <Controller
                        name="activo"
                        control={control}
                        defaultValue={!!activo}
                        // checked={check}
                        render={({ field }) =><Checkbox {...field} />}
                        
                    />

            </Stack>
                <Stack direction='row' spacing={1} >
                    <Button type="submit" disabled={load} variant='contained' sx={{width:'50%'}} >
                        Modificar
                    </Button>
                    {/* <input type="submit" /> */}
                    <Button variant='contained' sx={{width:'50%'}} onClick={()=> navigate(-1)}  >
                        Cancelar
                    </Button>
                </Stack>
        </form>
    </Card>
    </>
  );
}

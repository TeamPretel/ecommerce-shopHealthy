import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { useSelector } from 'react-redux';

export const ActionAlerts = ({categoria}) => {
  const { categAlert } = useSelector( s=>s.catalogReducer )
  return (
    <Box sx={{mt:15, display:'flex', justifyContent:'center'}}>
      <Alert sx={{ "& .MuiAlert-icon": {
      display:'none'
    }}}>
      {
        (categAlert.categ && categAlert.subCateg.length)
              ? <Typography 
                  sx={{textAlign:'center', margin:"0", padding:"0", alignContent:"center"}} 
                >
                  <VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/>
                  { `${categAlert.categ.toUpperCase()} ${categAlert.subCateg.join(' -')} ` }
                </Typography>
              :(categAlert.categ )
               ?<Typography 
                  sx={{textAlign:'center', margin:"0", padding:"0", alignContent:"center"}} 
                >
                  <VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/>
                  { `${categAlert.categ.toUpperCase()}` }
                </Typography>
              :(categAlert.subCateg)
              ?<Typography 
                  sx={{textAlign:'center', margin:"0", padding:"0", alignContent:"center"}} 
                >
                  <VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/>
                  { `${categAlert.subCateg.join(' -')} ` }
                </Typography>
              :<p>No existe el archivo seleccionado</p>
      }
        {/* <Typography 
          sx={{textAlign:'center', margin:"0", padding:"0", alignContent:"center"}} 
        >
          <VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/>
           { `${categoria.toUpperCase()} ` }
        </Typography> */}

      </Alert>
    </Box>
  );
}

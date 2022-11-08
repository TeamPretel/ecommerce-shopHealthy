import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Box, Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

export const ActionAlerts = ({categoria}) => {
  return (
    <Box sx={{mt:15, display:'flex', justifyContent:'center'}}>
      <Alert sx={{ "& .MuiAlert-icon": {
      display:'none'
    }}}>
        <Typography sx={{textAlign:'center',  width:"530px", margin:"0", padding:"0", alignContent:"center"}} ><VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/> {categoria.toUpperCase()}</Typography>
      </Alert>
    </Box>
  );
}

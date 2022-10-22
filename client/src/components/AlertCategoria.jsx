import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';

export const ActionAlerts = ({categoria}) => {
  return (
    <Stack sx={{ width: '100%', margin:"90px 0 20px 0", }}>
      <Alert sx={{margin: "0 auto", width:"600px", "& .MuiAlert-icon": {
      display:"none"
    }}}>
        <Typography sx={{textAlign:'center',  width:"530px", margin:"0", padding:"0", alignContent:"center"}} ><VerifiedOutlinedIcon sx={{margin:'0 10px 2px 0 '}}/> {categoria.toUpperCase()}</Typography>
      </Alert>
    </Stack>
  );
}

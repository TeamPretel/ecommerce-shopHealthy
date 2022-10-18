import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';


const StyledSelect = styled(Select)(({ theme }) => ({
    border: 'none',
    color: 'white',
    marginTop: 11,
    backgroundColor:'none',
    "&:hover":{
    backgroundColor:'none',
    border:'none',
    },
    "&::before":{
    backgroundColor:'none',
    border:'none',
    },
    "&::after":{
    backgroundColor:'none',
    border:'none',
    }

  }));

export const FilterSelect = ({categTitle})=> {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <StyledSelect
          value={age}
          onChange={handleChange}
          variant='standard'
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
          <Typography 
                    textAlign="center"                    
                    sx={{textDecoration:'none', color:'inherit', fontSize:'0.875rem'}}
                    >{categTitle}</Typography>
          </MenuItem>
          <MenuItem value={10}>Categoria random</MenuItem>
          <MenuItem value={20}>Categoria random</MenuItem>
          <MenuItem value={30}>Categoria random</MenuItem>
        </StyledSelect>
        
      </FormControl>
    </div>
  );
}

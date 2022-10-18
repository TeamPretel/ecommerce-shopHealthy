import * as React from 'react';
import { styled } from '@mui/material/styles';
import{Link as RouterLink} from 'react-router-dom'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    // sx={{minWidth:200, maxWidth:200}}
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.8rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  maxHeight:10,
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
  minWidth:300, maxWidth:300, 
  backgroundColor:'#fff'
}));

export const FilterAcordion=()=> {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{with:"20"}}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>categoria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} sx={{with:"20"}}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>categoria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} sx={{with:"20"}}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>categoria</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        <AccordionDetails>
          <Typography component={RouterLink} sx={{textDecoration:'none', color:'inherit'}}>
            nombre de la categoria
          </Typography>
        </AccordionDetails>
        
      </Accordion>
    </div>
  );
}

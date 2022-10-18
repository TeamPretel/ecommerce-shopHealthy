import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material";

export const greenTheme = createTheme ({

  palette: {
    primary: {
      main: '#64B98B'
    },
    secondary: {
      main:'#4B9B6F'
    },
    error: {
      main: red.A400
    }
  }
})
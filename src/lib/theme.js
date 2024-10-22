import { createTheme } from '@material-ui/core/styles'
import { lightGreen, red } from '@material-ui/core/colors'
import { Rubik } from '@next/font/google';
const rubik = Rubik({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

let theme = createTheme()
// Create a theme instance.
theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 320,
      md: 768,
      lg: 1024,
      xl: 1920,
    },
  },
  palette: {
    warning: {
      main: '#E39539',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: 'background: linear-gradient(rgba(40, 23, 23, 0.18), #0b1024) !important',
    },
 
  },
  typography: {
    h3: {
      fontFamily: rubik.style.fontFamily,
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: '1.5rem',
      marginBottom: '1rem',
      fontWeight: 'bold',
      [theme.breakpoints.down(1100)]: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
      },
    },
    h5: {
      fontFamily: rubik.style.fontFamily,
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: '1rem',
      marginBottom: '1rem',
      fontWeight: 'bold',
      [theme.breakpoints.down(1100)]: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
      },
    },
    body1: {
      fontFamily: rubik.style.fontFamily,
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: "1.1rem"
    },
    body2: {
      fontFamily: rubik.style.fontFamily,
      color: "rgba(255, 255, 255, 0.87)",
      fontSize: "2rem"
    }
  },
  customPalette: {
    lightGrey: '#36383c',
    lightGreen: '#00c896',
    darkGrey: '#36383c59'
  }
})

export default theme

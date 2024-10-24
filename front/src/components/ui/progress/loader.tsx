/* HTML: <div class="loader"></div> */

import { makeStyles } from '@material-ui/core';

/* HTML: <div class="loader"></div> */
const useStyles = makeStyles(() => ({
  loader: {
    width: '50px',
    padding: '8px',
    aspectRatio: '1', // Utilisation de 'aspectRatio' au lieu de 'aspect-ratio'
    borderRadius: '50%',
    background: '#2b3e59',
    '--_m': 'conic-gradient(#0000 10%, #000), linear-gradient(#000 0 0) content-box',
    WebkitMask: 'var(--_m)', // Utilisation de la notation camelCase
    mask: 'var(--_m)',
    WebkitMaskComposite: 'source-out',
    maskComposite: 'subtract',
    animation: '$l3 1s infinite linear', // Référence à l'animation
  },
  '@keyframes l3': {
    to: {
      transform: 'rotate(1turn)',
    },
  },
}));
function Loader(): JSX.Element {
  const classes = useStyles();
  return <div className={classes.loader}></div>;
}
export default Loader;

import { Logo } from '@types';
import { ReactElement } from 'react';
import Image from 'next/image';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  hexagonalIcon: {
    width: '80px',
    height: '80px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    aspectRatio: '1.1547', // cos(30deg) approximé à l'équivalent de 1 / sqrt(3)

    [theme.breakpoints.down(1100)]: {
      // Media query pour les écrans <= 1100px
      width: '55px',
      height: '55px',
    },

    '& svg': {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },

    '& img': {
      width: '55%',
      height: '55%',
      objectFit: 'cover',
      zIndex: 1,
    },
    '&:hover $rHex ': {
      opacity: 0.2,
    },
  },
  rHex: {
    overflow: 'hidden',
    display: 'inline-block',
    position: 'absolute',
    margin: '4em 0',
    width: '100%',
    height: '100%',
    opacity: 0,
    transform: 'rotate(-30deg) skewX(30deg)',
    borderRadius: '15px',
    transition: 'opacity 0.5s ease',
  },
  rHexInner: {
    transform: 'skewX(-30deg) rotate(60deg) skewX(30deg)',
    transition: 'opacity 0.75s',
    cursor: 'default',

    '&, &:before': {
      display: 'block',
      overflow: 'hidden',
      width: 'inherit',
      height: 'inherit',
      borderRadius: 'inherit',
      cursor: 'default',
    },

    '&:before': {
      content: '""',
      transform: 'skewX(-30deg) rotate(60deg) skewX(30deg)',
      background: 'var(--backgroundColor)',
    },
  },
}));
interface HexagonalIconType {
  logo: Logo;
  disableLink?: boolean;
}
function HexagonalIcon({ logo, disableLink }: HexagonalIconType): ReactElement {
  const classes = useStyles();
  console.log('test', logo.photo);
  return (
    <a
      href={logo.link && !disableLink ? logo.link : undefined}
      target="_blank"
      className={classes.hexagonalIcon}
    >
      <div
        className={classes.rHex}
        style={{ '--backgroundColor': logo.color } as React.CSSProperties}
      >
        <div className={classes.rHexInner}></div>
      </div>
      <Image src={logo.photo} alt={logo.alt || ''} width={75} height={75} />
    </a>
  );
}
export default HexagonalIcon;

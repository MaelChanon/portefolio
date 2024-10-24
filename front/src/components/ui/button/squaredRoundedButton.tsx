import { makeStyles } from '@material-ui/core';
import { ReactElement } from 'react';

type SquaredRoundedButtonType = {
  children: ReactElement;
};
const useStyles = makeStyles((theme) => ({
  button: {
    width: '50px',
    height: '50px',
    borderRadius: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(145deg, #121010, #242424)',
    boxShadow: '2px 2px 4px #121010, -2px -2px 4px #242424',
    '& a': {
      lineHeight: 0,
      width: '100%',
      height: '100%',
    },
    '&:active': {
      boxShadow: 'inset 2px 2px 4px #121010, -2px -2px 4px #242424',
    },
  },
}));

function SquaredRoundedButton({ children }: SquaredRoundedButtonType) {
  const classes = useStyles();
  return <button className={classes.button}>{children}</button>;
}

export default SquaredRoundedButton;

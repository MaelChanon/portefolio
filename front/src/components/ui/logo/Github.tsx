import { ReactElement } from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover $github': {
      // Targets github class on hover
      stroke: 'var(--hoverColor)', // Use the CSS variable for hover color
    },
  },
  github: {
    width: '30px',
    height: '30px',
    fill: 'none',
    strokeWidth: '1.5px',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    stroke: '#ffffff',
    opacity: 1,
  },
}));
type GithubType = {
  hover_color: string;
};
function Github({ hover_color }: GithubType): ReactElement {
  const classes = useStyles();
  return (
    <div
      className={classes.logo}
      style={{ '--hoverColor': hover_color || '#ffffff' } as React.CSSProperties}
    >
      <svg className={classes.github} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31">
        <g>
          <path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"></path>
        </g>
      </svg>
    </div>
  );
}

export default Github;

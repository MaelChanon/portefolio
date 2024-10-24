import Github from '@compenents/ui/logo/Github';
import LinkedIn from '@compenents/ui/logo/LinkedIn';
import { makeStyles, Typography } from '@material-ui/core';
import Image from 'next/image';
import next from 'next';
import SquaredRoundedButton from '@components/ui/button/squaredRoundedButton';
import { Owner } from '@lib/types';
const useStyles = makeStyles((theme) => ({
  '@keyframes blink': {
    '0%': {
      borderRightColor: 'rgba(255, 255, 255, 0.75)',
    },
    '100%': {
      borderRightColor: 'transparent',
    },
  },
  '@keyframes slideinLeft': {
    from: {
      transform: 'translateX(-50px)',
      opacity: 0,
    },
    to: {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  '@keyframes slideinTop': {
    from: {
      transform: 'translateY(-50px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  '@keyframes slideinBottom': {
    from: {
      transform: 'translateY(50px)',
      opacity: 0,
    },
    to: {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
  presentation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      gap: '2rem',
    },
  },
  contact: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
    opacity: 0,
    paddingTop: '5px',
    animation: '$slideinBottom 1.5s forwards',
    animationDelay: '0.6s',

    '& a': {
      lineHeight: 0,
      width: '100%',
      height: '100%',
    },
  },
  title: {
    fontSize: '2.5rem',
    '& > :nth-child(2)': {
      animationDelay: '0.2s !important',
    },
    '& > :nth-child(3)': {
      animationDelay: '0.4s !important',
    },
    '& p': {
      opacity: 0,
      animation: '$slideinLeft 1.5s forwards',
    },
    [theme.breakpoints.down(1100)]: {
      '& p,span': {
        fontSize: '2rem !important',
      },
    },
    [theme.breakpoints.down('sm')]: {
      '& p,span': {
        fontSize: '1.4rem !important',
      },
    },
    [theme.breakpoints.down(300)]: {
      '& p,span': {
        fontSize: '1rem !important',
      },
    },
  },
  profile: {
    width: '18rem',
    height: '18rem',
    borderRadius: '50%',
    opacity: 0,
    animation: '$slideinTop 1.5s forwards',
    animationDelay: '0.5s',
    [theme.breakpoints.down('sm')]: {
      width: '10rem',
      height: '10rem',
    },
    [theme.breakpoints.down(300)]: {
      width: '10rem',
      height: '10rem',
    },
  },
  highlight: {
    position: 'relative',
    overflow: 'hidden',
    borderRight: '3px solid',
    width: '0px',
    animation: '$blink 0.6s steps(10) infinite',
    '&::before': {
      backgroundColor: theme.palette.primary.main, // Remplacer par $lightPurple
      content: "''",
      position: 'absolute',
      width: 'calc(100% + 4px)',
      height: '60%',
      left: '-2px',
      bottom: 0,
      zIndex: -1,
      transform: 'rotate(-2deg)',
    },
    '& span': {
      whiteSpace: 'nowrap',
    },
  },
}));
interface PresentationType {
  owner: Owner;
}
function Presentation({ owner }: PresentationType) {
  const classes = useStyles();
  return (
    <>
      <header className={classes.presentation}>
        <div>
          <div className={classes.title}>
            <Typography variant="body2" className={classes['@keyframes slideinLeft']}>
              Bonjour 👋,
            </Typography>
            <Typography variant="body2" className={classes['@keyframes slideinLeft']}>
              Je m'appelle{' '}
              <Typography variant="body2" component="span" className={classes.highlight}>
                <Typography variant="body2" component="span">
                  {`${owner.firstname} ${owner.lastName}`}
                </Typography>
              </Typography>{' '}
            </Typography>

            <Typography variant="body2" className={classes['@keyframes slideinLeft']}>
              Je suis {owner.role}
            </Typography>
          </div>
          <div className={classes.contact}>
            {owner.linkedinLink && (
              <SquaredRoundedButton>
                <a href={owner.linkedinLink} target="_blank">
                  <LinkedIn hover_color="#0e76a8" />
                </a>
              </SquaredRoundedButton>
            )}

            <SquaredRoundedButton>
              <a href={owner.githubLink} target="_blank">
                <Github hover_color="#b663e9" />
              </a>
            </SquaredRoundedButton>
          </div>
        </div>
        <Image className={classes.profile} width={190} height={190} src={owner.photo} alt="" />
      </header>
    </>
  );
}

export default Presentation;

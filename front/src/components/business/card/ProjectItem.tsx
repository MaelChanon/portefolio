import HexagonalIcon from '@compenents/ui/icon/HexagonalIcon';
import { ReactElement, useEffect, useRef } from 'react';
import Github from '@compenents/ui/logo/Github';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import theme from '@lib/theme';
import { Project } from '@lib/types';
const useStyles = makeStyles((theme) => ({
  projectItem: {
    maxWidth: '90vw',
    width: '100%',
    height: 'fit-content',
    display: 'flex',
    borderRadius: '5px',
    backgroundColor: theme.customPalette.darkGrey, // $lightGrey
    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(19.4px)',
    border: '1px solid rgba(54, 56, 60, 0.91)',
    // opacity: 0,
    transition: 'transform 1s, opacity 1s',

    '&.slideLeft': {
      transform: 'translateX(-50px)',
    },
    '&.slideRight': {
      transform: 'translateX(50px)',
    },
    '&.projetAnimate': {
      opacity: '1',
      transform: 'translateX(0)',
    },

    [theme.breakpoints.down('md')]: {
      // media query for `md`
      flexDirection: 'column !important',
    },
  },

  projectInfo: {
    fontSize: '1.2rem',
    width: '30%',
    height: 'auto',
    // margin: '0 10px 5px 10px !important',
    border: '10px solid transparent',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    [theme.breakpoints.down(1100)]: {
      // equivalent of rwd(1100px)
      fontSize: '1rem',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },

    '& .projectTechnologies': {
      display: 'flex',
    },
  },
  projectLink: {
    width: 'fit-content',
  },

  projectTitle: {
    color: theme.customPalette.lightGreen, // $lightGreen
    textAlign: 'center',
  },

  projectTechnologie: {
    display: 'flex',
  },
  projectVideo: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    '& video': {
      width: '100%',
      height: 'auto',
      borderRadius: '5px',
    },

    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  githubContainer: {
    width: '100%',
    display: 'flex',
  },
  githubLeft: {
    flexFlow: 'row',
    [theme.breakpoints.down('sm')]: {
      flexFlow: 'row-reverse',
    },
  },
  githubRight: {
    flexFlow: 'row-reverse',
  },
  // Media queries for smaller screens (<=768px)
  [theme.breakpoints.down('sm')]: {
    projectItem: {
      flexDirection: 'column !important',
    },
    projectInfo: {
      width: '100%',
      margin: '0',
    },
    projectVideo: {
      width: '100%',
    },
  },
}));

interface ProjectType {
  project: Project;
  slide_in_left: boolean;
}
function ProjectItem({ project, slide_in_left }: ProjectType): ReactElement {
  const classes = useStyles();
  const className = slide_in_left ? 'slideLeft' : 'slideRight';
  const boxRef = useRef(null);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '10px',
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('projetAnimate');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (boxRef.current) {
      observer.observe(boxRef.current);
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current);
      }
    };
  }, []);
  return (
    <div
      className={`${classes.projectItem} ${className}`}
      ref={boxRef}
      style={{
        flexDirection: slide_in_left ? 'row' : 'row-reverse',
      }}
    >
      <div className={classes.projectInfo}>
        <div>
          <Typography variant="h3" component="h3" className={classes.projectTitle}>
            {project.name}
          </Typography>
          <div>
            <Typography variant="body1">{project.description}</Typography>
          </div>
          {project.logos && (
            <div className={classes.projectTechnologie}>
              {project.logos.map((icon) => (
                <HexagonalIcon key={icon.link} logo={icon} />
              ))}
            </div>
          )}
        </div>
        <div
          className={`${classes.githubContainer} ${
            slide_in_left ? classes.githubLeft : classes.githubRight
          } `}
        >
          <a href={project.githubLink} target="_blank" className={classes.projectLink}>
            <Github hover_color={theme.customPalette.lightGreen} />
          </a>
        </div>
      </div>
      <div className={classes.projectVideo}>
        <video
          controls={false} // Disable controls
          autoPlay // Play automatically
          loop // Loop the video
          muted // Mute the video
          playsInline // Prevent fullscreen on mobile devices
          preload="metadata"
        >
          <source src={project.videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
export default ProjectItem;

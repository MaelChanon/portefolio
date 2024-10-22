import ProjectItem from '@compenents/business/card/ProjectItem';
import projects from '@lib/data';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  projectWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '3rem',
    marginBottom: '5rem',
  },
}));

function ProjectCarousel() {
  const classes = useStyles();
  return (
    <div className={classes.projectWrapper}>
      {projects.map((project) => (
        <ProjectItem {...project} key={project.project_title} />
      ))}
    </div>
  );
}
export default ProjectCarousel;

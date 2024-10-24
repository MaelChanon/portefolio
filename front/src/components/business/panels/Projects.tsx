import ProjectItem from '@compenents/business/card/ProjectItem';
import projects from '@lib/data';
import { Project } from '@lib/types';

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
interface projectType {
  projects: Project[];
}
function ProjectCarousel({ projects }: projectType) {
  const classes = useStyles();
  let slide_in_left = false;
  return (
    <div className={classes.projectWrapper}>
      {projects.map((project) => {
        slide_in_left = !slide_in_left;
        return <ProjectItem project={project} slide_in_left={slide_in_left} key={project.name} />;
      })}
    </div>
  );
}
export default ProjectCarousel;

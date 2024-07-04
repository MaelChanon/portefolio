import '../css/components/ProjectItem.css'
import { Icon } from '../type'
import HexagonalIcon from './HexagonalIcon'
type ProjectItemProps = {
  video_path: string
  project_title: string
  project_description: string
  technologies?: Array<Icon>
}
const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  return (
    <div className="project-item">
      <div className="project-text">
        <h3 className="project-title">{props.project_title}</h3>
        <div className="project-description">{props.project_description}</div>
        {props.technologies && (
          <div className="project-technologies">
            {props.technologies.map((icon) => (
              <HexagonalIcon icon={icon} />
            ))}
          </div>
        )}
      </div>
      <div className="project-video">
        <video autoPlay loop muted preload="metadata" controls>
          <source src={props.video_path} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  )
}
export default ProjectItem

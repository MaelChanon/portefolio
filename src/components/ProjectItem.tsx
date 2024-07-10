import '../css/components/ProjectItem.css'
import { Icon } from '../type'
import HexagonalIcon from './HexagonalIcon'
type ProjectItemProps = {
  video_path: string
  project_title: string
  project_description: string
  project_link: string
  technologies?: Array<Icon>
  left_description: boolean
}
const ProjectItem: React.FC<ProjectItemProps> = (props) => {
  return (
    <div
      className="project-item"
      style={{
        flexDirection: props.left_description ? 'row' : 'row-reverse',
      }}
    >
      <div className="project-info">
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

        <a href={props.project_link} target="_blank" className="project-link">
          <svg className="github" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19.05 20.31">
            <g>
              <path d="M7.26 16.34c-4.11 1.23-4.11-2.06-5.76-2.47M13 18.81V15.62a2.78 2.78 0 0 0-.77-2.15c2.59-.28 5.3-1.26 5.3-5.76a4.46 4.46 0 0 0-1.23-3.08 4.18 4.18 0 0 0-.08-3.11s-1-.29-3.22 1.22a11 11 0 0 0-5.76 0C5 1.23 4 1.52 4 1.52A4.18 4.18 0 0 0 4 4.63 4.48 4.48 0 0 0 2.73 7.74c0 4.46 2.72 5.44 5.31 5.76a2.8 2.8 0 0 0-.78 2.12v3.19"></path>
            </g>
          </svg>
        </a>
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

import '../css/components/ProjectItem.scss'
import { ProjectItem as ProjectItemProp } from '../type'
import HexagonalIcon from './HexagonalIcon'
import { useEffect, useRef } from 'react'
import Github from './logo/Github'
const ProjectItem: React.FC<ProjectItemProp> = (props) => {
  const className = props.slide_in_left ? 'slide-left' : 'slide-right'
  const boxRef = useRef(null)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('projet-animate')
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    if (boxRef.current) {
      observer.observe(boxRef.current)
    }

    return () => {
      if (boxRef.current) {
        observer.unobserve(boxRef.current)
      }
    }
  }, [])
  return (
    <div
      className={`project-item ${className}`}
      ref={boxRef}
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
                <HexagonalIcon key={icon.path} icon={icon} />
              ))}
            </div>
          )}
        </div>

        <a href={props.project_link} target="_blank" className="project-link">
          <Github />
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

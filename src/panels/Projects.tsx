import '../css/Projects.scss'
import ProjectItem from '../components/ProjectItem'
import projects from '../data/project.json'
function ProjectCarousel() {
  return (
    <div className="project-wrapper">
      {projects.map((project) => (
        <ProjectItem {...project} />
      ))}
    </div>
  )
}
export default ProjectCarousel

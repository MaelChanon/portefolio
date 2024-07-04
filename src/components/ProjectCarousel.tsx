import '../css/components/ProjectCarousel.css'
import ProjectItem from './ProjectItem'
function ProjectCarousel() {
  return (
    <div className="project-wrapper">
      <ProjectItem
        video_path="/particles-js-clone.mp4"
        project_title="Particles JS Clone"
        project_description="Je me suis amusé à essayer de reproduire de l'effect de particules JS. Ce n'était pas un long projet mais je me suis amusé"
        technologies={[
          {
            path: '/HTML.png',
            alt: 'HTML',
            color: '#f0bd7c',
          },
        ]}
      />
    </div>
  )
}
export default ProjectCarousel

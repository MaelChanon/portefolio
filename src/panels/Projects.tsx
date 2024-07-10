import '../css/components/Projects.css'
import ProjectItem from '../components/ProjectItem'
function ProjectCarousel() {
  return (
    <div className="project-wrapper">
      <ProjectItem
        video_path="/particles-js-clone.mp4"
        project_title="Particles JS Clone"
        project_link="https://github.com/MaelChanon/particle-js-clone"
        project_description="Je me suis amusé à essayer de reproduire de l'effect de particules JS. Ce n'était pas un long projet mais je me suis amusé"
        technologies={[
          {
            path: '/HTML.png',
            alt: 'HTML',
            color: '#db7b37',
          },
          {
            path: '/JS.png',
            alt: 'JS',
            color: '#e0e031',
          },
        ]}
        left_description={true}
      />
      <ProjectItem
        video_path="/particles-js-clone.mp4"
        project_title="Particles JS Clone"
        project_link="https://github.com/MaelChanon/particle-js-clone"
        project_description="Je me suis amusé à essayer de reproduire de l'effect de particules JS. Ce n'était pas un long projet mais je me suis amusé"
        technologies={[
          {
            path: '/HTML.png',
            alt: 'HTML',
            color: '#db7b37',
          },
          {
            path: '/JS.png',
            alt: 'JS',
            color: '#e0e031',
          },
        ]}
        left_description={false}
      />
    </div>
  )
}
export default ProjectCarousel

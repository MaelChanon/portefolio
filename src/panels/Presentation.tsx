import Github from '../components/logo/Github'
import LinkedIn from '../components/logo/LinkedIn'
import './../css/Presentation.scss'
function App() {
  return (
    <>
      <header className="presentation">
        <div>
          <div className="title">
            <p className="slide-in-left">Bonjour 👋,</p>
            <p className="slide-in-left">
              Je m'appelle{' '}
              <span className="highlight">
                <span>Maël Chanon</span>
              </span>{' '}
            </p>
            <p className="slide-in-left">Je suis un Ingenieur logiciel </p>
          </div>
          <div className="contact">
            <button>
              <a className="linkedin" href="https://www.linkedin.com/in/chanon-mael/" target="_blank">
                <LinkedIn hover_color="#0e76a8" />
              </a>
            </button>
            <button>
              <a className="github-logo" href="https://github.com/MaelChanon" target="_blank">
                <Github hover_color="#b663e9" />
              </a>
            </button>
          </div>
        </div>
        <img className="profile" src="/profile.jpeg" alt="" />
      </header>
    </>
  )
}

export default App

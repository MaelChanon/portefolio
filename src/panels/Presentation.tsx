import './../css/Presentation.css'
function App() {
  return (
    <>
      <div className="panel presentation">
        <div>
          <p className="title">
            <p className="slide-in-left">Bonjour 👋,</p>
            <p className="slide-in-left">
              Je m'appelle{' '}
              <span className="highlight">
                <span>Maël Chanon</span>
              </span>{' '}
            </p>
            <p className="slide-in-left">Je suis un Ingenieur logiciel </p>
          </p>
        </div>
        <img className="profile" src="/profile.jpeg" alt="" />
      </div>
    </>
  )
}

export default App

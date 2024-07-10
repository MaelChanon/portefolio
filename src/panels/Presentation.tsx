import './../css/Presentation.css'
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
        </div>
        <img className="profile" src="/profile.jpeg" alt="" />
      </header>
    </>
  )
}

export default App

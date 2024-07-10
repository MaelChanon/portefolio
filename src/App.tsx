import Presentation from './panels/Presentation'
// import { useEffect } from 'react'
// import ScrollController from './event/smoothScroll'
import Projects from './panels/Projects'
import './css/App.css'
function App() {
  // let scrollController: ScrollController
  // useEffect(() => {
  //   window.scroll(0, 0)
  //   scrollController = new ScrollController(3)
  //   return () => {
  //     scrollController.destroy()
  //   }
  // }, [])
  return (
    <div className="app">
      <Presentation />

      <Projects />
      <div className="panel" id="panel-3">
        TEST3
      </div>
    </div>
  )
}

export default App

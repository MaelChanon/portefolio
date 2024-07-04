import Presentation from './panels/Presentation'
import { useEffect } from 'react'
import ScrollController from './event/smoothScroll'
function App() {
  let scrollController: ScrollController
  useEffect(() => {
    window.scroll(0, 0)
    scrollController = new ScrollController(3)
    return () => {
      scrollController.destroy()
    }
  }, [])
  return (
    <>
      <Presentation />
      <div className="panel" id="panel-2">
        TEST2
      </div>
      <div className="panel" id="panel-3">
        TEST3
      </div>
    </>
  )
}

export default App

// class ScrollController {
//   private currentPanel: number
//   private numPanels: number
//   private pageHeight: number
//   private debounceTime: number
//   private isScrolling: boolean

//   constructor(numPanels: number, debounceTime = 1000) {
//     this.currentPanel = 0
//     this.numPanels = numPanels
//     this.pageHeight = window.innerHeight
//     this.debounceTime = debounceTime
//     this.isScrolling = false

//     this.initScroll()
//   }

//   private handleScroll = (event: WheelEvent): void => {
//     event.preventDefault()

//     if (this.isScrolling) return

//     this.isScrolling = true
//     setTimeout(() => {
//       this.isScrolling = false
//     }, this.debounceTime)

//     if (event.deltaY < 0) {
//       this.currentPanel = this.currentPanel === 0 ? this.currentPanel : this.currentPanel - 1
//     } else if (event.deltaY > 0) {
//       this.currentPanel = this.currentPanel === this.numPanels - 1 ? this.currentPanel : this.currentPanel + 1
//     }

//     window.scrollTo(0, this.pageHeight * this.currentPanel)
//   }

//   private initScroll = (): void => {
//     window.scrollTo(0, 0)
//     window.addEventListener('wheel', this.handleScroll, { passive: false })

//     window.addEventListener('resize', this.updatePageHeight)
//   }

//   private updatePageHeight = (): void => {
//     this.pageHeight = window.innerHeight
//   }

//   public destroy = (): void => {
//     window.removeEventListener('wheel', this.handleScroll)
//     window.removeEventListener('resize', this.updatePageHeight)
//   }
// }

// export default ScrollController

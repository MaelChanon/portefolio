import { Icon } from '../type'
import '../css/components/HexagonalIcon.scss'
type HexagonalIconProps = {
  icon: Icon
}
const HexagonalIcon: React.FC<HexagonalIconProps> = (props) => {
  return (
    <a href={props.icon.link || ''} target="_blank" className="hexagonal-icon">
      <div className="r-hex" style={{ '--backgroundColor': props.icon.color } as React.CSSProperties}>
        <div className="r-hex-inner"></div>
      </div>
      <img src={props.icon.path} alt={props.icon.alt} />
    </a>
  )
}
export default HexagonalIcon

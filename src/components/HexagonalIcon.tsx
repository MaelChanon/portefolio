import { Icon } from '../type'
import '../css/components/HexagonalIcon.css'
type HexagonalIconProps = {
  icon: Icon
}
const HexagonalIcon: React.FC<HexagonalIconProps> = (props) => {
  return (
    <div className="hexagonal-icon">
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 12.7 15.875" x="0px" y="0px">
        <g>
          <path
            d="M 11.342395,5.8412395 9.2641312,2.3081905 a 0.92520372,0.92520372 0 0 0 -0.797465,-0.456107 h -4.233333 a 0.92520278,0.92520278 0 0 0 -0.797464,0.456106 l -2.078265,3.53305 a 1.003434,1.003434 0 0 0 1e-6,1.017522 l 2.078264,3.5330495 a 0.92520288,0.92520288 0 0 0 0.797464,0.456106 h 4.233333 A 0.92520382,0.92520382 0 0 0 9.2641312,10.39181 L 11.342395,6.8587615 a 1.0034339,1.0034339 0 0 0 0,-1.017522 z"
            fill="#000000"
            stroke="none"
          />
        </g>
      </svg>
      <img src={props.icon.path} alt={props.icon.alt} />
    </div>
  )
}
export default HexagonalIcon

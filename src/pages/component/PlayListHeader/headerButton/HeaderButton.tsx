import { FunctionComponent, ReactElement } from 'react'
import style from './HeaderButton.module.css'
interface HeaderButtonProps {
  icon: ReactElement
  onClick?: () => void
  content?: string
  direction?: 'left' | 'right' | 'both' | 'none'
  bg?: string
  bgHover?: string
  border?: 'left' | 'right' | 'both' | 'none'
}

const HeaderButton: FunctionComponent<HeaderButtonProps> = ({
  icon,
  content,
  direction = 'both',
  bg,
  bgHover,
  border
}) => {
  return (
    <div
      style={
        direction === 'right'
          ? {
              background: bg,
              color: '#fff',
              border: 'none',
              paddingLeft: '5px',
              ...(border === 'left'
                ? { borderLeft: '1px solid #ed5353' }
                : border === 'right'
                ? { borderRight: '1px solid #ed5353' }
                : {})
            }
          : direction === 'left'
          ? { background: bg, color: '#fff', border: 'none', paddingRight: '5px' }
          : {}
      }
      className={`${style.headerButton} ${style['border-' + direction]}`}
    >
      <div className={style.icon}>{icon}</div>
      {content && <div className={style.content}>{content}</div>}
    </div>
  )
}

export default HeaderButton

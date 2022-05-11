import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import { FunctionComponent } from 'react'
import style from './Swiper.module.css'
interface SwiperProps {
  children: React.ReactElement<any, any>[] | React.ReactElement<any, any>
}

const Swiper: FunctionComponent<SwiperProps> = (props) => {
  const { children: child } = props
  const [curIndex, setCurIndex] = useState(5)
  const timerRef = useRef<NodeJS.Timer | null>(null)
  let children = (Array.isArray(child) ? child : [child]) as React.ReactElement<any, any>[]
  useEffect(() => {
    if (children.length) {
      // timerRef.current = setInterval(() => {
      //   handleChangeIndex(1)
      // }, 3000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [curIndex, children])
  const swiperWidth = document.getElementById('swiper')?.clientWidth || 0
  children = children?.map((o, i) => {
    return React.cloneElement(o, {
      index: i,
      curIndex,
      style: {
        ...(i !== (curIndex + children.length + 1) % children.length
          ? {
              transform: `translate3d(-50%,0, -10px)`,
              zIndex: 1,
              left: '50%'
            }
          : {}),
        ...(i === (curIndex + children.length - 1) % children.length
          ? {
              left: 0,
              transform: 'rotate3d(0,1,0,2deg)',
              transformOrigin: 'left center',
              zIndex: 2
            }
          : {}),
        ...(i === (curIndex + children.length + 1) % children.length
          ? {
              left: '460px',
              zIndex: 2,
              transform: ' rotate3d(0,1,0,-2deg)',
              transformOrigin: 'right center'
            }
          : {}),
        ...(i === curIndex
          ? { transform: `translate3d(-50%, 0, 5px)`, zIndex: 3, left: '50%' }
          : {})
      }
    })
  })
  const handleChangeIndex = (index: number) => {
    setCurIndex((curIndex + index) % children.length)
  }
  return (
    <div id='swiper' className={style.swiperWrap}>
      <div className={style.swiper}>
        <div className={style.btn}>
          <div onClick={() => handleChangeIndex(-1)} className={style.left}>
            <LeftOutlined />
          </div>
          <div onClick={() => handleChangeIndex(1)} className={style.right}>
            <RightOutlined />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Swiper

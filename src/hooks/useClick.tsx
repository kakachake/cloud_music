import { useRef } from 'react'

export const useClick = (
  {
    clickFn,
    doubleFn
  }: {
    clickFn: (...args: any[]) => void
    doubleFn: (...args: any[]) => void
  },
  delay: number
) => {
  const timer = useRef<any>()
  function _click(this: any, ...args: any[]) {
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      clickFn.call(this, ...args)
    }, 200)
  }
  function _doubleClick(this: any, ...args: any[]) {
    clearTimeout(timer.current)
    doubleFn.call(this, ...args)
  }
  return [_click, _doubleClick]
}

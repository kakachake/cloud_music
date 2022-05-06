import dayjs from 'dayjs'
export function parseSecondToTime(second: number) {
  second = Math.floor(second)
  const hour = Math.floor(second / 3600)
  const minute = Math.floor((second - hour * 3600) / 60)
  const seconds = second - hour * 3600 - minute * 60

  return hour > 0 ? `${pad(hour)}:${pad(minute)}:${pad(seconds)}` : `${pad(minute)}:${pad(seconds)}`
}

//不够两位数的补0
export function pad(num: number) {
  return num < 10 ? '0' + num : num
}

//数字转换成万，亿
export function formatNumber(num: number) {
  if (!num) {
    return '0'
  }
  if (num < 10000) {
    return num
  } else if (num < 100000000) {
    return (num / 10000).toFixed(1) + '万'
  } else {
    return (num / 100000000).toFixed(2) + '亿'
  }
}

//dayjs 时间戳转换成时间
export function formatTime(time: number | string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(time).format(format)
}

export function onDoubleClick() {
  let isClick = false
  let clickNum = 0
  return function ({
    singleClick,
    doubleClick
  }: {
    singleClick: () => void
    doubleClick: () => void
  }) {
    // 如果没有绑定双击函数，直接执行单击程序
    if (!doubleClick) {
      return singleClick && singleClick()
    }

    clickNum++
    // 毫秒内点击过后阻止执行定时器
    if (isClick) {
      return
    }
    isClick = true

    setTimeout(() => {
      // 超过1次都属于双击
      if (clickNum > 1) {
        doubleClick && doubleClick()
      } else {
        singleClick && singleClick()
      }
      clickNum = 0
      isClick = false
    }, 300)
  }
}

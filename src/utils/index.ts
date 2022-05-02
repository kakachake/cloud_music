export function parseSecondToTIme(second: number) {
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

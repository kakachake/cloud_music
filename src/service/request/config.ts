// const BASE_URL = 'http://localhost:3000/api/v1'
//通过环境变量来切换环境
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://netease-cloud-music-api-rho-liart.vercel.app/'
    : 'https://netease-cloud-music-api-rho-liart.vercel.app/'

const TIME_OUT = 5000

export { BASE_URL, TIME_OUT }

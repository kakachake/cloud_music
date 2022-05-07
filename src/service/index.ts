import AxRequest from './request/index'
import { BASE_URL } from './request/config'
import store from '../redux/store'
import Toast from '../components/Toast'

const axRequest = new AxRequest({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptor: (config) => {
      console.log(config)

      const cookie = localStorage.getItem('cookie')
      config.params = config.params || {}
      if (cookie) {
        config.params.cookie = cookie
      }
      config.params.timerstamp = +Date.now()
      return config
    },
    responseInterceptor: (res) => {
      //可以只把我们需要的数据返回
      return res.data
    },
    responseErrorInterceptor: (error) => {
      console.log(error)
      Toast.error(error.message)
    }
  }
})

export default axRequest

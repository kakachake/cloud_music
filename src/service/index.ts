import AxRequest from './request/index'
import { BASE_URL } from './request/config'
import store from '../redux/store'

const axRequest = new AxRequest({
  baseURL: BASE_URL,
  timeout: 10000
})

export default axRequest

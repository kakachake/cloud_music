import axios, { AxiosInstance, AxiosResponse } from 'axios'
import qs from 'qs'
import { isGeneratorFunction } from 'util/types'
import { AxRequestInterceptor, AxRequestConfig } from './types'

class AxRequest {
  instance: AxiosInstance
  pendingRequests: Map<
    string,
    {
      controller: AbortController
      url: string
    }
  > = new Map()
  interceptors?: AxRequestInterceptor
  loading?: any

  constructor(config: AxRequestConfig) {
    this.instance = axios.create(config) //创建axios实例
    this.interceptors = config.interceptors

    //给实例设置拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestErrorInterceptor
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseErrorInterceptor
    )
    this.instance.interceptors.response.use((response: AxiosResponse) => {
      return response
    })
  }

  request<T = any>(config: AxRequestConfig<T>): Promise<T | any> {
    //给单个请求设置拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise((resolve, reject) => {
      const url = config.url
      if (url) {
        const controller = new AbortController()
        config.signal = controller.signal
        const requestKey = generateReqKey(config)
        this.pendingRequests.set(requestKey, { controller, url })
      }
      this.instance
        .request<T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
        .finally(() => {
          this.removePendingRequest(config)
        })
    })
  }

  get<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'get'
    })
  }

  post<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'post'
    })
  }

  put<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'put'
    })
  }

  delete<T = any>(config: AxRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'delete'
    })
  }

  removePendingRequest(config: AxRequestConfig) {
    const requestKey = generateReqKey(config)

    if (this.pendingRequests.has(requestKey)) {
      const { controller } = this.pendingRequests.get(requestKey) || {}
      controller?.abort()
      this.pendingRequests.delete(requestKey)
    }
  }

  removePendingByUrl(url: string) {
    this.pendingRequests.forEach((value, key) => {
      if (value.url === url) {
        const { controller } = value || {}
        controller?.abort()
        this.pendingRequests.delete(key)
      }
    })
  }
}

function generateReqKey(config: AxRequestConfig) {
  const { method, url, params, data } = config
  const parsedParams = { ...params }
  delete parsedParams.timerstamp
  delete parsedParams.cookie
  return [method, url, qs.stringify(parsedParams), qs.stringify(data)].join('&')
}

export default AxRequest

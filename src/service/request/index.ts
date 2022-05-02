import axios, { AxiosInstance, AxiosResponse } from 'axios'

import { AxRequestInterceptor, AxRequestConfig } from './types'

class AxRequest {
  instance: AxiosInstance
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
  }

  request<T = any>(config: AxRequestConfig<T>): Promise<T | any> {
    //给单个请求设置拦截器
    if (config.interceptors?.requestInterceptor) {
      config = config.interceptors.requestInterceptor(config)
    }
    return new Promise((resolve, reject) => {
      this.instance
        .request<T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          resolve(res)
        })
        .catch((error) => {
          console.dir(error)

          reject(error)
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
}

export default AxRequest

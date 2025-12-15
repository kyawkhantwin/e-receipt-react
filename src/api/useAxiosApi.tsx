import { useCallback, useState } from 'react'

import axiosClient from '@/config/axiosConfig.ts'

type HttpMethod = 'get' | 'post' | 'put' | 'delete'

interface AxiosTriggerParams {
  endPoint: string
  method: HttpMethod
  body?: any
  params?: object
  config?: object
}

const useAxiosApi = () => {
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorData, setErrorData] = useState<any>(null)
  // const { showErrorToasts } = useErrorToasts()

  const trigger = useCallback(
    async ({ endPoint, method, body, params = {}, config = {} }: AxiosTriggerParams) => {
      setIsLoading(true)
      setIsError(false)
      setIsSuccess(false)

      try {
        const response = await axiosClient({
          url: endPoint,
          method,
          params,
          data: body,
          ...config,
        })

        setData(response.data)
        setIsSuccess(true)

        return response.data.data
      } catch (error: any) {
        const responseErrorData = error.response?.data

        console.log(error)
        if (error.code === 'ERR_NETWORK') {
          setErrorData({ message: 'Network Error' })
        } else {
          setErrorData(responseErrorData)
        }
        setIsError(true)
        throw error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  return {
    data,
    isLoading,
    isError,
    isSuccess,
    trigger,
    errorData,
  }
}

export default useAxiosApi

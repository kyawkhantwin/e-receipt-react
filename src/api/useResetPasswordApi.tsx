import useAxiosApi from './useAxiosApi'

import { ApiConfig } from '@/config/apiConfig.ts'

export const useResetPasswordApi = () => {
  const { trigger, ...rest } = useAxiosApi()

  const resetPassword = (userId: string, password: string) => {
    return trigger({
      endPoint: ApiConfig.resetPassword,
      method: 'put',
      body: {
        userId,
        password,
      },
    })
  }

  return { resetPassword, ...rest }
}

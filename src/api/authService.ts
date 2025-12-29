import axiosClient from '@/config/axiosConfig'

export const refreshToken = async (refreshToken: string) => {
  try {
    const response = await axiosClient.post(`/auth/refresh-token`, {
      refreshToken,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

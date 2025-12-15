import { useState, useCallback } from 'react'

interface ApiOperationResult<T, P extends any[]> {
  data: T | null
  loading: boolean
  error: Error | null
  execute: (...args: P) => Promise<T | null>
}

const useApiOperation = <T, P extends any[]>(
  apiCall: (...args: P) => Promise<T>
): ApiOperationResult<T, P> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  const execute = useCallback(
    async (...args: P): Promise<T | null> => {
      setLoading(true)
      setError(null)
      try {
        const result = await apiCall(...args)

        setData(result)

        return result
      } catch (err: any) {
        setError(err)
        setData(null)
        throw err
      } finally {
        setLoading(false)
      }
    },
    [apiCall]
  )

  return { data, loading, error, execute }
}

export default useApiOperation

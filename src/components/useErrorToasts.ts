import { addToast } from '@heroui/toast'

type ErrorData = {
  message?: string
  errors?: { msg: string }[]
}

const useErrorToasts = () => {
  const showErrorToasts = (errorData: ErrorData | null) => {
    console.log('errorData', errorData)
    if (!errorData) return

    if (errorData.message) {
      addToast({
        title: errorData.message,
        color: 'danger',
      })
    } else if (errorData.errors && Array.isArray(errorData.errors)) {
      errorData.errors.forEach(error => {
        addToast({
          title: error.msg,
          color: 'danger',
        })
      })
    }
  }

  return { showErrorToasts }
}

export default useErrorToasts

import { addToast } from '@heroui/toast'

type ErrorData = {
  message?: string
  errors?: { msg: string }[]
}

const useErrorToasts = () => {
  const showErrorToasts = (errorData: ErrorData | null) => {
    if (!errorData) return

    //   if (errorData.errors && Array.isArray(errorData.errors)) {
    //     errorData.errors.forEach(error => {
    //       addToast({
    //         title: error.msg,
    //         color: 'danger',
    //       })
    //     })
    //   } else if (errorData.message) {
    addToast({
      title: 'error',
      color: 'danger',
    })
  }
  // }

  return { showErrorToasts }
}

export default useErrorToasts

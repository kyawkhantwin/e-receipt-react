import type { NavigateOptions } from 'react-router-dom'

import { useHref, useNavigate } from 'react-router-dom'
import { HeroUIProvider } from '@heroui/system'
import { ToastProvider } from '@heroui/toast'
import React from 'react'

declare module '@react-types/shared' {
  interface RouterConfig {
    routerOptions: NavigateOptions
  }
}

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate()

  return (
    <HeroUIProvider navigate={navigate} useHref={useHref}>
      <ToastProvider toastProps={{ timeout: 3000 }} />
      {children}
    </HeroUIProvider>
  )
}

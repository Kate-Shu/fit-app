'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      {children}
      <ToastProvider
        placement="top-right"
        maxVisibleToasts={3}
      />
    </HeroUIProvider>
  )
}
import type { ReactNode } from 'react'

interface ReviewLayout {
  children: ReactNode
}

export default function ReviewLayout({ children }: ReviewLayout) {
  return (
    <div>
      <div>{children}</div>
    </div>
  )
}

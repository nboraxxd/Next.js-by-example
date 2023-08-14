import type { ReactNode } from 'react'

interface ReviewLayout {
  children: ReactNode
}

export default function ReviewLayout({ children }: ReviewLayout) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ border: 'solid 1px red' }}>[reviews sidebar]</div>
      <div>{children}</div>
    </div>
  )
}

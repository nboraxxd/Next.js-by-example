import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ border: 'solid 1px blue' }}>[header]</header>
        <main>{children}</main>
        <footer style={{ border: 'solid 1px blue' }}>[footer]</footer>
      </body>
    </html>
  )
}

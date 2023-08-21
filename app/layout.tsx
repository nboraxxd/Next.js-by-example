import type { ReactNode } from 'react'
import NavBar from '@/components/NavBar'
import { orbitron } from '@/app/font'
import './globals.css'

interface LayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={orbitron.variable}>
      <body>
        <div className="flex flex-col min-h-screen px-4 py-2 bg-orange-50">
          <header>
            <NavBar />
          </header>

          <main className="grow py-3">{children}</main>

          <footer className="py-3 border-t border-t-3 text-center text-xs">
            Game data and images courtesy of{' '}
            <a href="https://rawg.io/" target="_blank" className="text-orange-800 transition hover:underline">
              RAWG
            </a>
          </footer>
        </div>
      </body>
    </html>
  )
}

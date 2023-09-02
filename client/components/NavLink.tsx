'use client'

import { type ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge'

interface NavLinkProps {
  children: ReactNode
  href: string
  className?: string
}

export default function NavLink({ children, href, className }: NavLinkProps) {
  const pathname = usePathname()

  return pathname === href ? (
    <span
      className={twMerge(
        'text-orange-800 font-semibold cursor-default',
        className,
        'hover:no-underline hover:text-orange-800'
      )}
    >
      {children}
    </span>
  ) : (
    <Link href={href} className={twMerge('text-orange-800 transition-all', className)}>
      {children}
    </Link>
  )
}

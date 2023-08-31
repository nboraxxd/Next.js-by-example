import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import type { ReactNode } from 'react'

interface PaginationBarProps {
  url: string
  page: number
  pageCount: number
}

interface PaginationLinkProps {
  children: ReactNode
  url: string
  page: number
  disabled: boolean
}

export default function PaginationBar({ url, page, pageCount }: PaginationBarProps) {
  return (
    <div className="flex items-center gap-2 my-3">
      <PaginationLink url={url} page={page - 1} disabled={Boolean(page === 1)}>
        <ChevronLeftIcon className="w-4 h-4" />
        <span className="sr-only">Previous Page</span>
      </PaginationLink>
      <span className="">
        Page {page} of {pageCount}
      </span>
      <PaginationLink url={url} page={page + 1} disabled={Boolean(page === pageCount)}>
        <ChevronRightIcon className="w-4 h-4" />
        <span className="sr-only">Next Page</span>
      </PaginationLink>
    </div>
  )
}

function PaginationLink({ children, url, page, disabled }: PaginationLinkProps) {
  return disabled === true ? (
    <span className="flex items-center justify-center w-6 h-6 border rounded text-slate-700 opacity-50 cursor-not-allowed transition-all duration-200">
      {children}
    </span>
  ) : (
    <Link
      href={`${url}?page=${page}`}
      className="flex items-center justify-center w-6 h-6 border rounded text-slate-700 transition-all duration-200 hover:bg-orange-200"
    >
      {children}
    </Link>
  )
}

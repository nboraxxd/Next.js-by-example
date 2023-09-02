'use client'

import { useState } from 'react'
import classNames from 'classnames'
import { LinkIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/20/solid'

export default function ShareLinkButton() {
  const [clicked, setClicked] = useState(false)

  function onClickButton() {
    navigator.clipboard.writeText(window.location.href)
    setClicked(true)
    setTimeout(() => setClicked(false), 1500)
  }

  return (
    <button
      className={classNames(
        'flex items-center gap-1 px-2 py-1 border rounded  font-medium text-sm transition-all duration-200 hover:bg-orange-100',
        {
          'text-orange-500 hover:text-orange-700': clicked === true,
          'text-slate-500 hover:text-slate-700': clicked === false,
        }
      )}
      onClick={onClickButton}
      disabled={clicked}
    >
      {clicked ? <ClipboardDocumentCheckIcon className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
      <span>{clicked ? 'Link copied!' : 'Share link'}</span>
    </button>
  )
}

'use client'

export default function ShareLinkButton() {
  function onClickButton() {
    console.log('clicked')
  }
  console.log('render')
  return (
    <button
      className="px-2 py-1 border rounded text-slate-500 font-medium text-sm transition-all hover:bg-orange-100 hover:text-slate-700"
      onClick={onClickButton}
    >
      Share link
    </button>
  )
}

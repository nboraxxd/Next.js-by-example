'use client'

import React from 'react'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'

const reviews = [
  { id: 8, title: 'Hades' },
  { id: 5, title: 'Fall Guys: Ultimate Knockout' },
  { id: 23, title: 'Black Mesa' },
  { id: 14, title: 'Disco Elysium' },
  { id: 15, title: 'Dead Cells' },
  { id: 22, title: 'A Way Out' },
]

export default function SearchBox() {
  return (
    <div className="relative">
      <Combobox>
        <Combobox.Input placeholder="Search…" className="border rounded outline-none px-2 py-1" />
        <Combobox.Options className="left-0 right-0 top-full absolute rounded bg-white shadow-md">
          {reviews.map((review, index) => (
            <Combobox.Option key={review.id} value={review.title}>
              {({ active }) => (
                <span
                  className={classNames('px-2 py-1 line-clamp-1 cursor-pointer transition-all', {
                    'bg-orange-100': active,
                    'rounded-bl rounded-br': index === reviews.length - 1,
                    'rounded-tl rounded-tr': index === 0,
                  })}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  )
}

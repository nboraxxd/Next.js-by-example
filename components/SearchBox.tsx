'use client'

import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { PATH } from '@/components/NavBar'

const reviews = [
  { id: 8, slug: 'hades-2018', title: 'Hades' },
  { id: 5, slug: 'fall-guys', title: 'Fall Guys: Ultimate Knockout' },
  { id: 23, slug: 'black-mesa', title: 'Black Mesa' },
  { id: 14, slug: 'disco-elysium', title: 'Disco Elysium' },
  { id: 15, slug: 'dead-cells', title: 'Dead Cells' },
  { id: 22, slug: 'a-way-out-2018', title: 'A Way Out' },
]

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const filteredReviews = reviews.filter((review) => review.title.toLowerCase().includes(query.toLowerCase()))

  function handleOnChange({ slug }: { id: number; slug: string; title: string }) {
    router.push(`${PATH.reviews}/${slug}`)
  }

  return (
    <div className="relative">
      <Combobox onChange={handleOnChange}>
        <Combobox.Input
          placeholder="Search…"
          className="border rounded outline-none px-2 py-1"
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          autoComplete="off"
        />
        <Combobox.Options className="left-0 right-0 top-full absolute rounded bg-white shadow-md">
          {filteredReviews.map((review, index) => (
            <Combobox.Option key={review.id} value={review}>
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

'use client'

import React, { useState } from 'react'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { PATH } from '@/components/NavBar'

interface SearchBoxProps {
  reviews: { id: number; slug: string; title: string }[]
}

export default function SearchBox({ reviews }: SearchBoxProps) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const filteredReviews = reviews
    .filter((review) => review.title.toLowerCase().includes(query.toLowerCase()))
    .slice(0, 5)

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

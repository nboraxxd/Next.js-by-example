'use client'

import React, { useEffect, useState } from 'react'
import { Combobox } from '@headlessui/react'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { PATH } from '@/components/NavBar'
import { getSearchableReviews } from '@/lib/reviews'
import useDebounce from '@/hooks/useDebounce'

interface SearchBoxProps {
  id: number
  slug: string
  title: string
}

export default function SearchBox() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const debouncedValue = useDebounce(query)
  const [reviews, setReviews] = useState<SearchBoxProps[]>([])

  useEffect(() => {
    if (debouncedValue.trim().length > 0) {
      ;(async function getReviews() {
        try {
          const response = await getSearchableReviews(debouncedValue.trim())
          setReviews(response)
        } catch (error) {
          console.log(error)
        }
      })()
    } else {
      setReviews([])
    }
  }, [debouncedValue])

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
          {reviews.map((review, index) => (
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

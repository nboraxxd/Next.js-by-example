import Image from 'next/image'
import type { Metadata } from 'next'
import { getReviews } from '@/lib/reviews'
import Link from 'next/link'
import Heading from '@/components/Heading'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'

export const metadata: Metadata = {
  title: 'Reviews',
}

interface ReviewsPageProps {
  searchParams: {
    page?: string
  }
}

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page)
  const reviews = await getReviews(6)

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex items-center gap-2 my-3">
        <Link
          href={`/reviews?page=${page - 1}`}
          className={classNames({ 'pointer-events-none opacity-60': page === 1 })}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Link>
        <span className="">Page {page}</span>
        <Link
          href={`/reviews?page=${page + 1}`}
          // className={classNames({ 'pointer-events-none opacity-60': page === 1 })}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
      <ul className="flex flex-row flex-wrap gap-3 mt-4">
        {reviews.map((review, index) => (
          <li
            key={review.id}
            className="w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem]"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="rounded-t"
                priority={index === 0}
              />
              <h2 className="py-2 font-orbitron font-medium text-lg text-center">{review.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

function parsePageParam(paramValue: string): number {
  if (paramValue) {
    const page = parseInt(paramValue)
    if (isFinite(page) && page > 0) {
      return page
    }
  }
  return 1
}

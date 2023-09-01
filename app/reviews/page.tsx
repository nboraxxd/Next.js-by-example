import Image from 'next/image'
import type { Metadata } from 'next'
import { getReviews } from '@/lib/reviews'
import Link from 'next/link'
import Heading from '@/components/Heading'
import PaginationBar from '@/components/PaginationBar'
import { PATH } from '@/components/NavBar'
import SearchBox from '@/components/SearchBox'

export const metadata: Metadata = {
  title: 'Reviews',
}

interface ReviewsPageProps {
  searchParams: {
    page?: string
  }
}

const POSTS_PER_REVIEWS_PAGE = 6

export default async function ReviewsPage({ searchParams }: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page)
  const { reviews, pageCount } = await getReviews(POSTS_PER_REVIEWS_PAGE, page)

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="mt-10 mb-3 mx-auto px-4 max-w-[61.5rem] flex flex-col md:flex-row items-center justify-between gap-2">
        <PaginationBar url={PATH.reviews} page={page} pageCount={pageCount} />
        <SearchBox />
      </div>
      <ul className="flex flex-wrap justify-center gap-3 mt-4">
        {reviews.map((review, index) => (
          <li
            key={review.id}
            className="w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem]"
          >
            <Link href={`${PATH.reviews}/${review.slug}`}>
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

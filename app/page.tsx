import type { Metadata } from 'next'
import Link from 'next/link'
import Heading from '@/components/Heading'
import { getFeaturedReview } from '@/lib/reviews'

export const metadata: Metadata = {
  title: 'Indie Gamer',
  description: 'Only the best indie games, reviewed for you',
}

export default async function HomePage() {
  const reviews = await getFeaturedReview()

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="my-3">Only the best indie games, reviewed for you</p>

      <div className="group w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem] md:w-full">
        <Link href={`/reviews/${reviews.slug}`} className="flex flex-col md:flex-row">
          <img
            src={reviews.image}
            alt={reviews.title}
            width={320}
            height={180}
            className="rounded-t md:rounded-l md:rounded-r-none"
          />
          <h2 className="py-2 font-orbitron font-medium text-lg text-center md:grow">{reviews.title}</h2>
        </Link>
      </div>
    </>
  )
}

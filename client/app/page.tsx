import Image from 'next/image'
import Heading from '@/components/Heading'
import { getReviews } from '@/lib/reviews'
import Link from 'next/link'
import { PATH } from '@/components/NavBar'

const POSTS_PER_HOMEPAGE = 3
const PAGE = 1

export default async function HomePage() {
  const { reviews } = await getReviews(POSTS_PER_HOMEPAGE, PAGE)

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="mt-3 mb-10 text-center text-xl">Only the best indie games, reviewed for you</p>

      <ul className="flex flex-col items-center gap-4">
        {reviews.map((review, index) => (
          <li
            key={review.id}
            className="w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem] md:w-full"
          >
            <Link href={`${PATH.reviews}/${review.slug}`} className="flex flex-col md:flex-row">
              <Image
                src={review.image}
                alt={review.title}
                width={320}
                height={180}
                className="rounded-t md:rounded-l md:rounded-r-none"
                priority={index === 0}
              />
              <div className="flex flex-col py-2 md:grow">
                <h2 className="font-orbitron font-semibold text-lg text-center">{review.title}</h2>
                <p className="hidden md:block mt-4 px-12 text-center">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}

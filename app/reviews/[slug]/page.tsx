import { getReview, getSlugs } from '@/lib/reviews'
import Heading from '@/components/Heading'
import { Metadata } from 'next'

interface ReviewPageParams {
  slug: string
}

interface ReviewPageProps {
  params: ReviewPageParams
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
  const review = await getReview(slug)

  return {
    title: review.title,
  }
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug)

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="italic my-2">{review.date}</p>
      <img src={review.image} alt={review.title} width={640} height={360} className="my-2 rounded" />
      <article className="max-w-screen-sm prose prose-slate" dangerouslySetInnerHTML={{ __html: review.body }} />
    </>
  )
}

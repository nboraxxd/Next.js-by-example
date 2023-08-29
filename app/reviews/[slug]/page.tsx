import Image from 'next/image'
import { getReview, getSlugs } from '@/lib/reviews'
import Heading from '@/components/Heading'
import { Metadata } from 'next'
import ShareLinkButton from '@/components/ShareLinkButton'

interface ReviewPageParams {
  slug: string
}

interface ReviewPageProps {
  params: ReviewPageParams
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs()

  return slugs.map((slug) => ({ slug: slug.attributes.slug }))
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
      <div className="mt-3 mb-4 flex items-center gap-3">
        <p className="italic">{review.date}</p>
        <ShareLinkButton />
      </div>
      <Image src={review.image} alt={review.title} width={640} height={360} className="my-2 rounded" priority />
      <article className="max-w-screen-sm prose prose-slate" dangerouslySetInnerHTML={{ __html: review.body }} />
    </>
  )
}

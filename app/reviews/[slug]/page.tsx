import { getReview } from '@/lib/reviews'
import Heading from '@/components/Heading'

interface Props {
  params: { slug: string }
}

export default async function ReviewPage({ params: { slug } }: Props) {
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

import { getReview } from '@/lib/reviews'
import Heading from '@/components/Heading'

export default async function StardewValley() {
  const review = await getReview('stardew-valley')

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="italic my-2">{review.date}</p>
      <img src={review.image} alt="Stardew Valley" width={640} height={360} className="my-2 rounded" />
      <article className="max-w-screen-sm prose prose-slate" dangerouslySetInnerHTML={{ __html: review.body }} />
    </>
  )
}

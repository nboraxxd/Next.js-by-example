import Link from 'next/link'
import Heading from '@/components/Heading'

export default function ReviewsPage() {
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className="flex flex-col gap-3 mt-4">
        <li className="group w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.0625rem] hover:mb-[0.0625rem]">
          <Link href="/reviews/hollow-knight">
            <img src="/images/hollow-knight.jpg" alt="Hollow Knight" width={320} height={180} className="rounded-t" />
            <h2 className="py-2 text-center text-lg font-medium">Hollow Knight</h2>
          </Link>
        </li>
        <li className="w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.0625rem] hover:mb-[0.0625rem]">
          <Link href="/reviews/stardew-valley">
            <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width={320} height={180} className="rounded-t" />
            <h2 className="py-2 text-center text-lg font-medium">Stardew Valley</h2>
          </Link>
        </li>
      </ul>
    </>
  )
}

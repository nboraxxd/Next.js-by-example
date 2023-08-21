import Link from 'next/link'
import Heading from '@/components/Heading'

export default function HomePage() {
  console.log('HomePage render')

  return (
    <>
      <Heading>Indie Gamer</Heading>
      <p className="my-3">Only the best indie games, reviewed for you</p>

      <div className="group w-80 border rounded bg-white shadow transition-all hover:shadow-lg hover:-mt-[0.125rem] hover:mb-[0.125rem] md:w-full">
        <Link href="/reviews/hollow-knight" className="flex flex-col md:flex-row">
          <img
            src="/images/hollow-knight.jpg"
            alt="Hollow Knight"
            width={320}
            height={180}
            className="rounded-t md:rounded-l md:rounded-r-none"
          />
          <h2 className="py-2 font-orbitron font-medium text-lg text-center md:grow">Hollow Knight</h2>
        </Link>
      </div>
    </>
  )
}

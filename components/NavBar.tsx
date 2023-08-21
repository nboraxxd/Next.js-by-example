import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="font-orbitron font-semibold text-orange-800 hover:underline transition">
            Indie Gamer
          </Link>
        </li>
        <li className="ml-auto">
          <Link href="/reviews" className="text-orange-800 font-medium hover:underline transition">
            Review
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-orange-800 font-medium hover:underline transition">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

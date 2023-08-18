import Link from 'next/link'

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-2">
        <li>
          <Link href="/" className="text-orange-800 hover:underline transition">
            Home
          </Link>
        </li>
        <li>
          <Link href="/reviews" className="text-orange-800 hover:underline transition">
            Review
          </Link>
        </li>
        <li>
          <Link href="/about" className="text-orange-800 hover:underline transition">
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

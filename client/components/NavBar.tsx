import NavLink from '@/components/NavLink'

export const PATH = {
  homePage: '/',
  reviews: '/reviews',
  about: '/about',
}

export default function NavBar() {
  return (
    <nav>
      <ul className="flex gap-4">
        <li>
          <NavLink href={PATH.homePage} className="font-orbitron font-semibold hover:text-orange-600">
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href={PATH.reviews} className="hover:underline">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink href={PATH.about} className="hover:underline">
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

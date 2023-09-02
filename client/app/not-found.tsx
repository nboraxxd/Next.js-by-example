import type { Metadata } from 'next'
import Heading from '@/components/Heading'

export const metadata: Metadata = {
  title: ' Not Found | Indie Gamer',
  description: 'Not Found Page',
}

export default function NoutFoundPage() {
  return (
    <>
      <Heading>Not Found</Heading>
      <p>Oops, the page you requested only exists in a parallel universe.</p>
    </>
  )
}

import type { Metadata } from 'next'
import Heading from '@/components/Heading'

export const metadata: Metadata = {
  title: ' About',
  // description: '',
}

export default function About() {
  return (
    <>
      <Heading>About</Heading>
      <p>Here is our information</p>
    </>
  )
}

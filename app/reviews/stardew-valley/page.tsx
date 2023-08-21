import { readFile } from 'node:fs/promises'
import Heading from '@/components/Heading'

export default async function StardewValley() {
  const text = await readFile('./content/reviews/stardew-valley.md', 'utf8')

  return (
    <>
      <Heading>Stardew Valley</Heading>
      <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width={640} height={360} className="my-2 rounded" />
      <p>{text}</p>
    </>
  )
}

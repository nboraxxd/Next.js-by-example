import { readFile } from 'node:fs/promises'
import { marked } from 'marked'

import Heading from '@/components/Heading'

export default async function StardewValley() {
  const text = await readFile('./content/reviews/stardew-valley.md', 'utf8')
  const html = marked(text)

  return (
    <>
      <Heading>Stardew Valley</Heading>
      <img src="/images/stardew-valley.jpg" alt="Stardew Valley" width={640} height={360} className="my-2 rounded" />
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

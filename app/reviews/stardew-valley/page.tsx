import { readFile } from 'node:fs/promises'
import { marked } from 'marked'
import matter from 'gray-matter'

import Heading from '@/components/Heading'

export default async function StardewValley() {
  const text = await readFile('./content/reviews/stardew-valley.md', 'utf8')
  const {
    content,
    data: { title, date, image },
  } = matter(text)
  const html = marked(content)
  return (
    <>
      <Heading>{title}</Heading>
      <p className='italic my-2'>{date}</p>
      <img src={image} alt="Stardew Valley" width={640} height={360} className="my-2 rounded" />
      <article className="max-w-screen-sm prose prose-slate" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  )
}

import { readFile } from 'node:fs/promises'
import { marked } from 'marked'
import matter from 'gray-matter'

interface Review {
  title: string
  date: string
  image: string
  body: string | TrustedHTML
}

export async function getReview(slug: string): Promise<Review> {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf8')
  const {
    content,
    data: { title, date, image },
  } = matter(text)
  const body = marked(content)

  return { title, date, image, body }
}

import { readFile, readdir } from 'node:fs/promises'
import { marked } from 'marked'
import matter from 'gray-matter'
import { v4 as uuidv4 } from 'uuid'

interface Review {
  id: string
  slug: string
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
  const id = uuidv4()

  return { id, slug, title, date, image, body }
}

export async function getReviews() {
  const slugs = await getSlugs()
  const reviews: Review[] = []
  
  for (const slug of slugs) {
    const review = await getReview(slug)
    reviews.push(review)
  }

  return reviews
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  const slugs = files.filter((file) => file.endsWith('.md')).map((item) => item.slice(0, -'.md'.length))

  return slugs
}

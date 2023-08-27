import { readFile, readdir } from 'node:fs/promises'
import { marked } from 'marked'
import matter from 'gray-matter'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'

interface Review {
  id: string | number
  slug: string
  title: string
  date: string
  image: string
  body: string | TrustedHTML
}

type Data = {
  id: number
  attributes: {
    slug: string
    title: string
    subtitle: string
    publishedAt: string
    image: {
      data: {
        id: number
        attributes: {
          url: string
        }
      }
    }
  }
}

const CMS_URL = 'http://localhost:1337'

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

export async function getReviews(): Promise<Review[]> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 6 },
      },
      { encodeValuesOnly: true }
    )

  const response = await fetch(url)
  const { data } = await response.json()
  const dataT: Data[] = data

  return dataT.map(({ attributes }) => ({
    id: attributes.image.data.id,
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: `${CMS_URL}${attributes.image.data.attributes.url}`,
    body: attributes.subtitle,
  }))
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  const slugs = files.filter((file) => file.endsWith('.md')).map((item) => item.slice(0, -'.md'.length))

  return slugs
}

export async function getFeaturedReview() {
  const reviews = await getReviews()
  return reviews[0]
}

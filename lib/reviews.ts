import { readFile, readdir } from 'node:fs/promises'
import { marked } from 'marked'
import matter from 'gray-matter'
import { v4 as uuidv4 } from 'uuid'
import qs from 'qs'

interface Review {
  id: number
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

type ExtendedData = Data['attributes'] & { body: string }

const CMS_URL = 'http://localhost:1337'

export async function getReview(slug: string): Promise<Review> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'body', 'publishedAt', 'subtitle'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    )

  const response = await fetch(url)
  const { data }: { data: (Pick<Data, 'id'> & { attributes: ExtendedData })[] } = await response.json()
  const item = data[0]
  return {
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: `${CMS_URL}${item.attributes.image.data.attributes.url}`,
    body: marked(item.attributes.body, {
      headerIds: false,
      mangle: false,
    }),
  }
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
  const { data }: { data: Data[] } = await response.json()

  return data.map((item) => ({
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: `${CMS_URL}${item.attributes.image.data.attributes.url}`,
    body: item.attributes.subtitle,
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

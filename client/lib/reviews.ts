import 'server-only'

import qs from 'qs'
import { marked } from 'marked'
import { SuccessResponse } from '@/types/utils.type'
import { ReactNode } from 'react'

interface Review {
  id: number
  slug: string
  title: string
  date: string
  image: string
  subtitle: ReactNode
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

type ExtendedData = Pick<Data, 'id'> & { attributes: Data['attributes'] & { body: string } }

type slugData = Pick<Data, 'id'> & { attributes: { slug: string } }

type searchableReviewsData = Pick<Data, 'id'> & { attributes: { slug: string; title: string } }

export const CACHE_TAG_REVIEWS = 'reviews'

const CMS_URL = process.env.CMS_URL

export async function getReview(slug: string): Promise<Review> {
  const { data } = await fetchReviews<ExtendedData>({
    filters: { slug: { $eq: slug } },
    fields: ['slug', 'title', 'body', 'publishedAt', 'subtitle'],
    populate: { image: { fields: ['url'] } },
    pagination: { pageSize: 1, withCount: false },
  })

  if (data.length === 0) {
    return null
  }

  const item = data[0]
  return {
    ...toReview(item),
    body: marked(item.attributes.body, {
      headerIds: false,
      mangle: false,
    }),
  }
}

export async function getReviews(pageSize: number, page: number): Promise<{ reviews: Review[]; pageCount: number }> {
  const { data, meta } = await fetchReviews<Data>({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  })

  const reviews = data.map((item) => ({
    ...toReview(item),
    body: item.attributes.subtitle,
  }))

  const pageCount = meta.pagination.pageCount

  return { reviews, pageCount }
}

async function fetchReviews<T>(parameters: {}): Promise<SuccessResponse<T>> {
  const url = `${CMS_URL}/api/reviews?` + qs.stringify(parameters, { encodeValuesOnly: true })

  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REVIEWS],
    },
  })
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`)
  }
  return await response.json()
}

export async function getSearchableReviews(query: string) {
  const { data } = await fetchReviews<searchableReviewsData>({
    filters: { title: { $containsi: query } },
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  })

  return data.map((item) => ({ id: item.id, slug: item.attributes.slug, title: item.attributes.title }))
}

export async function getSlugs() {
  const { data } = await fetchReviews<slugData>({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  })

  return data
}

function toReview(item: Data | ExtendedData): Omit<Review, 'body'> {
  return {
    id: item.id,
    slug: item.attributes.slug,
    title: item.attributes.title,
    date: item.attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: `${CMS_URL}${item.attributes.image.data.attributes.url}`,
    subtitle: item.attributes.subtitle,
  }
}

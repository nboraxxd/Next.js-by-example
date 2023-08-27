import { writeFileSync } from 'node:fs'
import qs from 'qs'

const URL =
  'http://localhost:1337/api/reviews' +
  '?' +
  qs.stringify(
    {
      fields: ['slug', 'title', 'subtitle', 'publishedAt'],
      populate: { image: { fields: ['url'] } },
      sort: ['publishedAt:desc'],
      pagination: { pageSize: 6 },
    },
    { encodeValuesOnly: true }
  )
console.log('🔥 ~ URL:', URL)

const response = await fetch(URL)
const body = await response.json()
const formatted = JSON.stringify(body, null, 2)
const file = 'scripts/strapi-response.json'
writeFileSync(file, formatted, 'utf8')

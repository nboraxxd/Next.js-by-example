import { writeFileSync } from 'node:fs'

const URL = 'http://localhost:1337/api/reviews' + '?populate=*'

const response = await fetch(URL)
const body = await response.json()
const formatted = JSON.stringify(body, null, 2)
const file = 'scripts/strapi-response.json'
writeFileSync(file, formatted, 'utf8')
